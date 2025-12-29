# DigiMark - Facebook/Meta App Review Submission

## App Overview

**App Name:** DigiMark  
**Category:** Social Media Management / Business Tool  
**Target Users:** Small businesses, marketers, content creators with Facebook Pages

---

## Use Case Description

> DigiMark is an AI-powered social media management platform that helps businesses create, schedule, and publish professional content to their Facebook Pages.
>
> **Facebook Integration Use Case:**  
> Business owners connect their Facebook account via OAuth to enable posting to their Facebook Pages. The app:
> 1. Authenticates users securely using Facebook Login
> 2. Retrieves the user's Facebook Pages they manage
> 3. Generates professional captions and images using AI
> 4. Allows users to schedule posts or publish immediately to their Page
> 5. Posts content (photos with captions) on behalf of the Page using the Pages API
>
> Users maintain full control and can disconnect at any time. Only Page-level permissions are used – we never post to personal profiles.

---

## Permissions Requested

| Permission | Reason | Required For |
|------------|--------|--------------|
| `pages_show_list` | To display user's Facebook Pages | Showing which Pages user can post to |
| `pages_read_engagement` | To verify Page connection status | Confirming Page is properly connected |
| `pages_manage_posts` | To publish content to Pages | **Core functionality** - posting photos with captions |

---

## Demo Video Script

**Duration:** 3-4 minutes

### Scene 1: Introduction (15 sec)
- Show DigiMark logo
- Text: "AI-powered social media management for businesses"

### Scene 2: Business Onboarding (20 sec)
- User enters business name and details
- Show business-focused UI

### Scene 3: Content Creation (40 sec)
- User selects "Create Post"
- AI generates a professional caption for the business
- User can edit and customize
- User selects/generates an image

### Scene 4: Facebook Connection (45 sec)
- User clicks "Connect Facebook"
- **Show the Facebook Login screen** (important!)
- **Show the permission consent screen** (critical!)
- User approves permissions
- App displays list of user's Facebook Pages
- User selects their business Page

### Scene 5: Publishing to Facebook Page (40 sec)
- User selects Facebook as publishing platform
- User clicks "Post Now"
- Show loading/publishing state
- Show success message

### Scene 6: Verification on Facebook (30 sec)
- Open Facebook in browser
- Navigate to the user's Facebook Page
- **Show the published post on the Page** (critical proof!)
- Highlight: "Posted via DigiMark" or similar

### Scene 7: User Controls (30 sec)
- Show settings/account page
- Demonstrate "Disconnect Facebook" option
- Show data deletion option
- Text: "Users have full control over their data"

---

## Technical Implementation

### OAuth Flow
```
1. User clicks "Connect Facebook"
2. Redirect to Facebook OAuth:
   https://www.facebook.com/v18.0/dialog/oauth
   - client_id=[APP_ID]
   - redirect_uri=[CALLBACK_URL]
   - scope=pages_show_list,pages_read_engagement,pages_manage_posts
3. User grants consent
4. Facebook redirects with authorization code
5. Server exchanges code for User Access Token
6. Server calls /me/accounts to get Page Access Tokens
7. Page Access Token stored securely in Firebase
```

### Posting Flow
```
1. User creates content in app
2. User selects Facebook Page + clicks Publish
3. Server calls Facebook Graph API:
   POST https://graph.facebook.com/v18.0/{page_id}/photos
   - url: [image_url]
   - caption: [user_caption]
   - access_token: [page_access_token]
4. Photo with caption appears on Facebook Page
```

---

## Data Handling & Privacy

### What We Collect
- Facebook User ID (to identify the user)
- Page Access Tokens (to post on behalf of the Page)
- Page ID and Page Name (to display in the app)

### What We DON'T Collect
- Personal profile data
- Friends list
- Private messages
- Any data from personal Facebook account

### Data Storage
- Tokens stored in Firebase with user-specific encryption
- Data associated with user's DigiMark account only
- Never shared with third parties

### Data Deletion
- Users can disconnect Facebook from app settings
- Upon disconnection, all tokens are immediately deleted
- Users can request full data deletion via [Data Deletion URL]

---

## Data Deletion Instructions

When a user requests data deletion:
1. Navigate to DigiMark Settings
2. Click "Disconnect Facebook"
3. All Facebook tokens are deleted immediately
4. For complete account deletion, contact: [Your Email]

**Data Deletion Callback URL:** `https://[your-domain]/auth/facebook/delete`

---

## Contact Information

**Developer:** [Your Name]  
**Business Name:** [Your Business/Company Name]  
**Email:** [Your Email]  
**Website:** [Your Website URL]  
**Privacy Policy:** [Privacy Policy URL]  
**Terms of Service:** [Terms of Service URL]  
**Data Deletion:** [Data Deletion Instructions URL]

---

## Checklist Before Submission

- [ ] Privacy Policy URL added to Meta Developer Portal
- [ ] Data Deletion Instructions URL added
- [ ] App logo uploaded (1024x1024 recommended)
- [ ] Production OAuth redirect URI configured  
- [ ] Demo video recorded and uploaded
- [ ] Business verification completed (if required)
- [ ] All test accounts working correctly
- [ ] Tested on a real Facebook Page (not personal profile)

---

## Common Rejection Reasons to Avoid

1. ❌ Video doesn't show the OAuth consent screen clearly
2. ❌ Video doesn't show the actual post appearing on Facebook
3. ❌ No data deletion process documented
4. ❌ Privacy policy doesn't mention Facebook data usage
5. ❌ App requests more permissions than demonstrated in video

✅ Make sure your video shows EVERY permission being used!
