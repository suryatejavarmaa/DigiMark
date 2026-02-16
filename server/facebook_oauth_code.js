// =============== FACEBOOK OAUTH & AUTO-POSTING ===============
// Add this code to server/index.js AFTER line 1561 (after the Twitter status endpoint)
// BEFORE line 1563 (before "console.log('--- STARTING WEBSITE SUMMARIZER SERVER v4 ---')")

// Facebook OAuth Step 1: Initiate OAuth
app.get('/auth/facebook', (req, res) => {
    const { userId, redirect_origin } = req.query;

    if (!userId) {
        return res.status(400).send('❌ userId is required');
    }

    console.log('[Facebook OAuth] Initiating for user:', userId);
    console.log('[Facebook OAuth] Redirect origin:', redirect_origin || 'not provided');

    // Requesting permissions for both Facebook Pages and Instagram Business
    const scopes = [
        'pages_manage_posts',
        'pages_read_engagement',
        'instagram_basic',
        'instagram_content_publish'
    ].join(',');

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
        `client_id=${process.env.FACEBOOK_APP_ID}` +
        `&config_id=${process.env.FACEBOOK_CONFIG_ID}` +
        `&redirect_uri=${encodeURIComponent('http://localhost:5001/auth/facebook/callback')}` +
        `&state=${userId}:::${redirect_origin || 'http://localhost:3002'}` +
        `&scope=${scopes}`;

    console.log('[Facebook OAuth] Redirecting to:', authUrl);
    res.redirect(authUrl);
});

// Facebook OAuth Step 2: Callback - Exchange code for token
app.get('/auth/facebook/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!code || !state) {
        console.error('[Facebook OAuth] Missing code or state');
        return res.redirect('http://localhost:3002?connected=facebook&error=missing_params');
    }

    const [userId, origin] = state.split(':::');

    try {
        console.log('[Facebook OAuth] Processing callback for user:', userId);

        // Step 1: Exchange code for SHORT-LIVED access token
        const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?` +
            `client_id=${process.env.FACEBOOK_APP_ID}` +
            `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
            `&redirect_uri=${encodeURIComponent('http://localhost:5001/auth/facebook/callback')}` +
            `&code=${code}`;

        const tokenResponse = await fetch(tokenUrl);
        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            throw new Error('Failed to get access token');
        }

        const shortLivedToken = tokenData.access_token;
        console.log('[Facebook OAuth] Short-lived token received');

        // Step 1.5: Exchange for LONG-LIVED access token (60 days)
        // This is CRITICAL for the scheduler to work without daily re-login
        const longLivedUrl = `https://graph.facebook.com/v18.0/oauth/access_token?` +
            `grant_type=fb_exchange_token` +
            `&client_id=${process.env.FACEBOOK_APP_ID}` +
            `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
            `&fb_exchange_token=${shortLivedToken}`;

        const longLivedResponse = await fetch(longLivedUrl);
        const longLivedData = await longLivedResponse.json();
        const userAccessToken = longLivedData.access_token || shortLivedToken;

        console.log(`[Facebook OAuth] Token exchange: ${longLivedData.access_token ? 'Long-lived obtained (60 days)' : 'Kept short-lived'}`);

        // Step 2: Get user's Facebook Pages AND Instagram IDs
        // "instagram_business_account" field is required to link IG
        const pagesUrl = `https://graph.facebook.com/v18.0/me/accounts?fields=name,access_token,instagram_business_account&access_token=${userAccessToken}`;
        const pagesResponse = await fetch(pagesUrl);
        const pagesData = await pagesResponse.json();

        if (!pagesData.data || pagesData.data.length === 0) {
            console.error('[Facebook OAuth] No pages found for this user');
            return res.redirect(`${origin}?connected=facebook&error=no_pages`);
        }

        // Use first page (or let user choose in future)
        const firstPage = pagesData.data[0];
        console.log('[Facebook OAuth] Using page:', firstPage.name, firstPage.id);

        const instagramId = firstPage.instagram_business_account ? firstPage.instagram_business_account.id : null;
        if (instagramId) {
            console.log('[Facebook OAuth] Found linked Instagram ID:', instagramId);
        } else {
            console.warn('[Facebook OAuth] No Instagram Business Account linked to this page.');
        }

        // Step 3: Save Tokens to Firestore
        // The page access token retrieved with a long-lived user token is PERMANENT (or very long lived)
        const tokensRef = doc(db, 'users', userId, 'tokens', 'facebook');
        await setDoc(tokensRef, {
            access_token: firstPage.access_token, // PAGE access token
            page_id: firstPage.id,
            page_name: firstPage.name,
            instagram_id: instagramId, // CRITICAL: Save IG ID
            user_access_token: userAccessToken, // Save backup user token
            connectedAt: new Date().toISOString()
        });

        // Also save separate instagram token doc for easier lookup if needed
        if (instagramId) {
            const igTokensRef = doc(db, 'users', userId, 'tokens', `instagram_${userId}`);
            await setDoc(igTokensRef, {
                access_token: userAccessToken, // IG Graph API uses User Token for some calls, Page Token for others. 
                // Actually for Content Publishing, we use the PAGE Access Token or User Token with permissions.
                // Best practice: Use the Page Access Token that covers both.
                page_access_token: firstPage.access_token,
                instagram_business_id: instagramId,
                connectedAt: new Date().toISOString()
            });
        }

        console.log('✅ Facebook & Instagram OAuth successful for user:', userId);
        res.redirect(`${origin}?connected=facebook&success=true&page=${encodeURIComponent(firstPage.name)}&ig=${!!instagramId}`);

    } catch (error) {
        console.error('[Facebook OAuth] Error:', error);
        res.redirect(`${origin}?connected=facebook&error=callback_failed`);
    }
});
