# DigiMark-New - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Authentication Flow](#authentication-flow)
5. [Social Post Creation Flow](#social-post-creation-flow)
6. [Business Poster Flow](#business-poster-flow)
7. [Content Remix Flow](#content-remix-flow)
8. [Publishing System](#publishing-system)
9. [Scheduling System](#scheduling-system)
10. [Ads Campaign Management](#ads-campaign-management)
11. [Calendar & Post Management](#calendar--post-management)
12. [Services Architecture](#services-architecture)
13. [Component Reference](#component-reference)
14. [State Management](#state-management)
15. [API Endpoints](#api-endpoints)

---

## Project Overview

**DigiMark-New** is a mobile-first social media marketing automation platform built with React, Vite, TypeScript, and TailwindCSS. It enables businesses to create, schedule, and publish AI-generated content across multiple social media platforms.

### Key Features
- ✅ AI-generated social media captions (Groq/LLaMA 3.3)
- ✅ AI-generated business posters/images (Pollinations AI)
- ✅ Content remix with personalized voice
- ✅ Multi-platform publishing (LinkedIn, Facebook, Twitter, Instagram)
- ✅ Post scheduling with calendar management
- ✅ AI-powered ad campaign creation
- ✅ Analytics dashboard
- ✅ User profile and brand settings

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18.3.1, TypeScript, Vite 6.3.5 |
| **Styling** | TailwindCSS 4.1.12, Outfit font |
| **UI Components** | Radix UI primitives, Material UI, Lucide icons |
| **Charts** | Recharts |
| **Animation** | Motion (Framer Motion) |
| **Backend** | Node.js Express server |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **Storage** | Firebase Storage |
| **AI Services** | Groq API (LLaMA 3.3), Pollinations AI |

---

## Project Structure

```
DigiMark-New/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main router (~935 lines)
│   │   └── components/                # 64 React components
│   │       ├── Dashboard.tsx          # Main dashboard
│   │       ├── SocialPostCreation.tsx # Text post creation
│   │       ├── CreateBusinessPoster.tsx # Image poster creation
│   │       ├── ContentRemix.tsx       # Content remix feature
│   │       ├── CalendarView.tsx       # Calendar & scheduling
│   │       ├── AdsCampaignObjective.tsx # Ads campaign
│   │       └── ... (60+ more components)
│   ├── services/                      # 5 service modules
│   │   ├── AIService.ts               # AI caption/image generation
│   │   ├── AdsService.ts              # Ads campaign CRUD
│   │   ├── PublishService.ts          # Publish/schedule posts
│   │   ├── SocialService.ts           # OAuth connection status
│   │   └── UserService.ts             # User auth/profile
│   ├── lib/
│   │   └── firebase.ts                # Firebase configuration
│   ├── types/
│   │   └── ads.ts                     # TypeScript interfaces
│   ├── styles/                        # CSS files
│   └── main.tsx                       # Entry point
├── public/                            # Static assets
├── server/                            # Backend server (separate)
│   ├── index.js                       # Express server (~3200 lines)
│   ├── schedulerService.js            # Background scheduler
│   └── adsStrategyService.js          # AI ads strategy
└── package.json
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AUTHENTICATION FLOW                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐     ┌─────────────────┐     ┌─────────────────────┐       │
│  │ Splash      │────>│ Check localStorage│────>│ User Logged In?    │       │
│  │ Screen      │     │ for cached auth   │     │                    │       │
│  └─────────────┘     └─────────────────┘     └──────────┬──────────┘       │
│                                                         │                   │
│                              ┌──────────────────────────┴──────────┐        │
│                              │                                     │        │
│                         [YES]│                                [NO] │        │
│                              ▼                                     ▼        │
│                   ┌─────────────────┐                   ┌─────────────────┐ │
│                   │   Dashboard     │                   │ Login/Signup    │ │
│                   │                 │                   │ Choice          │ │
│                   └─────────────────┘                   └────────┬────────┘ │
│                                                                  │          │
│                              ┌───────────────────────────────────┘          │
│                              ▼                                              │
│                   ┌─────────────────┐                                       │
│                   │ Onboarding 1A   │ Personal Info (Name, DOB, Gender)     │
│                   └────────┬────────┘                                       │
│                            ▼                                                │
│                   ┌─────────────────┐                                       │
│                   │ Onboarding 1B   │ Business Info (Company, Type, Role)   │
│                   └────────┬────────┘                                       │
│                            ▼                                                │
│                   ┌─────────────────┐                                       │
│                   │ Onboarding 2    │ Brand Settings (Colors, Voice, Style) │
│                   └────────┬────────┘                                       │
│                            ▼                                                │
│                   ┌─────────────────┐                                       │
│                   │ Onboarding 3    │ Connect Social Channels               │
│                   └────────┬────────┘                                       │
│                            ▼                                                │
│                   ┌─────────────────┐                                       │
│                   │   Dashboard     │ User profile saved to Firestore       │
│                   └─────────────────┘                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Firebase Collections

```javascript
// User Profile: users/{userId}
{
  fullName: "John Doe",
  email: "john@company.com",
  businessName: "Acme Corp",
  businessType: "Technology",
  primaryColor: "#8366FF",
  brandVoiceTone: 5,
  connectedSocials: ["linkedin", "twitter"],
  createdAt: Timestamp
}

// OAuth Tokens: users/{userId}/tokens/{platform}
{
  access_token: "...",
  refresh_token: "...",
  expires_at: Timestamp
}
```

---

## Social Post Creation Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SOCIAL POST CREATION FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dashboard                                                                  │
│     │                                                                       │
│     │ Click "Social Post"                                                   │
│     ▼                                                                       │
│  ┌──────────────────────┐                                                   │
│  │ SocialPostCreation   │  Enter topic, select platform, choose tone       │
│  │ - Topic input        │  Platforms: LinkedIn, Twitter, Facebook, IG      │
│  │ - Platform select    │  Tones: Professional, Casual, Humorous, etc.     │
│  │ - Tone selection     │                                                   │
│  └──────────┬───────────┘                                                   │
│             │ Click "Generate"                                              │
│             ▼                                                               │
│  ┌──────────────────────┐     POST /generate-caption                       │
│  │ CaptionGenerating    │────────────────────────────┐                     │
│  │ (Loading animation)  │                            │                     │
│  └──────────────────────┘                            ▼                     │
│                                            ┌─────────────────┐             │
│                                            │ Backend (Groq)  │             │
│                                            │ LLaMA 3.3 70B   │             │
│                                            └────────┬────────┘             │
│                                                     │                      │
│             ┌───────────────────────────────────────┘                      │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ GeneratedCaption     │  AI-generated caption displayed                  │
│  │ - View caption       │  User can edit, regenerate, or proceed           │
│  │ - Edit option        │                                                   │
│  │ - Regenerate button  │                                                   │
│  └──────────┬───────────┘                                                   │
│             │ Click "Continue"                                              │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ SelectChannels       │  Choose platforms to publish to                   │
│  │ - LinkedIn           │  Shows connected/disconnected status              │
│  │ - Twitter            │  OAuth connect for disconnected platforms         │
│  │ - Facebook           │                                                   │
│  │ - Instagram          │                                                   │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│     ┌───────┴───────┐                                                       │
│     │               │                                                       │
│ [Publish Now]   [Schedule]                                                  │
│     │               │                                                       │
│     ▼               ▼                                                       │
│  PreviewPost    SchedulePicker ──> SchedulePreview ──> ScheduleConfirmation│
│     │                                                                       │
│     ▼                                                                       │
│  PublishingAnimation ──> PublishingSuccess / PublishingFailed              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Business Poster Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BUSINESS POSTER FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dashboard                                                                  │
│     │                                                                       │
│     │ Click "Business Poster"                                               │
│     ▼                                                                       │
│  ┌──────────────────────┐                                                   │
│  │ CreateBusinessPoster │  Enter description of poster                      │
│  │ - Description input  │  AI suggests templates based on company           │
│  │ - Template suggestions│                                                  │
│  └──────────┬───────────┘                                                   │
│             │ Click "Continue"                                              │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ AIGraphicAdvanced    │  Select style, ratio, lighting, colors           │
│  │ - Style: Modern, 3D, │  Styles: Modern Professional, 3D, Minimalist     │
│  │   Minimalist, etc.   │  Ratios: 1:1, 4:5, 16:9                          │
│  │ - Aspect ratio       │  Lighting: Natural, Studio, Dramatic             │
│  │ - Lighting           │                                                   │
│  │ - Color palette      │                                                   │
│  └──────────┬───────────┘                                                   │
│             │ Click "Generate"                                              │
│             ▼                                                               │
│  ┌──────────────────────┐     POST /generate-image                         │
│  │ GeneratingImages     │────────────────────────────┐                     │
│  │ (Loading animation)  │                            │                     │
│  └──────────────────────┘                            ▼                     │
│                                            ┌─────────────────┐             │
│                                            │ Pollinations AI │             │
│                                            │ (3 variations)  │             │
│                                            └────────┬────────┘             │
│                                                     │                      │
│             ┌───────────────────────────────────────┘                      │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ GeneratedImages      │  3 AI-generated image variations                 │
│  │ - Image carousel     │  Select best one, regenerate, or edit            │
│  │ - Select image       │  Each image shows the prompt used                │
│  │ - Edit with AI       │                                                   │
│  │ - Regenerate         │                                                   │
│  └──────────┬───────────┘                                                   │
│             │ Click "Continue"                                              │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ SelectChannelsImage  │  Generate caption for image                       │
│  │ - Auto-gen caption   │  Select platforms to publish                      │
│  │ - Platform selection │                                                   │
│  │ - Edit caption       │                                                   │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│     ┌───────┴───────┐                                                       │
│     │               │                                                       │
│ [Publish Now]   [Schedule]                                                  │
│     │               │                                                       │
│     ▼               ▼                                                       │
│  PreviewPostImage  SchedulePostImage ──> ScheduleConfirmation              │
│     │                                                                       │
│     ▼                                                                       │
│  PublishingStateImage ──> PublishingResultsImage                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Content Remix Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTENT REMIX FLOW                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dashboard                                                                  │
│     │                                                                       │
│     │ Click "Content Remix" (NEW badge)                                     │
│     ▼                                                                       │
│  ┌──────────────────────┐                                                   │
│  │ ContentRemix         │                                                   │
│  │                      │  Two input options:                               │
│  │ ┌──────────────────┐ │                                                   │
│  │ │ Paste URL        │ │  1. Paste social media post URL                   │
│  │ └──────────────────┘ │     - System scrapes content with Puppeteer       │
│  │         OR           │                                                   │
│  │ ┌──────────────────┐ │  2. Paste text directly                           │
│  │ │ Paste Text       │ │     - Direct input of content to remix            │
│  │ └──────────────────┘ │                                                   │
│  │                      │                                                   │
│  └──────────┬───────────┘                                                   │
│             │ Click "Remix"                                                 │
│             ▼                                                               │
│  ┌──────────────────────┐     POST /api/remix-content                      │
│  │ AI Processing        │────────────────────────────┐                     │
│  │                      │                            │                     │
│  └──────────────────────┘                            ▼                     │
│                                            ┌─────────────────┐             │
│                                            │ Groq LLaMA 3.3  │             │
│                                            │ Uses company    │             │
│                                            │ summary for     │             │
│                                            │ personalization │             │
│                                            └────────┬────────┘             │
│                                                     │                      │
│             ┌───────────────────────────────────────┘                      │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ Remixed Content      │  Content transformed to match:                    │
│  │ - Original shown     │  - Your brand voice                               │
│  │ - Remixed version    │  - Your company perspective                       │
│  │ - Edit option        │  - Your business details                          │
│  └──────────┬───────────┘                                                   │
│             │ Click "Continue"                                              │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ SelectChannels       │  (Same as Social Post flow)                       │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│     ┌───────┴───────┐                                                       │
│ [Publish Now]   [Schedule]                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Publishing System

### Immediate Publishing Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      IMMEDIATE PUBLISHING SYSTEM                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Frontend (React)              Backend (Node.js)          Social Platforms  │
│       │                              │                          │           │
│   1. Click Publish                   │                          │           │
│       │──POST /publish──────────────>│                          │           │
│       │   {userId, platforms,        │                          │           │
│       │    content, mediaUrl}        │                          │           │
│       │                              │                          │           │
│       │                              │  2. Fetch OAuth tokens   │           │
│       │                              │     from Firestore       │           │
│       │                              │     (users/{userId}/     │           │
│       │                              │      tokens/{platform})  │           │
│       │                              │                          │           │
│       │                              │  3. If image exists:     │           │
│       │                              │     Save to local storage│           │
│       │                              │     (public/uploads/)    │           │
│       │                              │                          │           │
│       │                              │  4. For each platform:   │           │
│       │                              │                          │           │
│       │                              │─────LINKEDIN─────────────>│          │
│       │                              │  a. Register image upload │          │
│       │                              │  b. Upload binary         │          │
│       │                              │  c. Create UGC Post       │          │
│       │                              │<────────(post URL)────────│          │
│       │                              │                          │           │
│       │                              │─────TWITTER──────────────>│          │
│       │                              │  a. Upload media (OAuth1) │          │
│       │                              │  b. Create tweet          │          │
│       │                              │<────────(tweet URL)───────│          │
│       │                              │                          │           │
│       │                              │─────FACEBOOK─────────────>│          │
│       │                              │  a. Post photo to page    │          │
│       │                              │<────────(post URL)────────│          │
│       │                              │                          │           │
│       │                              │  5. Create notification   │           │
│       │                              │     in Firestore          │           │
│       │                              │                          │           │
│       │<──6. Return results──────────│                          │           │
│       │   {success, results[]}       │                          │           │
│       │                              │                          │           │
│   7. Show success/fail UI            │                          │           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Platform-Specific APIs

| Platform | API Used | Auth Method | Endpoint |
|----------|----------|-------------|----------|
| **LinkedIn** | UGC Posts API v2 | OAuth 2.0 | `/v2/ugcPosts` |
| **Twitter** | Tweets API v2 + Media v1.1 | OAuth 1.0a | `/2/tweets`, `/1.1/media/upload.json` |
| **Facebook** | Graph API v18 | Page Access Token | `/{page_id}/photos` |
| **Instagram** | Graph API v18 | Business Account | `/{ig_id}/media`, `/{ig_id}/media_publish` |

---

## Scheduling System

### Schedule Post Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SCHEDULING SYSTEM                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STEP 1: USER SCHEDULES POST                                                │
│  ────────────────────────────                                               │
│                                                                             │
│  Frontend                    Backend                     Firestore           │
│      │                          │                           │               │
│  1. Select date/time            │                           │               │
│     Click Schedule              │                           │               │
│      │──POST /schedule-post────>│                           │               │
│      │   {userId, platforms,    │                           │               │
│      │    content, mediaUrl,    │                           │               │
│      │    scheduledAt}          │                           │               │
│      │                          │                           │               │
│      │                          │  2. Validate scheduledAt  │               │
│      │                          │     (must be future)      │               │
│      │                          │                           │               │
│      │                          │  3. Save image locally    │               │
│      │                          │     if base64             │               │
│      │                          │                           │               │
│      │                          │──4. ADD scheduledPosts───>│               │
│      │                          │                           │               │
│      │<──5. Return {postId}─────│                           │               │
│      │                          │                           │               │
│  6. Show confirmation           │                           │               │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  STEP 2: BACKGROUND SCHEDULER (Every 60 seconds)                            │
│  ───────────────────────────────────────────────                            │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SchedulerService.js                                                │   │
│  │                                                                     │   │
│  │  scheduler.start(60000);  // Runs every 60 seconds                  │   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │ checkAndPublishScheduledPosts()                              │  │   │
│  │  │                                                              │  │   │
│  │  │ 1. Query Firestore:                                          │  │   │
│  │  │    scheduledPosts WHERE status = 'pending'                   │  │   │
│  │  │                                                              │  │   │
│  │  │ 2. Filter in code:                                           │  │   │
│  │  │    posts WHERE scheduledAt <= NOW                            │  │   │
│  │  │                                                              │  │   │
│  │  │ 3. For each due post:                                        │  │   │
│  │  │    ┌────────────────────────────────────────────────────┐   │  │   │
│  │  │    │ a. Call publishPost(postData)                      │   │  │   │
│  │  │    │ b. Post to LinkedIn/Twitter/Facebook               │   │  │   │
│  │  │    │ c. Update status: 'pending' → 'published'/'failed' │   │  │   │
│  │  │    │ d. Create notification in Firestore                │   │  │   │
│  │  │    └────────────────────────────────────────────────────┘   │  │   │
│  │  │                                                              │  │   │
│  │  │ 4. Wait 60 seconds...                                        │  │   │
│  │  │ 5. Repeat                                                    │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Firestore Document Structure

```javascript
// Collection: scheduledPosts
{
  id: "abc123xyz",
  userId: "user_456",
  platforms: ["linkedin", "twitter"],
  content: "Excited to announce our new product launch! 🚀 #Innovation #Tech",
  mediaUrl: "http://localhost:5001/uploads/1705700000000-user_456.png",
  scheduledAt: "2026-01-20T10:00:00.000Z",  // ISO string
  status: "pending",  // pending | published | failed | cancelled
  createdAt: "2026-01-19T05:30:00.000Z",
  updatedAt: "2026-01-19T05:30:00.000Z",
  
  // After publishing:
  publishedAt: "2026-01-20T10:00:15.000Z",
  publishResult: {
    success: true,
    results: {
      linkedin: { status: "success", url: "https://linkedin.com/..." },
      twitter: { status: "success", url: "https://twitter.com/..." }
    }
  }
}
```

---

## Ads Campaign Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ADS CAMPAIGN CREATION FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dashboard (Bottom Nav: "ADs")                                              │
│     │                                                                       │
│     │ Click "ADs"                                                           │
│     ▼                                                                       │
│  ┌──────────────────────┐                                                   │
│  │ AdsCampaignObjective │  Select campaign objective:                       │
│  │                      │  - Brand Awareness                                │
│  │ ○ Brand Awareness    │  - Traffic (Website visits)                       │
│  │ ○ Traffic            │  - Engagement (Likes, comments)                   │
│  │ ○ Engagement         │  - Leads (Form submissions)                       │
│  │ ○ Leads              │  - Conversions (Sales)                            │
│  │ ○ Conversions        │                                                   │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ AdsSetupStep1        │  AUDIENCE TARGETING                               │
│  │                      │                                                   │
│  │ Platform: [Facebook ▼]  - Select ad platform                             │
│  │                      │                                                   │
│  │ Audience:            │  - Define target audience                         │
│  │ [                   ]│    (e.g., "Tech professionals 25-45")             │
│  │                      │                                                   │
│  │ Age Range: 25-45     │  - Set age range                                  │
│  │ Gender: All          │  - Select gender                                  │
│  │ Interests: [tags]    │  - Add interests (auto-suggestions)               │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│             ▼                                                               │
│  ┌──────────────────────┐                                                   │
│  │ AdsSetupStep2        │  BUDGET & SCHEDULE                                │
│  │                      │                                                   │
│  │ Daily Budget: $__    │  - Set daily spend limit                          │
│  │                      │                                                   │
│  │ Duration:            │  - Campaign duration                              │
│  │ ○ 7 days             │                                                   │
│  │ ○ 14 days            │                                                   │
│  │ ○ 30 days            │                                                   │
│  │ ○ Custom             │                                                   │
│  │                      │                                                   │
│  │ Start Date: [__/__]  │  - Campaign start date                            │
│  └──────────┬───────────┘                                                   │
│             │                                                               │
│             ▼                                                               │
│  ┌──────────────────────┐     POST /api/ads/generate-copy                  │
│  │ AdsSetupStep3        │────────────────────────────┐                     │
│  │                      │                            │                     │
│  │ AI generates 3 ad    │                            ▼                     │
│  │ copy variations:     │            ┌─────────────────────────┐           │
│  │                      │            │ Groq AI generates:      │           │
│  │ [Variation 1]        │            │ - Headline              │           │
│  │ Headline: "..."      │            │ - Description           │           │
│  │ Description: "..."   │            │ - CTA (Call to Action)  │           │
│  │ CTA: "Learn More"    │            └─────────────────────────┘           │
│  │                      │                                                   │
│  │ [Variation 2]        │                                                   │
│  │ [Variation 3]        │                                                   │
│  │                      │                                                   │
│  │ Select best version  │                                                   │
│  └──────────┬───────────┘                                                   │
│             │ Click "Save Campaign"                                         │
│             │                                                               │
│             ▼   POST /api/ads/campaigns                                     │
│  ┌──────────────────────┐                                                   │
│  │ CampaignReady        │  Campaign saved to Firestore                      │
│  │                      │  users/{userId}/adsCampaigns/{campaignId}         │
│  │ "Campaign Ready!"    │                                                   │
│  │                      │                                                   │
│  │ [View Campaigns]     │ ──> AdsCampaignsList                              │
│  │ [Export to Platform] │ ──> AdsExportGuide                                │
│  └──────────────────────┘                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Ads Campaign Screens

| Screen | Purpose |
|--------|---------|
| `AdsCampaignObjective` | Select campaign goal |
| `AdsSetupStep1` | Audience targeting |
| `AdsSetupStep2` | Budget & schedule |
| `AdsSetupStep3` | AI ad copy generation |
| `CampaignReady` | Confirmation |
| `AdsCampaignsList` | View all campaigns |
| `AdsAnalyticsDashboard` | Manual analytics entry |
| `AdsExportGuide` | Step-by-step export instructions |

---

## Calendar & Post Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CALENDAR VIEW & POST MANAGEMENT                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dashboard (Bottom Nav: "Calendar")                                         │
│     │                                                                       │
│     │ Click "Calendar"                                                      │
│     ▼                                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ CalendarView.tsx                                                      │ │
│  │                                                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │         JANUARY 2026            [<]  [Today]  [>]               │ │ │
│  │  ├────┬────┬────┬────┬────┬────┬────┤                              │ │ │
│  │  │ Sun│ Mon│ Tue│ Wed│ Thu│ Fri│ Sat│                              │ │ │
│  │  ├────┼────┼────┼────┼────┼────┼────┤                              │ │ │
│  │  │    │    │    │  1 │  2 │  3 │  4 │                              │ │ │
│  │  ├────┼────┼────┼────┼────┼────┼────┤                              │ │ │
│  │  │  5 │  6 │  7 │  8 │  9 │ 10●│ 11 │  ● = Scheduled post         │ │ │
│  │  ├────┼────┼────┼────┼────┼────┼────┤                              │ │ │
│  │  │ 12 │ 13 │ 14●│ 15 │ 16 │ 17 │ 18 │                              │ │ │
│  │  └────┴────┴────┴────┴────┴────┴────┘                              │ │ │
│  │                                                                       │ │
│  │  ─────────────────────────────────────────────────────────────────   │ │
│  │  UPCOMING POSTS                                                       │ │
│  │  ─────────────────────────────────────────────────────────────────   │ │
│  │                                                                       │ │
│  │  ┌───────────────────────────────────────────────────────────────┐   │ │
│  │  │ 📅 Jan 10, 2026 at 10:00 AM                                   │   │ │
│  │  │ 🖼️ [Thumbnail]  "New product launch announcement..."          │   │ │
│  │  │ 📱 LinkedIn, Twitter                                          │   │ │
│  │  │                                        [Post Now] [Edit] [🗑️] │   │ │
│  │  └───────────────────────────────────────────────────────────────┘   │ │
│  │                                                                       │ │
│  │  ┌───────────────────────────────────────────────────────────────┐   │ │
│  │  │ 📅 Jan 14, 2026 at 2:30 PM                                    │   │ │
│  │  │ 📝 "Excited to share our Q1 results..."                       │   │ │
│  │  │ 📱 LinkedIn                                                    │   │ │
│  │  │                                        [Post Now] [Edit] [🗑️] │   │ │
│  │  └───────────────────────────────────────────────────────────────┘   │ │
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  USER ACTIONS:                                                              │
│  ────────────                                                               │
│                                                                             │
│  [Post Now] ──> PreviewPostNowText/Image ──> Publishing ──> Success         │
│                 (Deletes from scheduledPosts after publishing)              │
│                                                                             │
│  [Edit] ──> EditScheduledPostText/Image ──> SchedulePicker ──> Save         │
│             (Update caption, platforms, or schedule time)                   │
│                                                                             │
│  [Delete] ──> DeleteConfirmationModal ──> DeleteDoc from Firestore          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Services Architecture

### Service Communication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SERVICES ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         FRONTEND (React)                            │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │   │
│  │  │ AIService   │  │PublishService│ │ AdsService  │  │UserService│  │   │
│  │  │             │  │             │  │             │  │           │  │   │
│  │  │generateCap..│  │publish()    │  │saveCampaign │  │signUp()   │  │   │
│  │  │generateImg..│  │schedulePost │  │getCampaigns │  │login()    │  │   │
│  │  │generateTemp.│  │updatePost() │  │updateCampa..│  │logout()   │  │   │
│  │  │editImage()  │  │deletePost() │  │deleteCampa..│  │getProfile │  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬─────┘  │   │
│  │         │                │                │                │        │   │
│  └─────────┼────────────────┼────────────────┼────────────────┼────────┘   │
│            │                │                │                │            │
│            │    HTTP REST API Calls          │                │            │
│            ▼                ▼                ▼                │            │
│  ┌─────────────────────────────────────────────────┐          │            │
│  │              BACKEND (Node.js/Express)          │          │            │
│  │                                                 │          │            │
│  │  Endpoints:                                     │          │            │
│  │  - POST /generate-caption                       │          │            │
│  │  - POST /generate-image                         │          │            │
│  │  - POST /publish                                │          │            │
│  │  - POST /schedule-post                          │          │            │
│  │  - POST /api/ads/generate-strategy              │          │            │
│  │  - POST /api/ads/campaigns                      │          │            │
│  │  - ...                                          │          │            │
│  │                                                 │          │            │
│  │  ┌─────────────────────────────────────────┐   │          │            │
│  │  │        SchedulerService.js              │   │          │            │
│  │  │  (Background job, runs every 60 sec)    │   │          │            │
│  │  └─────────────────────────────────────────┘   │          │            │
│  └──────────────────────┬──────────────────────────┘          │            │
│                         │                                     │            │
│                         ▼                                     │            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      FIREBASE                                       │   │
│  │                                                                     │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │   │
│  │  │   Firestore   │  │     Auth      │  │    Storage    │           │   │
│  │  │               │  │               │  │               │           │   │
│  │  │ - users       │  │ Email/Pass    │  │ - posts/      │           │   │
│  │  │ - scheduledPo.│  │ Auth provider │  │ - uploads/    │           │   │
│  │  │ - company_sum.│  │               │  │               │           │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘           │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                         │                                                   │
│                         ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    EXTERNAL SERVICES                                │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐ │   │
│  │  │  Groq AI    │  │Pollinations │  │   Social Media APIs         │ │   │
│  │  │  (LLaMA 3.3)│  │  AI (Images)│  │                             │ │   │
│  │  │             │  │             │  │  - LinkedIn UGC API         │ │   │
│  │  │  Captions   │  │  Image Gen  │  │  - Twitter API v2           │ │   │
│  │  │  Templates  │  │  3 variants │  │  - Facebook Graph API       │ │   │
│  │  │  Ad Copy    │  │             │  │  - Instagram Graph API      │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘ │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Reference

### Component Categories (64 Total)

| Category | Count | Components |
|----------|-------|------------|
| **Onboarding** | 4 | OnboardingStep1A, 1B, 2, 3 |
| **Dashboard** | 3 | Dashboard, NotificationDropdown, NotificationsPage |
| **Content Creation** | 8 | SocialPostCreation, CreateBusinessPoster, AIGraphicCreation, AIGraphicAdvanced, CaptionGenerating, GeneratedCaption, GeneratingImages, GeneratedImages |
| **Channel Selection** | 3 | SelectChannels, SelectChannelsImage, ConnectAccountModal |
| **Preview/Publishing** | 12 | PreviewPost, PreviewPostImage, PreviewPostNowText/Image, PublishingAnimation, PublishingStateImage, PublishingSuccess, PublishingFailed, PublishingResultsImage, PostPublishSuccess |
| **Scheduling** | 10 | SchedulePicker, SchedulePreview, ScheduleConfirmation, SchedulingAnimation, SchedulePostImage, EditScheduledPostText/Image, DetailPreviewText/Image, ScheduleUpdateSuccess |
| **Calendar** | 2 | CalendarView, CalendarDetail |
| **Ads Campaign** | 9 | AdsCampaignObjective, AdsSetupStep1-3, AdsCampaignsList, AdsAnalyticsDashboard, AdsExportGuide, CampaignReady, ExecutionSetupInfo/Actions |
| **Profile/Settings** | 3 | ProfileSettings, PrivacyPolicy, WelcomeBack |
| **Misc** | 10 | SplashScreen, LoginSignupChoice, ComingSoon, PageTransition, ContentRemix, ImageEditPopup, DeleteConfirmationModal, DeleteSuccessModal, AnimatedHeroModule |

---

## State Management

### App.tsx State Variables

```typescript
// Navigation
currentScreen: string           // Current visible screen
returnScreen: string            // Screen to return to after modal/flow

// Authentication
userId: string | null           // Firebase auth user ID
userProfile: UserProfile | null // User profile data from Firestore
isAuthLoading: boolean          // Auth state loading

// Onboarding
onboardingData: any             // Collected data across onboarding steps

// Caption Generation
captionPrompt: string           // User input for caption
captionPlatform: string         // Selected platform (linkedin/twitter/etc)
captionTones: string[]          // Selected tones [professional, casual, etc]
generatedCaption: string        // AI-generated caption
isGeneratingCaption: boolean    // Loading state

// Image Generation
posterDescription: string       // User input for poster
posterStyle: string             // Selected style (Modern, 3D, etc)
posterRatio: string             // Aspect ratio (1:1, 4:5, 16:9)
generatedImages: string[]       // Array of 3 image URLs
generatedPrompts: string[]      // Prompts used for each image
selectedImageIndex: number      // Currently selected image
isGeneratingImages: boolean     // Loading state

// Publishing
selectedPlatforms: string[]     // Platforms to publish to
publishCaption: string          // Final caption to publish
publishImageUrl: string         // Final image to publish
isPublishing: boolean           // Publishing in progress
publishResults: any             // Results from publish API

// Scheduling
scheduleTime: string            // Selected schedule time
isScheduling: boolean           // Scheduling in progress

// Ads
selectedAdsCampaign: AdsCampaign | null  // Campaign being viewed/edited

// Flow Tracking
contentType: 'text' | 'image'   // Current flow type
flowSource: string              // Where user came from (for back nav)
```

---

## API Endpoints

### Backend Server (port 5001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| **AI Generation** |
| POST | `/generate-caption` | Generate AI caption |
| POST | `/generate-image` | Generate AI images (3 variations) |
| POST | `/edit-image` | Edit image with AI (img2img) |
| POST | `/api/generate-templates` | Generate caption templates |
| POST | `/api/generate-poster-templates` | Generate poster templates |
| POST | `/api/create-company-summary` | Create company summary for AI |
| **Publishing** |
| POST | `/publish` | Publish to multiple platforms |
| POST | `/schedule-post` | Schedule post for future |
| PUT | `/update-scheduled-post` | Update scheduled post |
| POST | `/deleteScheduledPost` | Delete scheduled post |
| **OAuth** |
| GET | `/auth/linkedin` | Start LinkedIn OAuth |
| GET | `/auth/linkedin/callback` | LinkedIn OAuth callback |
| GET | `/auth/twitter` | Start Twitter OAuth |
| GET | `/auth/twitter/callback` | Twitter OAuth callback |
| GET | `/auth/facebook` | Start Facebook OAuth |
| GET | `/auth/facebook/callback` | Facebook OAuth callback |
| **Ads Campaigns** |
| POST | `/api/ads/generate-strategy` | Generate campaign strategy |
| POST | `/api/ads/generate-copy` | Generate ad copy variations |
| POST | `/api/ads/campaigns` | Save campaign |
| GET | `/api/ads/campaigns/:userId` | Get user's campaigns |
| GET | `/api/ads/campaigns/:userId/:campaignId` | Get single campaign |
| PUT | `/api/ads/campaigns/:userId/:campaignId` | Update campaign |
| DELETE | `/api/ads/campaigns/:userId/:campaignId` | Delete campaign |
| POST | `/api/ads/export-guide` | Get export guide |
| POST | `/api/ads/analytics/:userId/:campaignId` | Save analytics |
| **Content Remix** |
| POST | `/summarize` | Scrape and summarize URL |
| POST | `/api/remix-content` | Remix content with AI |

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://127.0.0.1:5001
```

### Backend (.env)
```
GROQ_API_KEY=your_groq_api_key
TWITTER_CLIENT_ID=your_twitter_consumer_key
TWITTER_CLIENT_SECRET=your_twitter_consumer_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

---

## Design System

| Element | Value |
|---------|-------|
| **Primary Color** | `#8366FF` (Purple) |
| **Accent Color** | `#22C55E` (Green) |
| **Font** | Outfit (Google Fonts) |
| **Border Radius** | 12px-16px for cards |
| **Max Width** | 480px (mobile-first) |
| **Shadows** | Subtle purple-tinted: `0 4px 16px rgba(131, 102, 255, 0.15)` |

---

*Documentation generated on January 19, 2026*
*DigiMark-New v0.0.1*
