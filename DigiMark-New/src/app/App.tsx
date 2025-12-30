import { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { UserService, UserProfile } from '../services/UserService';
import { AIService } from '../services/AIService';
import { PublishService } from '../services/PublishService';
import { SocialService } from '../services/SocialService';
import { SplashScreen } from './components/SplashScreen';
import { LoginSignupChoice } from './components/LoginSignupChoice';
import { OnboardingStep1A } from './components/OnboardingStep1A';
import { OnboardingStep1B } from './components/OnboardingStep1B';
import { OnboardingStep2 } from './components/OnboardingStep2';
import { OnboardingStep3 } from './components/OnboardingStep3';
import { Dashboard } from './components/Dashboard';
import { SocialPostCreation } from './components/SocialPostCreation';
import { AIGraphicCreation } from './components/AIGraphicCreation';
import { CaptionGenerating } from './components/CaptionGenerating';
import { GeneratedCaption } from './components/GeneratedCaption';
import { SelectChannels } from './components/SelectChannels';
import { ConnectAccountModal } from './components/ConnectAccountModal';
import { PreviewPost } from './components/PreviewPost';
import { PublishingAnimation } from './components/PublishingAnimation';
import { PublishingSuccess } from './components/PublishingSuccess';
import { PublishingFailed } from './components/PublishingFailed';
import { SchedulePicker } from './components/SchedulePicker';
import { SchedulePreview } from './components/SchedulePreview';
import { ScheduleConfirmation } from './components/ScheduleConfirmation';
import { SchedulingAnimation } from './components/SchedulingAnimation';
import { CalendarView } from './components/CalendarView';
import { CreateBusinessPoster } from './components/CreateBusinessPoster';
import { AIGraphicAdvanced } from './components/AIGraphicAdvanced';
import { GeneratingImages } from './components/GeneratingImages';
import { GeneratedImages } from './components/GeneratedImages';
import { SelectChannelsImage } from './components/SelectChannelsImage';
import { PreviewPostImage } from './components/PreviewPostImage';
import { PublishingStateImage } from './components/PublishingStateImage';
import { PublishingResultsImage } from './components/PublishingResultsImage';
import { SchedulePostImage } from './components/SchedulePostImage';
import { PreviewEventPost } from './components/PreviewEventPost';
import { ProfileSettings } from './components/ProfileSettings';
import { EditScheduledPostText } from './components/EditScheduledPostText';
import { DetailPreviewText } from './components/DetailPreviewText';
import { EditScheduledPostImage } from './components/EditScheduledPostImage';
import { DetailPreviewImage } from './components/DetailPreviewImage';
import { ScheduleUpdateSuccess } from './components/ScheduleUpdateSuccess';
import { PreviewPostNowText } from './components/PreviewPostNowText';
import { PreviewPostNowImage } from './components/PreviewPostNowImage';
import { PostPublishSuccess } from './components/PostPublishSuccess';
import { WelcomeBack } from './components/WelcomeBack';
import { AdsCampaignObjective } from './components/AdsCampaignObjective';
import { AdsSetupStep1 } from './components/AdsSetupStep1';
import { AdsSetupStep2 } from './components/AdsSetupStep2';
import { AdsSetupStep3 } from './components/AdsSetupStep3';
import { ComingSoon } from './components/ComingSoon';
import { ExecutionSetupInfo } from './components/ExecutionSetupInfo';
import { ExecutionSetupActions } from './components/ExecutionSetupActions';
import { CampaignReady } from './components/CampaignReady';
import { NotificationsPage } from './components/NotificationsPage';
import { PageTransition } from './components/PageTransition';
import { PrivacyPolicy } from './components/PrivacyPolicy';

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [returnScreen, setReturnScreen] = useState<string>('');

  // User authentication state
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Onboarding data state (collected across steps)
  const [onboardingData, setOnboardingData] = useState<any>({});

  // Text generation state
  const [captionPrompt, setCaptionPrompt] = useState<string>('');
  const [captionPlatform, setCaptionPlatform] = useState<string>('linkedin');
  const [captionTones, setCaptionTones] = useState<string[]>(['professional']);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  // Image generation state
  const [posterDescription, setPosterDescription] = useState<string>('');
  const [posterStyle, setPosterStyle] = useState<string>('Modern Professional');
  const [posterRatio, setPosterRatio] = useState<string>('1:1');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  // Publishing state
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [publishCaption, setPublishCaption] = useState<string>('');
  const [publishImageUrl, setPublishImageUrl] = useState<string>('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResults, setPublishResults] = useState<any>(null);

  // Scheduling state
  const [scheduleTime, setScheduleTime] = useState<string>('');
  const [isScheduling, setIsScheduling] = useState(false);

  // Content type state to track flow (text vs image)
  const [contentType, setContentType] = useState<'text' | 'image'>('text');

  // Firebase Auth listener - Auto-login on page reload
  useEffect(() => {
    // Check localStorage for quick auth state (faster than waiting for Firebase)
    const cachedUserId = localStorage.getItem('digimark_user_id');
    const cachedLoginTime = localStorage.getItem('digimark_login_time');

    // Session timeout: 7 days (in milliseconds)
    const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000;

    // If cached user exists and session is not expired, show dashboard immediately
    if (cachedUserId && cachedLoginTime) {
      const loginTime = parseInt(cachedLoginTime);
      const isSessionValid = Date.now() - loginTime < SESSION_TIMEOUT;

      if (isSessionValid) {
        setUserId(cachedUserId);
        // Go directly to dashboard
        setCurrentScreen('dashboard');
      }
    }

    // Check for direct URL paths (for privacy policy, terms, etc.)
    const path = window.location.pathname;
    if (path === '/privacy-policy' || path === '/privacy') {
      setCurrentScreen('privacy-policy');
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        // Store in localStorage for faster reload
        localStorage.setItem('digimark_user_id', user.uid);
        localStorage.setItem('digimark_login_time', Date.now().toString());

        try {
          const profile = await UserService.getUserProfile(user.uid);
          setUserProfile(profile);

          // If user is logged in, go directly to dashboard (skip welcome-back)
          if (profile && (currentScreen === 'splash' || currentScreen === 'login-choice' || currentScreen === 'welcome-back')) {
            setCurrentScreen('dashboard');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        // User logged out - clear localStorage and state
        localStorage.removeItem('digimark_user_id');
        localStorage.removeItem('digimark_login_time');

        // Only clear state if user logs out, not during signup
        const onboardingScreens = ['onboarding-1a', 'onboarding-1b', 'onboarding-2', 'onboarding-2b'];
        if (!onboardingScreens.includes(currentScreen)) {
          setUserId(null);
          setUserProfile(null);
        }
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Update content type based on screen navigation
  useEffect(() => {
    if (currentScreen === 'social-post-creation') {
      setContentType('text');
    } else if (currentScreen === 'create-business-poster' || currentScreen === 'ai-graphic-creation') {
      setContentType('image');
    }
  }, [currentScreen]);

  useEffect(() => {
    // Apply Outfit font to body
    document.body.style.fontFamily = 'Outfit, sans-serif';
  }, []);

  // ==================== OAUTH CALLBACK HANDLER ====================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connectedPlatform = params.get('connected');
    const success = params.get('success');

    if (connectedPlatform) {
      console.log(`Connected to ${connectedPlatform}!`);
      SocialService.connect(connectedPlatform);

      // Show success message
      if (success === 'true') {
        alert(`✅ ${connectedPlatform.charAt(0).toUpperCase() + connectedPlatform.slice(1)} connected successfully!`);
      }

      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);

      // Restore saved state if exists
      const savedStateJson = sessionStorage.getItem('DIGIMARK_PENDING_STATE');
      if (savedStateJson) {
        try {
          const savedState = JSON.parse(savedStateJson);
          console.log('Restoring pending state...', savedState);

          // Restore data
          if (savedState.currentScreen) setCurrentScreen(savedState.currentScreen);
          if (savedState.generatedCaption) setGeneratedCaption(savedState.generatedCaption);
          if (savedState.publishCaption) setPublishCaption(savedState.publishCaption);
          if (savedState.publishImageUrl) setPublishImageUrl(savedState.publishImageUrl);
          if (savedState.generatedImages) setGeneratedImages(savedState.generatedImages);
          if (savedState.selectedPlatforms) setSelectedPlatforms(savedState.selectedPlatforms);

          // Clear saved state
          sessionStorage.removeItem('DIGIMARK_PENDING_STATE');
        } catch (e) {
          console.error('Failed to restore state:', e);
          setCurrentScreen('dashboard');
        }
      }
    }
  }, []);

  // ==================== SYNC LOCALSTORAGE TO STATE FOR PUBLISHING ====================
  useEffect(() => {
    // Sync localStorage values to state when navigating to publishing screens
    if (['publishing-animation', 'publishing-state-image', 'preview-post', 'preview-post-image', 'publishing-success', 'publishing-failed', 'publishing-results-image'].includes(currentScreen)) {
      const storedPlatforms = localStorage.getItem('selectedPlatforms');
      const storedCaption = localStorage.getItem('publishCaption');
      const storedImageUrl = localStorage.getItem('publishImageUrl');

      if (storedPlatforms) {
        const platforms = JSON.parse(storedPlatforms);
        if (platforms.length > 0) {
          setSelectedPlatforms(platforms);
        }
      }
      if (storedCaption) setPublishCaption(storedCaption);
      if (storedImageUrl) setPublishImageUrl(storedImageUrl);
    }
  }, [currentScreen]);

  // Platform to connect modal state
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [platformToConnect, setPlatformToConnect] = useState<string | null>(null);

  // Publish result modal state
  const [showPublishResult, setShowPublishResult] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishFailedPlatforms, setPublishFailedPlatforms] = useState<string[]>([]);

  // Save state before OAuth redirect
  const saveStateAndRedirect = (platform: string) => {
    const stateToSave = {
      currentScreen,
      generatedCaption,
      publishCaption,
      publishImageUrl,
      generatedImages,
      selectedPlatforms
    };
    sessionStorage.setItem('DIGIMARK_PENDING_STATE', JSON.stringify(stateToSave));

    // Redirect to OAuth
    const origin = encodeURIComponent(window.location.origin);
    const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
    window.location.href = `${apiBase}/auth/${platform}?userId=${userId}&redirect_origin=${origin}`;
  };

  // Handle connect button click
  const handleConnectPlatform = (platform: string) => {
    setPlatformToConnect(platform);
    setShowConnectModal(true);
  };

  const confirmConnect = () => {
    if (platformToConnect) {
      saveStateAndRedirect(platformToConnect);
    }
    setShowConnectModal(false);
  };

  const handleSplashComplete = () => {
    // Check if user is already logged in
    if (userId && userProfile) {
      setCurrentScreen('welcome-back');
    } else {
      setCurrentScreen('login-choice');
    }
  };

  // ==================== ONBOARDING DATA HANDLERS ====================
  // Step 1A: Personal Info
  const handleStep1AData = (data: any) => {
    setOnboardingData((prev: any) => ({ ...prev, ...data }));
  };

  // Step 1B: Business Info
  const handleStep1BData = (data: any) => {
    setOnboardingData((prev: any) => ({ ...prev, ...data }));
  };

  // Step 2: Brand Settings - Just save data and navigate to Step 3
  const handleStep2Complete = (brandData: any) => {
    // Just save the brand data, don't trigger signup yet
    setOnboardingData((prev: any) => ({ ...prev, ...brandData }));
    setCurrentScreen('onboarding-2b');
  };

  // Step 3: Final Step - Create user and go to Dashboard
  const handleStep3Complete = async (channelData: any) => {
    const completeData = { ...onboardingData, connectedChannels: channelData?.connectedChannels || [] };

    try {
      // Navigate to dashboard immediately for better UX
      setCurrentScreen('dashboard');

      // Create user in Firebase Auth and save profile (in background)
      const newUserId = await UserService.signUp(
        completeData.email,
        completeData.password,
        {
          fullName: completeData.name,
          dateOfBirth: completeData.dob,
          gender: completeData.gender,
          role: completeData.role,
          businessName: completeData.businessName,
          businessType: completeData.businessType,
          ownerName: completeData.name,
          websiteUrl: completeData.website,
          primaryColor: completeData.primaryColor,
          accentColor: completeData.accentColor,
          visualStyle: completeData.selectedStyle,
          brandVoiceTone: completeData.brandVoice,
          businessDescription: '',
          connectedSocials: completeData.connectedChannels || []
        }
      );

      setUserId(newUserId);
      console.log('User created successfully:', newUserId);

      // Refresh user profile
      const profile = await UserService.getUserProfile(newUserId);
      setUserProfile(profile);

      // Create company summary for AI fine-tuning (in background)
      createCompanySummary(newUserId, completeData);

    } catch (error: any) {
      console.error('Signup error:', error);
      // Don't redirect back, user is already on dashboard
      // They can retry by logging out and signing up again
    }
  };

  // Create company summary for AI fine-tuning
  const createCompanySummary = async (uid: string, data: any) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';

      // Generate summary using Groq via backend
      const response = await fetch(`${API_BASE}/api/create-company-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: uid,
          businessName: data.businessName,
          businessType: data.businessType,
          websiteUrl: data.website,
          brandVoice: data.brandVoice,
          visualStyle: data.selectedStyle
        })
      });

      if (!response.ok) {
        console.warn('Could not create company summary via API, using fallback');
      } else {
        console.log('Company summary created successfully');
      }
    } catch (error) {
      console.error('Error creating company summary:', error);
    }
  };

  // ==================== CAPTION GENERATION HANDLERS ====================
  const handleGenerateCaption = async (prompt: string, platform: string, tones: string[]) => {
    setCaptionPrompt(prompt);
    setCaptionPlatform(platform);
    setCaptionTones(tones);
    setIsGeneratingCaption(true);
    setCurrentScreen('caption-generating');

    try {
      const caption = await AIService.generateCaption(prompt, platform, tones, userId);
      setGeneratedCaption(caption);
      setPublishCaption(caption); // Set for publishing later
      setPublishImageUrl(''); // Clear any previous image to prevent mixed flow issues
      localStorage.removeItem('publishImageUrl');
      setCurrentScreen('generated-caption');
    } catch (error) {
      console.error('Caption generation error:', error);
      setGeneratedCaption('Failed to generate caption. Please try again.');
      setCurrentScreen('generated-caption');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleRegenerateCaption = async () => {
    if (captionPrompt) {
      await handleGenerateCaption(captionPrompt, captionPlatform, captionTones);
    }
  };

  // ==================== IMAGE GENERATION HANDLERS ====================
  const handleGenerateImages = async (prompt: string, style: string, ratio: string) => {
    setPosterDescription(prompt);
    setPosterStyle(style);
    setPosterRatio(ratio);
    setIsGeneratingImages(true);
    setCurrentScreen('generating-images');

    try {
      const result = await AIService.generateImage(prompt, style, ratio, userId);
      setGeneratedImages(result.images);
      setGeneratedPrompts(result.prompts);
      setSelectedImageIndex(0);
      if (result.images.length > 0) {
        setPublishImageUrl(result.images[0]); // Set first image for publishing
      }
      setCurrentScreen('generated-images');
    } catch (error) {
      console.error('Image generation error:', error);
      setGeneratedImages([]);
      setCurrentScreen('generated-images');
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleSelectImage = (index: number, imageUrl?: string) => {
    setSelectedImageIndex(index);
    if (imageUrl) {
      setPublishImageUrl(imageUrl);
    } else if (generatedImages[index]) {
      setPublishImageUrl(generatedImages[index]);
    }
  };

  // ==================== PUBLISHING HANDLERS ====================
  const handlePublish = async (platforms: string[], caption: string, imageUrl?: string) => {
    setSelectedPlatforms(platforms);
    setPublishCaption(caption);
    if (imageUrl) setPublishImageUrl(imageUrl);
    setIsPublishing(true);
    setCurrentScreen(imageUrl ? 'publishing-state-image' : 'publishing-animation');

    try {
      const result = await PublishService.publish(
        userId || '',
        platforms,
        caption,
        imageUrl,
        imageUrl ? 'imageGen' : 'text'
      );
      setPublishResults(result);

      if (result.allSuccess || result.success) {
        setCurrentScreen(imageUrl ? 'publishing-results-image' : 'publishing-success');
      } else {
        setCurrentScreen('publishing-failed');
      }
    } catch (error) {
      console.error('Publishing error:', error);
      setPublishResults({ success: false, error: (error as Error).message });
      setCurrentScreen('publishing-failed');
    } finally {
      setIsPublishing(false);
    }
  };

  // ==================== SCHEDULING HANDLERS ====================
  const handleSchedulePost = async (platforms: string[], caption: string, scheduledAt: string, imageUrl?: string) => {
    setSelectedPlatforms(platforms);
    setPublishCaption(caption);
    setScheduleTime(scheduledAt);
    if (imageUrl) setPublishImageUrl(imageUrl);
    setIsScheduling(true);
    setCurrentScreen(imageUrl ? 'scheduling-animation-image' : 'schedule-confirmation');

    try {
      const result = await PublishService.schedulePost(
        userId || '',
        platforms,
        caption,
        scheduledAt,
        imageUrl
      );

      if (result.success) {
        setCurrentScreen('schedule-confirmation');
      } else {
        console.error('Scheduling failed:', result.error);
        // Stay on current screen and show error
      }
    } catch (error) {
      console.error('Scheduling error:', error);
    } finally {
      setIsScheduling(false);
    }
  };

  // ==================== LOGOUT HANDLER ====================
  const handleLogout = async () => {
    try {
      await UserService.logout();
      SocialService.disconnectAll();
      setUserId(null);
      setUserProfile(null);
      setCurrentScreen('login-choice');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'login-choice':
        return <LoginSignupChoice onNavigate={setCurrentScreen} />;
      case 'onboarding-1a':
        return <OnboardingStep1A
          onNavigate={setCurrentScreen}
          onDataChange={handleStep1AData}
          initialData={onboardingData}
        />;
      case 'onboarding-1b':
        return <OnboardingStep1B
          onNavigate={setCurrentScreen}
          onDataChange={handleStep1BData}
          initialData={onboardingData}
        />;
      case 'onboarding-2':
        return <OnboardingStep2 onNavigate={setCurrentScreen} onComplete={handleStep2Complete} />;
      case 'onboarding-2b':
        return <OnboardingStep3 onNavigate={setCurrentScreen} onComplete={handleStep3Complete} />;
      case 'dashboard':
        return <Dashboard
          onNavigate={setCurrentScreen}
          userName={userProfile?.fullName}
          companyName={userProfile?.businessName}
          userId={userId}
        />;
      case 'social-post-creation':
        return <SocialPostCreation
          onNavigate={setCurrentScreen}
          onGenerate={handleGenerateCaption}
          userId={userId}
          companyName={userProfile?.businessName}
          companySummary={userProfile?.businessDescription}
        />;
      case 'ai-graphic-creation':
        return <AIGraphicCreation onNavigate={setCurrentScreen} />;
      case 'caption-generating':
        return <CaptionGenerating onNavigate={setCurrentScreen} />;
      case 'generated-caption':
        return <GeneratedCaption
          onNavigate={setCurrentScreen}
          caption={generatedCaption}
          onRegenerate={handleRegenerateCaption}
          onEdit={setGeneratedCaption}
        />;
      case 'select-channels':
        return <SelectChannels
          onNavigate={(screen) => {
            if (screen === 'schedule-picker') {
              setReturnScreen('schedule-preview');
            }
            setCurrentScreen(screen);
          }}
          onConnectOAuth={saveStateAndRedirect}
          caption={generatedCaption}
        />;
      case 'connect-account-modal':
        return (
          <div style={{ position: 'relative', minHeight: '100vh', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ConnectAccountModal
              isOpen={true}
              selectedPlatforms={[{
                id: 'linkedin',
                name: 'LinkedIn',
                color: '#0A66C2',
                bgColor: '#E8F1FF',
                icon: Linkedin
              }]}
              onConnect={() => alert('Connected!')}
              onClose={() => setCurrentScreen('select-channels')}
            />
          </div>
        );
      case 'preview-post':
        return <PreviewPost
          onNavigate={setCurrentScreen}
          backScreen={generatedImages.length > 0 ? 'select-channels-image' : 'select-channels'}
        />;
      case 'publishing-animation':
        return <PublishingAnimation selectedPlatforms={selectedPlatforms} onNavigate={setCurrentScreen} />;
      case 'publishing-success':
        return <PublishingSuccess onNavigate={setCurrentScreen} />;
      case 'publishing-failed':
        return <PublishingFailed onNavigate={setCurrentScreen} />;
      case 'schedule-picker':
        // Determine the correct back screen based on context
        // If editing from edit-scheduled-post or detail-preview, go back to that screen
        // Otherwise, go back to select-channels based on content type
        const schedulePickerBackScreen =
          returnScreen === 'edit-scheduled-post-image' ? 'edit-scheduled-post-image'
            : returnScreen === 'edit-scheduled-post-text' ? 'edit-scheduled-post-text'
              : returnScreen === 'detail-preview-image' ? 'detail-preview-image'
                : returnScreen === 'detail-preview-text' ? 'detail-preview-text'
                  : contentType === 'image' ? 'select-channels-image'
                    : 'select-channels';

        return <SchedulePicker
          onNavigate={setCurrentScreen}
          backScreen={schedulePickerBackScreen}
          onTimeSelect={async (selectedTime) => {
            setScheduleTime(selectedTime);

            // Check if this is editing an existing scheduled post
            if (returnScreen.includes('edit-scheduled-post') || returnScreen.includes('detail-preview')) {
              const editingPostData = localStorage.getItem('editingPost');
              if (editingPostData) {
                try {
                  const post = JSON.parse(editingPostData);
                  // Convert display time to ISO format
                  const isoDate = new Date(selectedTime.replace(' at ', ' ')).toISOString();

                  // Update localStorage with new time (don't save to Firestore yet)
                  const updatedPost = { ...post, scheduledAt: isoDate };
                  localStorage.setItem('editingPost', JSON.stringify(updatedPost));

                  // Navigate back to the edit page (not success screen)
                  setCurrentScreen(returnScreen);
                  return;
                } catch (error) {
                  console.error('Error updating schedule time:', error);
                }
              }
            }
          }}
          returnScreen={returnScreen}
        />;
      case 'schedule-preview':
        return <SchedulePreview
          onNavigate={setCurrentScreen}
          scheduledDate={scheduleTime.split(' at ')[0]}
          scheduledTime={scheduleTime.split(' at ')[1]}
          caption={publishCaption}
          selectedPlatforms={selectedPlatforms}
          imageUrl={publishImageUrl}
          userId={userId}
        />;
      case 'schedule-confirmation':
        return <ScheduleConfirmation onNavigate={setCurrentScreen} />;
      case 'calendar-view':
        return <CalendarView onNavigate={setCurrentScreen} userId={userId} />;
      case 'create-business-poster':
        return <CreateBusinessPoster
          onNavigate={setCurrentScreen}
          onDescriptionChange={setPosterDescription}
          onGenerate={(prompt) => {
            setPosterDescription(prompt);
            setCurrentScreen('ai-graphic-advanced');
          }}
          userId={userId}
          companyName={userProfile?.businessName}
          companySummary={userProfile?.businessDescription}
        />;
      case 'ai-graphic-advanced':
        return <AIGraphicAdvanced
          onNavigate={setCurrentScreen}
          onGenerate={(style, ratio, lighting, color) => {
            // Combine style info into the prompt or style string if needed, or pass separately
            // For now, let's just pass the style + extra info
            const enhancedStyle = `${style}, ${lighting} lighting, ${color} palette`;
            handleGenerateImages(posterDescription, enhancedStyle, ratio);
          }}
        />;
      case 'generating-images':
        return <GeneratingImages onNavigate={setCurrentScreen} />;
      case 'generated-images':
        return <GeneratedImages
          onNavigate={setCurrentScreen}
          posterDescription={posterDescription}
          images={generatedImages}
          prompts={generatedPrompts}
          onSelectImage={handleSelectImage}
          selectedIndex={selectedImageIndex}
          onRegenerate={() => handleGenerateImages(posterDescription, posterStyle, posterRatio)}
        />;
      case 'select-channels-image':
        return <SelectChannelsImage
          onNavigate={(screen) => {
            if (screen === 'schedule-picker') {
              setReturnScreen('schedule-preview');
            }
            setCurrentScreen(screen);
          }}
          onConnectOAuth={saveStateAndRedirect}
          userId={userId}
          imageUrl={generatedImages[selectedImageIndex] || publishImageUrl}
          caption={publishCaption}
          companyName={userProfile?.businessName}
          companySummary={userProfile?.businessDescription}
          posterDescription={posterDescription}
        />;
      case 'preview-post-image':
        return <PreviewPostImage
          onNavigate={setCurrentScreen}
          scheduledTime={scheduleTime}
          imageUrl={generatedImages[selectedImageIndex] || publishImageUrl}
          caption={publishCaption}
          selectedPlatforms={selectedPlatforms}
          onPublish={handlePublish}
          isPublishing={isPublishing}
        />;
      case 'scheduling-animation-image':
        return <SchedulingAnimation selectedPlatforms={selectedPlatforms} onNavigate={setCurrentScreen} scheduledTime={scheduleTime} />;
      case 'publishing-state-image':
        return <PublishingStateImage onNavigate={setCurrentScreen} selectedPlatforms={selectedPlatforms} />;
      case 'publishing-results-image':
        return <PublishingResultsImage onNavigate={setCurrentScreen} />;
      case 'schedule-post-image':
        return <SchedulePostImage onNavigate={setCurrentScreen} onTimeSelect={setScheduleTime} />;
      case 'preview-event-post':
        return <PreviewEventPost onNavigate={setCurrentScreen} />;
      case 'profile-settings':
        return <ProfileSettings
          onNavigate={setCurrentScreen}
          userProfile={userProfile}
          onLogout={handleLogout}
        />;
      case 'edit-scheduled-post-text':
        return <EditScheduledPostText onNavigate={setCurrentScreen} scheduleTime={scheduleTime} userId={userId} onChangeSchedule={() => {
          setReturnScreen('edit-scheduled-post-text');
          setCurrentScreen('schedule-picker');
        }} />;
      case 'detail-preview-text':
        return <DetailPreviewText onNavigate={setCurrentScreen} scheduleTime={scheduleTime} userId={userId} onChangeSchedule={() => {
          setReturnScreen('detail-preview-text');
          setCurrentScreen('schedule-picker');
        }} />;
      case 'edit-scheduled-post-image':
        return <EditScheduledPostImage onNavigate={setCurrentScreen} scheduleTime={scheduleTime} userId={userId} onChangeSchedule={() => {
          setReturnScreen('edit-scheduled-post-image');
          setCurrentScreen('schedule-picker');
        }} />;
      case 'detail-preview-image':
        return <DetailPreviewImage onNavigate={setCurrentScreen} scheduleTime={scheduleTime} userId={userId} onChangeSchedule={() => {
          setReturnScreen('detail-preview-image');
          setCurrentScreen('schedule-picker');
        }} />;
      case 'schedule-update-success':
        return <ScheduleUpdateSuccess onNavigate={setCurrentScreen} />;
      case 'preview-post-now-text':
        return <PreviewPostNowText onNavigate={setCurrentScreen} userId={userId} />;
      case 'preview-post-now-image':
        return <PreviewPostNowImage onNavigate={setCurrentScreen} userId={userId} />;
      case 'post-publish-success':
        // Read from 'publishResults' (array format from Post Now flow)
        const storedResults = localStorage.getItem('publishResults');
        const storedResult = localStorage.getItem('publishResult');
        let publishResultData = null;
        let platformsList: string[] = [];

        if (storedResults) {
          // New array format: [{ platform, success, postUrl }]
          const resultsArray = JSON.parse(storedResults);
          // Convert to results object format
          const resultsObj: Record<string, { status: string; url?: string }> = {};
          platformsList = resultsArray.map((r: any) => {
            resultsObj[r.platform] = { status: r.success ? 'success' : 'error', url: r.postUrl };
            return r.platform;
          });
          publishResultData = { results: resultsObj };
        } else if (storedResult) {
          // Old format
          publishResultData = JSON.parse(storedResult);
          platformsList = publishResultData?.platforms || [];
        }


        return <PostPublishSuccess onNavigate={setCurrentScreen} publishResults={publishResultData} platforms={platformsList} />;
      case 'publishing-success':
        // This is the success page used by Social Posts and Business Poster sections
        return <PublishingSuccess onNavigate={setCurrentScreen} />;
      case 'publishing-animation-text':
        return <PublishingAnimation onNavigate={setCurrentScreen} userId={userId} selectedPlatforms={undefined} />;
      case 'publishing-animation-image':
        return <PublishingAnimation onNavigate={setCurrentScreen} userId={userId} selectedPlatforms={undefined} />;
      case 'welcome-back':
        return <WelcomeBack onNavigate={setCurrentScreen} onLoginSuccess={(id) => setUserId(id)} />;
      case 'ads-campaign-objective':
        return <AdsCampaignObjective onNavigate={setCurrentScreen} />;
      case 'ads-setup-step1':
        return <AdsSetupStep1 onNavigate={setCurrentScreen} />;
      case 'ads-setup-step2':
        return <AdsSetupStep2 onNavigate={setCurrentScreen} />;
      case 'ads-setup-step3':
        return <AdsSetupStep3 onNavigate={setCurrentScreen} />;
      case 'coming-soon-brand-awareness':
        return <ComingSoon onNavigate={setCurrentScreen} title="Brand Awareness" />;
      case 'coming-soon-lead-generation':
        return <ComingSoon onNavigate={setCurrentScreen} title="Lead Generation" />;
      case 'coming-soon-website-traffic':
        return <ComingSoon onNavigate={setCurrentScreen} title="Website Traffic" />;
      case 'execution-setup-info':
        return <ExecutionSetupInfo onNavigate={setCurrentScreen} />;
      case 'execution-setup-actions':
        return <ExecutionSetupActions onNavigate={setCurrentScreen} />;
      case 'campaign-ready':
        return <CampaignReady onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <NotificationsPage onNavigate={setCurrentScreen} userId={userId} />;
      case 'privacy-policy':
        return <PrivacyPolicy onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <LoginSignupChoice onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ maxWidth: '480px', margin: '0 auto', background: '#FFFFFF', position: 'relative' }}>
      <PageTransition triggerKey={currentScreen}>
        {renderScreen()}
      </PageTransition>
    </div>
  );
}