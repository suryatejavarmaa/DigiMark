# Facebook Auto-Posting Approval - Complete Step-by-Step Guide

## Overview

This guide will walk you through getting Meta App Review approval to enable Facebook Page auto-posting for all users of your DigiMark app.

**Timeline:** 2-5 business days (after submission)  
**Cost:** Free  
**Difficulty:** Medium-Hard (Meta is strict)

---

## STEP 1: Prerequisites Checklist

Before starting, ensure you have:

- [ ] A Meta Developer account (developers.facebook.com)
- [ ] Your own Facebook Page (for testing/demo)
- [ ] An existing Meta App with App ID and App Secret
- [ ] A deployed app with public URLs (for Privacy Policy, etc.)
- [ ] A way to record screen videos (OBS, Loom, etc.)

---

## STEP 2: Set Up Your Meta App (If Not Done)

### 2.1 Go to Meta Developer Portal
1. Visit: https://developers.facebook.com/apps/
2. Click **"Create App"** (if you don't have one)
3. Select **"Business"** as the app type
4. Enter app name: "DigiMark"
5. Enter contact email

### 2.2 Add Facebook Login Product
1. In your app dashboard, click **"Add Product"**
2. Find **"Facebook Login"** → Click **"Set Up"**
3. Choose **"Web"**
4. Enter your Site URL (e.g., `https://your-domain.com`)

### 2.3 Configure OAuth Settings
Go to: Facebook Login → Settings

| Setting | Value |
|---------|-------|
| Client OAuth Login | ON |
| Web OAuth Login | ON |
| Valid OAuth Redirect URIs | `https://your-domain.com/auth/facebook/callback` |
| Deauthorize Callback URL | `https://your-domain.com/auth/facebook/deauthorize` |
| Data Deletion Request URL | `https://your-domain.com/auth/facebook/delete` |

---

## STEP 3: Create Required URLs

You need 3 public URLs before submitting for review:

### 3.1 Privacy Policy URL
Create a page at: `https://your-domain.com/privacy`

Must include:
- What data you collect from Facebook
- How you use Facebook Page tokens
- How data is stored
- How users can delete their data

### 3.2 Terms of Service URL
Create a page at: `https://your-domain.com/terms`

### 3.3 Data Deletion Callback URL
Create an endpoint: `https://your-domain.com/auth/facebook/delete`

This endpoint should:
1. Receive a signed request from Facebook
2. Delete all user's Facebook data from your database
3. Return a confirmation

Example response:
```json
{
  "url": "https://your-domain.com/deletion-status?id=abc123",
  "confirmation_code": "abc123"
}
```

---

## STEP 4: Request Permissions for App Review

### 4.1 Go to App Review Section
1. In Meta Developer Portal, select your app
2. Click **"App Review"** in left sidebar
3. Click **"Permissions and Features"**

### 4.2 Request These Permissions

| Permission | What to Click |
|------------|---------------|
| `pages_show_list` | Click **"Request"** |
| `pages_read_engagement` | Click **"Request"** |
| `pages_manage_posts` | Click **"Request"** ← This is the key one! |

### 4.3 For Each Permission, Provide:

1. **Use Case Description:**
   > "DigiMark allows business owners to create AI-generated content and publish it to their Facebook Pages. Users connect their Facebook account, select a Page they manage, and the app posts photos with captions to that Page on their behalf."

2. **Step-by-Step Instructions:**
   ```
   1. Log in to DigiMark at https://your-domain.com
   2. Click "Create Post" 
   3. Enter a topic and generate AI content
   4. Click "Connect Facebook" 
   5. Grant permissions when prompted
   6. Select a Facebook Page from the list
   7. Click "Post Now"
   8. The post appears on the Facebook Page
   ```

3. **Demo Video (see Step 5)**

---

## STEP 5: Record Demo Video (CRITICAL)

This is the most important part. Meta reviewers WILL reject apps with poor videos.

### 5.1 Video Requirements
- **Length:** 2-5 minutes
- **Format:** MP4, MOV, or link to YouTube/Vimeo
- **Quality:** Clear, readable text (720p minimum)
- **Audio:** Not required, but captions help

### 5.2 What to Show (Scene by Scene)

**Scene 1: App Overview (30 sec)**
- Show app homepage/dashboard
- Brief explanation of what app does

**Scene 2: Content Creation (45 sec)**
- Show creating a post
- Show AI generating content
- Show the caption being displayed

**Scene 3: Facebook OAuth (60 sec)** ⭐ CRITICAL
- Click "Connect Facebook"
- Show the Facebook login screen
- **SHOW THE PERMISSION CONSENT SCREEN** (pause on it!)
- Show granting each permission
- Show returning to your app

**Scene 4: Page Selection (30 sec)**
- Show the list of Facebook Pages
- Select a specific Page
- Show confirmation that Page is connected

**Scene 5: Publishing (45 sec)** ⭐ CRITICAL
- Select Facebook as target platform
- Click "Publish" or "Post Now"
- Show success message

**Scene 6: Verify on Facebook (60 sec)** ⭐ CRITICAL
- Open Facebook.com in a new tab
- Navigate to your Facebook Page
- **SHOW THE ACTUAL POST ON THE PAGE**
- Scroll to show it's really there

**Scene 7: Disconnect Option (30 sec)**
- Go to app settings
- Show "Disconnect Facebook" option
- Mention users can revoke access anytime

### 5.3 Video Tips
- Use test data, not real customer data
- Move slowly so reviewers can see each step
- Highlight/zoom on permission screens
- Don't skip any steps

---

## STEP 6: Add App Details in Meta Portal

### 6.1 Go to Settings → Basic

Fill in all fields:

| Field | Value |
|-------|-------|
| Display Name | DigiMark |
| App Domains | your-domain.com |
| Privacy Policy URL | https://your-domain.com/privacy |
| Terms of Service URL | https://your-domain.com/terms |
| App Icon | Upload 1024x1024 PNG |
| Category | Business and Pages |

### 6.2 Go to Settings → Advanced

| Field | Value |
|-------|-------|
| Business Manager | Link if you have one (optional) |

---

## STEP 7: Submit for App Review

### 7.1 Complete Submission
1. Go to **App Review → Permissions and Features**
2. For each permission you requested:
   - Upload your demo video
   - Add use case description
   - Add step-by-step instructions
3. Click **"Submit for Review"**

### 7.2 After Submission
- You'll receive an email confirmation
- Review typically takes 2-5 business days
- You may receive follow-up questions

---

## STEP 8: Common Rejection Reasons & How to Avoid

| Rejection Reason | How to Fix |
|------------------|------------|
| Video doesn't show permission screen | Re-record, pause on OAuth consent screen |
| Can't verify post on Facebook | Show the actual Page with the post visible |
| Privacy Policy incomplete | Add specific Facebook data usage section |
| No data deletion process | Implement /auth/facebook/delete endpoint |
| App requests unused permissions | Only request permissions you demonstrate |
| Test user account blocked | Use a real developer account, not fake accounts |

---

## STEP 9: After Approval

Once approved:

1. **Switch to Live Mode**
   - Go to your app in Meta Developer Portal
   - Toggle from **Development** to **Live**

2. **Update Your App**
   - Ensure production OAuth redirect URIs are set
   - Test with a non-developer account

3. **Monitor Usage**
   - Check the App Dashboard for errors
   - Monitor rate limits

---

## Quick Reference: Permissions Summary

| Permission | Purpose | Requires Review? |
|------------|---------|------------------|
| `email` | Get user email | No |
| `public_profile` | Basic user info | No |
| `pages_show_list` | List user's Pages | **Yes** |
| `pages_read_engagement` | Read Page metrics | **Yes** |
| `pages_manage_posts` | Post to Pages | **Yes** |

---

## Timeline Estimate

| Step | Time Required |
|------|---------------|
| Set up Meta App | 30 minutes |
| Create Privacy Policy/Terms | 1-2 hours |
| Implement Data Deletion endpoint | 1-2 hours |
| Record Demo Video | 1-2 hours |
| Fill out App Review forms | 1 hour |
| **Wait for Meta Review** | **2-5 business days** |

**Total: ~1 day of work + 2-5 days waiting**

---

## Need Help?

- Meta Developer Documentation: https://developers.facebook.com/docs/
- Meta Support: https://developers.facebook.com/support/
- Common issues: Check the "Rejection Reasons" section above
