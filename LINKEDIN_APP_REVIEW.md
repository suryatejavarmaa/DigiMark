# DigiMark - LinkedIn App Review Submission

## App Overview

**App Name:** DigiMark  
**Category:** Social Media Management / Marketing Tool  
**Target Users:** Small businesses, marketers, content creators

---

## Use Case Description

> DigiMark is an AI-powered social media management platform that helps businesses create, schedule, and publish professional content across multiple social platforms.
>
> **LinkedIn Integration Use Case:**  
> Users connect their LinkedIn account via OAuth to enable seamless posting of AI-generated content directly to their LinkedIn feed. The app:
> 1. Authenticates users securely using LinkedIn's OAuth 2.0 flow
> 2. Generates professional captions tailored for LinkedIn's audience
> 3. Allows users to schedule posts or publish immediately
> 4. Posts content on behalf of the user using the Share on LinkedIn API
>
> Users maintain full control and can disconnect their LinkedIn account at any time. Only the minimum required permissions are requested.

---

## Permissions Requested

| Permission | Reason |
|------------|--------|
| `openid` | To identify the authenticated user |
| `profile` | To display the user's name in the app |
| `w_member_social` | To post content on behalf of the user |

---

## Demo Video Script

**Duration:** 2-3 minutes

### Scene 1: Introduction (15 sec)
- Show DigiMark logo and app name
- Brief text: "AI-powered social media management"

### Scene 2: User Login/Onboarding (20 sec)
- Show the onboarding flow
- User enters business details

### Scene 3: Content Creation (30 sec)
- User selects "Create Post"
- AI generates a professional caption
- User reviews and edits if needed

### Scene 4: LinkedIn Connection (30 sec)
- User clicks "Connect LinkedIn"
- **Show the OAuth consent screen** (important!)
- User grants permissions
- App shows "LinkedIn Connected" confirmation

### Scene 5: Publishing (30 sec)
- User selects LinkedIn as publishing platform
- User clicks "Post Now" or "Schedule"
- Show success message with post preview

### Scene 6: Verification (20 sec)
- Open LinkedIn in browser
- Show the published post on user's LinkedIn feed
- Highlight that the post was successfully created via API

### Scene 7: Disconnect Option (15 sec)
- Show settings/account page
- Demonstrate the "Disconnect LinkedIn" option
- Text: "Users can revoke access at any time"

---

## Technical Implementation Details

### OAuth Flow
```
1. User clicks "Connect LinkedIn"
2. Redirect to: https://www.linkedin.com/oauth/v2/authorization
   - response_type=code
   - client_id=[APP_CLIENT_ID]
   - redirect_uri=[CALLBACK_URL]
   - scope=openid w_member_social profile
3. User grants consent
4. LinkedIn redirects to callback with authorization code
5. Server exchanges code for access_token
6. Token stored securely in Firebase (encrypted)
```

### Posting Flow
```
1. User creates content in app
2. User selects LinkedIn + clicks Publish
3. Server calls LinkedIn UGC API:
   POST https://api.linkedin.com/v2/ugcPosts
   - author: urn:li:person:{user_id}
   - specificContent: { shareCommentary: { text: caption } }
   - visibility: PUBLIC
4. Post appears on user's LinkedIn feed
```

---

## Security & Privacy

- **Token Storage:** Access tokens stored in Firebase with user-specific encryption
- **Minimal Permissions:** Only request permissions necessary for posting
- **User Control:** Users can disconnect at any time from app settings
- **No Data Sharing:** User data is never shared with third parties
- **HTTPS Only:** All API calls use secure HTTPS connections

---

## Contact Information

**Developer:** [Your Name]  
**Email:** [Your Email]  
**Website:** [Your Website URL]  
**Privacy Policy:** [Privacy Policy URL]  
**Terms of Service:** [Terms of Service URL]

---

## Checklist Before Submission

- [ ] Privacy Policy URL added to LinkedIn Developer Portal
- [ ] Terms of Service URL added to LinkedIn Developer Portal
- [ ] App logo uploaded (256x256 minimum)
- [ ] Production OAuth redirect URI configured
- [ ] Demo video recorded and uploaded
- [ ] All test accounts removed from production
