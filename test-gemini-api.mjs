const API_KEY = 'AIzaSyC76OlmN9Z3USGfP_P83nsYj1k-eb4cTUY';

async function testGeminiAPI() {
    console.log('🔍 Testing Gemini API Key...\n');

    // Test 1: List available models
    console.log('📋 Available Models:');
    try {
        const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const modelsData = await modelsRes.json();

        if (modelsData.error) {
            console.log('❌ Error:', modelsData.error.message);
            return;
        }

        modelsData.models.forEach(m => {
            if (m.name.includes('gemini') || m.name.includes('imagen')) {
                console.log('  ✅', m.name);
            }
        });
    } catch (e) {
        console.log('❌ Failed to list models:', e.message);
    }

    console.log('\n🖼️ Testing Image Generation (gemini-2.0-flash-exp):');
    try {
        const imgRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'Generate an image of a beautiful sunset over mountains' }] }],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
            })
        });

        const imgData = await imgRes.json();

        if (imgData.error) {
            console.log('❌ Image Gen Error:', imgData.error.message);
            console.log('   Details:', JSON.stringify(imgData.error.details || 'none'));
        } else if (imgData.candidates && imgData.candidates[0]) {
            const parts = imgData.candidates[0].content.parts;
            let hasImage = false;
            parts.forEach(p => {
                if (p.inlineData && p.inlineData.mimeType && p.inlineData.mimeType.startsWith('image/')) {
                    hasImage = true;
                    console.log('✅ IMAGE GENERATED! Size:', p.inlineData.data.length, 'chars (base64)');
                }
                if (p.text) {
                    console.log('📝 Text response:', p.text.substring(0, 150) + '...');
                }
            });
            if (!hasImage) {
                console.log('⚠️ No image in response, but got text');
            }
        } else {
            console.log('⚠️ Unexpected response:', JSON.stringify(imgData).substring(0, 200));
        }
    } catch (e) {
        console.log('❌ Image test failed:', e.message);
    }

    console.log('\n✅ Test Complete!');
}

testGeminiAPI();
