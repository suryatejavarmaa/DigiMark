# DigiMark - Render Deployment Guide

Yes! You can deploy frontend and backend **separately** on Render. Here's the complete step-by-step guide.

---

## OVERVIEW

| Component | Render Service Type | URL Example |
|-----------|-------------------|-------------|
| Backend (server) | **Web Service** | `https://digimark-api.onrender.com` |
| Frontend (app) | **Static Site** | `https://digimark.onrender.com` |

---

## PART 1: Deploy Backend (Server)

### Step 1.1: Prepare Your Repository

Your backend code is in `/server` folder. You need to push it to GitHub.

**Option A: Same Repo (Recommended)**
Keep everything in one repo, Render will use the `/server` folder.

**Option B: Separate Repo**
Create a new repo for just the server code.

### Step 1.2: Create render.yaml for Backend

Create this file in your project root:

```yaml
# render.yaml
services:
  - type: web
    name: digimark-api
    env: node
    rootDir: server
    buildCommand: npm install
    startCommand: node index.js
    envVars:
      - key: NODE_ENV
        value: production
```

### Step 1.3: Go to Render Dashboard

1. Go to: https://render.com
2. Sign up/Login (use GitHub for easy connection)
3. Click **"New +"** → **"Web Service"**

### Step 1.4: Connect GitHub Repository

1. Select your DigiMark repository
2. Click **"Connect"**

### Step 1.5: Configure Backend Service

| Setting | Value |
|---------|-------|
| Name | `digimark-api` |
| Region | Choose closest to you |
| Branch | `main` |
| Root Directory | `server` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `node index.js` |
| Instance Type | `Free` (or Starter for better performance) |

### Step 1.6: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add ALL of these from your `.env` file:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | your-groq-key |
| `HUGGINGFACE_API_KEY` | your-hf-key |
| `LINKEDIN_CLIENT_ID` | your-linkedin-client-id |
| `LINKEDIN_CLIENT_SECRET` | your-linkedin-client-secret |
| `TWITTER_CLIENT_ID` | your-twitter-client-id |
| `TWITTER_CLIENT_SECRET` | your-twitter-client-secret |
| `FACEBOOK_APP_ID` | your-facebook-app-id |
| `FACEBOOK_APP_SECRET` | your-facebook-app-secret |
| `REDIRECT_URI` | `https://digimark-api.onrender.com/auth/callback` |
| `NODE_ENV` | `production` |

### Step 1.7: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes)
3. Note your backend URL: `https://digimark-api.onrender.com`

### Step 1.8: Test Backend

Visit: `https://digimark-api.onrender.com`
Should show: "Website Summarizer Server is Running!"

---

## PART 2: Deploy Frontend

### Step 2.1: Update Frontend API URLs

Before deploying, update your frontend to use the new backend URL.

**File to update:** `src/services/SocialService.ts` (and any other files with `localhost:5001`)

Change:
```typescript
const baseUrl = 'http://localhost:5001';
```

To:
```typescript
const baseUrl = 'https://digimark-api.onrender.com';
```

**Also check:** `src/App.tsx` or any files making API calls.

### Step 2.2: Build Frontend Locally (Test)

```bash
cd "c:\Users\Asus\Downloads\Demoo\Digi Demo\auto demo"
npm run build
```

Make sure build succeeds with no errors.

### Step 2.3: Go to Render Dashboard

1. Click **"New +"** → **"Static Site"**

### Step 2.4: Connect Repository

1. Select the same DigiMark repository
2. Click **"Connect"**

### Step 2.5: Configure Frontend Static Site

| Setting | Value |
|---------|-------|
| Name | `digimark` |
| Branch | `main` |
| Root Directory | `.` (or leave empty for root) |
| Build Command | `npm install && npm run build` |
| Publish Directory | `build` |

### Step 2.6: Add Environment Variables (if needed)

If your frontend uses any environment variables (like VITE_API_URL):

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://digimark-api.onrender.com` |

### Step 2.7: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for build (3-5 minutes)
3. Note your frontend URL: `https://digimark.onrender.com`

---

## PART 3: Update OAuth Redirect URIs

### Step 3.1: Update Meta Developer Portal

Go to: https://developers.facebook.com/apps/1533991621176794/

**Facebook Login → Settings:**
| Setting | New Value |
|---------|-----------|
| Valid OAuth Redirect URIs | `https://digimark-api.onrender.com/auth/callback` |
| | `https://digimark-api.onrender.com/auth/facebook/callback` |
| Deauthorize Callback URL | `https://digimark-api.onrender.com/auth/facebook/deauthorize` |
| Data Deletion Request URL | `https://digimark-api.onrender.com/auth/facebook/delete` |

**Settings → Basic:**
| Setting | New Value |
|---------|-----------|
| App Domains | `digimark.onrender.com`, `digimark-api.onrender.com` |
| Privacy Policy URL | `https://digimark.onrender.com/privacy` |
| Terms of Service URL | `https://digimark.onrender.com/terms` |

### Step 3.2: Update LinkedIn Developer Portal

Go to: https://www.linkedin.com/developers/apps/

**Auth → OAuth 2.0 settings:**
| Setting | New Value |
|---------|-----------|
| Authorized redirect URLs | `https://digimark-api.onrender.com/auth/callback` |

### Step 3.3: Update Twitter Developer Portal

Go to: https://developer.twitter.com/

**App Settings → Authentication settings:**
| Setting | New Value |
|---------|-----------|
| Callback URLs | `https://digimark-api.onrender.com/auth/callback` |

---

## PART 4: Final Testing

### 4.1: Test Frontend
1. Visit: `https://digimark.onrender.com`
2. Verify app loads correctly

### 4.2: Test OAuth Flow
1. Click "Connect LinkedIn" or "Connect Facebook"
2. Should redirect to OAuth consent screen
3. After approval, should redirect back to your app

### 4.3: Test Posting
1. Create a post
2. Publish to a connected platform
3. Verify post appears on the social platform

---

## TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Backend returns 502 | Check Render logs, likely an error in index.js |
| CORS errors | Add frontend URL to CORS whitelist in backend |
| OAuth redirect fails | Check redirect URIs match exactly |
| Build fails | Check build logs in Render dashboard |

### Enable CORS for Frontend

In your `server/index.js`, update CORS:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3002',
    'http://localhost:5174',
    'https://digimark.onrender.com'
  ],
  credentials: true
}));
```

---

## SUMMARY

After deployment, you'll have:

| Service | URL |
|---------|-----|
| Frontend | `https://digimark.onrender.com` |
| Backend API | `https://digimark-api.onrender.com` |
| OAuth Callback | `https://digimark-api.onrender.com/auth/callback` |

Use these URLs in your Meta App Review submission!
