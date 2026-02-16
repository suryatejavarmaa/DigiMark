/**
 * Test Script: Gemini Image-to-Image Support
 * 
 * This script tests whether Gemini API can:
 * 1. Accept an existing image as input
 * 2. Modify it based on a text prompt
 * 3. Return the modified image
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    process.exit(1);
}

console.log('✅ Gemini API Key found');
console.log('🧪 Testing Gemini Image-to-Image capability...\n');

async function testGeminiImageToImage() {
    try {
        // Step 1: First, generate a simple test image
        console.log('📸 Step 1: Generating a base test image...');

        const model = 'gemini-2.0-flash-exp';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

        // Generate initial image
        const initialResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: 'Generate a simple blue square with the text "HELLO" in white in the center'
                    }]
                }],
                generationConfig: {
                    responseModalities: ["TEXT", "IMAGE"]
                }
            })
        });

        if (!initialResponse.ok) {
            const errorText = await initialResponse.text();
            throw new Error(`Initial image generation failed: ${initialResponse.status} - ${errorText}`);
        }

        const initialData = await initialResponse.json();
        let originalImageBase64 = null;
        let originalMimeType = null;

        // Extract the generated image
        if (initialData.candidates && initialData.candidates[0]?.content?.parts) {
            for (const part of initialData.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                    originalImageBase64 = part.inlineData.data;
                    originalMimeType = part.inlineData.mimeType;
                    console.log(`✅ Base image generated (${originalMimeType}, ${Math.round(originalImageBase64.length / 1024)}KB)`);
                    break;
                }
            }
        }

        if (!originalImageBase64) {
            console.log('⚠️ No image in initial response. Checking response structure...');
            console.log(JSON.stringify(initialData, null, 2).substring(0, 500));
            throw new Error('Could not generate initial test image');
        }

        // Step 2: Now test img2img - send the image back with a modification request
        console.log('\n🎨 Step 2: Testing image modification (img2img)...');
        console.log('   Sending original image + prompt: "Add a red circle in the corner"');

        const modifyResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            inlineData: {
                                mimeType: originalMimeType,
                                data: originalImageBase64
                            }
                        },
                        {
                            text: 'Modify this image: Add a bright red circle in the top-right corner of the image. Keep everything else the same.'
                        }
                    ]
                }],
                generationConfig: {
                    responseModalities: ["TEXT", "IMAGE"]
                }
            })
        });

        if (!modifyResponse.ok) {
            const errorText = await modifyResponse.text();
            console.log('\n❌ Image modification failed:');
            console.log(`   Status: ${modifyResponse.status}`);
            console.log(`   Error: ${errorText.substring(0, 500)}`);
            return false;
        }

        const modifyData = await modifyResponse.json();
        let modifiedImageFound = false;
        let textResponse = null;

        // Check response for modified image
        if (modifyData.candidates && modifyData.candidates[0]?.content?.parts) {
            for (const part of modifyData.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                    modifiedImageFound = true;
                    console.log(`✅ Modified image received (${part.inlineData.mimeType}, ${Math.round(part.inlineData.data.length / 1024)}KB)`);
                }
                if (part.text) {
                    textResponse = part.text;
                }
            }
        }

        // Print results
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST RESULTS:');
        console.log('='.repeat(60));

        if (modifiedImageFound) {
            console.log('✅ SUCCESS! Gemini DOES support image-to-image editing!');
            console.log('   - Original image was accepted as input');
            console.log('   - Modified image was returned');
            if (textResponse) {
                console.log(`   - Text response: "${textResponse.substring(0, 100)}..."`);
            }
            return true;
        } else {
            console.log('⚠️ PARTIAL: Gemini accepted the image but did not return a modified image');
            if (textResponse) {
                console.log(`   - Text response instead: "${textResponse.substring(0, 200)}..."`);
            }
            console.log('\n   Full response structure:');
            console.log(JSON.stringify(modifyData, null, 2).substring(0, 800));
            return false;
        }

    } catch (error) {
        console.error('\n❌ TEST FAILED with error:');
        console.error(error.message);
        return false;
    }
}

// Run the test
testGeminiImageToImage().then(success => {
    console.log('\n' + '='.repeat(60));
    if (success) {
        console.log('🎉 CONCLUSION: You CAN implement image editing with Gemini!');
    } else {
        console.log('📝 CONCLUSION: May need alternative approach for image editing.');
    }
    console.log('='.repeat(60));
    process.exit(success ? 0 : 1);
});
