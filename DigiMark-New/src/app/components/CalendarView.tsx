import { ChevronLeft, ChevronRight, Linkedin, Facebook, Instagram, Twitter, Clock, Pencil, Send, Trash2, ExternalLink, Loader2, RefreshCw, House, Megaphone, Calendar as CalendarIcon, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { DeleteSuccessModal } from './DeleteSuccessModal';

// API Base URL - uses environment variable in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface CalendarViewProps {
  onNavigate: (screen: string) => void;
  userId?: string | null;
}

interface ScheduledPost {
  id: string;
  content?: string;
  platforms: string[];
  scheduledAt: string;
  status: string;
  mediaUrl?: string;
  createdAt: string;
  publishResult?: {
    results?: Record<string, { url?: string; status?: string; error?: string }>;
    url?: string;
  };
}

export function CalendarView({ onNavigate, userId }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{ type: 'live' | 'upcoming', id: string, title: string } | null>(null);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [livePosts, setLivePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishingPostId, setPublishingPostId] = useState<string | null>(null);
  // State for retry functionality
  const [retryingPlatform, setRetryingPlatform] = useState<string | null>(null); // "postId_platform"
  const [retrySuccessUrls, setRetrySuccessUrls] = useState<Record<string, string>>({}); // "postId_platform" -> url

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Fetch scheduled posts from Firebase
  const fetchScheduledPosts = async () => {
    const effectiveUserId = userId || localStorage.getItem('digimark_user_id');
    if (!effectiveUserId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const db = getFirestore();
      const postsRef = collection(db, 'scheduledPosts');
      const q = query(postsRef, where('userId', '==', effectiveUserId));
      const snapshot = await getDocs(q);

      const posts: ScheduledPost[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ScheduledPost));

      console.log('[CalendarView] Fetched scheduled posts:', posts);
      setScheduledPosts(posts);
    } catch (error) {
      console.error('[CalendarView] Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch live posts from Firebase
  const fetchLivePosts = async () => {
    const effectiveUserId = userId || localStorage.getItem('digimark_user_id');
    if (!effectiveUserId) return;

    try {
      const db = getFirestore();
      const postsRef = collection(db, 'livePosts');
      const q = query(postsRef, where('userId', '==', effectiveUserId));
      const snapshot = await getDocs(q);

      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('[CalendarView] Fetched live posts:', posts);
      setLivePosts(posts);
    } catch (error) {
      console.error('[CalendarView] Error fetching live posts:', error);
    }
  };

  useEffect(() => {
    fetchScheduledPosts();
    fetchLivePosts();
  }, [userId]);

  // Helper to get posts for a specific date
  const getPostsForDate = (day: number) => {
    const live: any[] = [];
    const upcoming: any[] = [];

    scheduledPosts.forEach(post => {
      const postDate = new Date(post.scheduledAt);
      if (
        postDate.getDate() === day &&
        postDate.getMonth() === currentMonth &&
        postDate.getFullYear() === currentYear
      ) {
        const platform = post.platforms[0] || 'linkedin';
        const platformColors: Record<string, { color: string; bg: string }> = {
          linkedin: { color: '#0A66C2', bg: '#EDF3F8' },
          facebook: { color: '#1877F2', bg: '#EBF3FF' },
          instagram: { color: '#E4405F', bg: '#FDEEF2' },
          x: { color: '#000000', bg: '#F3F4F6' },
          twitter: { color: '#000000', bg: '#F3F4F6' },
        };

        const postForDisplay = {
          id: post.id,
          title: (post.content || 'Scheduled Post').substring(0, 30) + (post.content && post.content.length > 30 ? '...' : ''),
          content: post.content || '',
          time: postDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          scheduledAt: post.scheduledAt,
          platform,
          platforms: post.platforms,
          platformColor: platformColors[platform]?.color || '#6B7280',
          platformBg: platformColors[platform]?.bg || '#F3F4F6',
          status: post.status === 'pending' ? 'Scheduled' : post.status,
          statusColor: post.status === 'pending' ? '#8366FF' : '#10B981',
          statusBg: post.status === 'pending' ? '#EDE9FE' : '#D1FAE5',
          type: post.mediaUrl ? 'image' : 'text',
          hasImage: !!post.mediaUrl,
          mediaUrl: post.mediaUrl || null,
          postUrl: post.publishResult?.results?.[platform]?.url || post.publishResult?.url || null
        };

        if (post.status === 'published') {
          live.push(postForDisplay);
        } else {
          upcoming.push(postForDisplay);
        }
      }
    });

    return { live, upcoming };
  };

  // Get days that have scheduled posts
  const getDaysWithPosts = () => {
    const days = new Set<number>();
    scheduledPosts.forEach(post => {
      const postDate = new Date(post.scheduledAt);
      if (postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear) {
        days.add(postDate.getDate());
      }
    });
    return Array.from(days);
  };

  const scheduledDays = getDaysWithPosts();
  const selectedDatePosts = getPostsForDate(selectedDate);
  const postedItems = selectedDatePosts.live;
  const upcomingPosts = selectedDatePosts.upcoming;

  // Filter live posts for selected date - combines both sources:
  // 1. Posts from livePosts collection (immediate "Post Now" posts)
  // 2. Published posts from scheduledPosts collection (scheduler-published posts)
  const getLivePostsForDate = (day: number) => {
    // Get posts from livePosts collection
    const fromLivePostsCollection = livePosts
      .filter(post => {
        const postDate = new Date(post.publishedAt);
        return (
          postDate.getDate() === day &&
          postDate.getMonth() === currentMonth &&
          postDate.getFullYear() === currentYear
        );
      })
      .map(post => {
        // Calculate failed platforms for livePosts too
        const failedPlatforms: string[] = [];
        if (post.platforms?.includes('linkedin') && !post.linkedInUrl) {
          failedPlatforms.push('linkedin');
        }
        if ((post.platforms?.includes('twitter') || post.platforms?.includes('x')) && !post.twitterUrl) {
          failedPlatforms.push('x');
        }
        if (post.platforms?.includes('facebook') && !post.facebookUrl) {
          failedPlatforms.push('facebook');
        }

        return {
          ...post,
          failedPlatforms,
          source: 'livePosts' // Track source for debugging
        };
      });

    // Get published posts from scheduledPosts (already filtered by date in postedItems)
    // Transform them to match the expected format for live posts display
    const fromScheduledPosts = postedItems.map((post: any) => {
      // Find the original scheduled post to access publishResult
      const originalPost = scheduledPosts.find(sp => sp.id === post.id);
      const publishResult = originalPost?.publishResult?.results || {};

      // Determine which platforms succeeded and which failed
      const linkedInResult = publishResult?.linkedin;
      const twitterResult = publishResult?.twitter || publishResult?.x;
      const facebookResult = publishResult?.facebook;

      // Build failed platforms list
      const failedPlatforms: string[] = [];
      if (post.platforms?.includes('linkedin') && linkedInResult?.status !== 'success') {
        failedPlatforms.push('linkedin');
      }
      if ((post.platforms?.includes('twitter') || post.platforms?.includes('x')) && twitterResult?.status !== 'success') {
        failedPlatforms.push('x');
      }
      if (post.platforms?.includes('facebook') && facebookResult?.status !== 'success') {
        failedPlatforms.push('facebook');
      }

      // Debug logging
      console.log('[Live Posts] Processing scheduled post:', post.id);
      console.log('[Live Posts] Publish results by platform:', { linkedin: linkedInResult, twitter: twitterResult });
      console.log('[Live Posts] Failed platforms:', failedPlatforms);

      return {
        id: post.id,
        caption: post.content || post.title || '',
        title: post.title,
        content: originalPost?.content || post.content || '',
        platforms: post.platforms,
        publishedAt: post.scheduledAt, // Use scheduledAt as publishedAt
        linkedInUrl: linkedInResult?.url || null,
        twitterUrl: twitterResult?.url || null,
        facebookUrl: facebookResult?.url || null,
        imageUrl: post.mediaUrl || originalPost?.mediaUrl,
        failedPlatforms: failedPlatforms, // Track which platforms failed
        source: 'scheduledPosts'
      };
    });

    // Combine both sources and remove duplicates by id
    const combined = [...fromLivePostsCollection, ...fromScheduledPosts];
    const uniquePosts = combined.filter((post, index, self) =>
      index === self.findIndex(p => p.id === post.id)
    );

    // Sort by publishedAt descending (newest first)
    return uniquePosts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  };

  const livePostsForSelectedDate = getLivePostsForDate(selectedDate);

  const generateCalendarDays = () => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDeletePost = async (type: 'live' | 'upcoming', id: string, title: string) => {
    setPostToDelete({ type, id, title });
    setShowDeleteConfirm(true);
  };

  const confirmDeletePost = async () => {
    if (postToDelete) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, 'scheduledPosts', postToDelete.id));
        setScheduledPosts(prev => prev.filter(p => p.id !== postToDelete.id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
      setPostToDelete(null);
    }
  };

  const cancelDeletePost = () => {
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const closeDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: '#8366FF' }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '80px'
      }}
    >
      {/* Add spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      {/* Header */}
      <div
        className="px-6 py-6"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '4px'
              }}
            >
              Marketing Calendar
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: '#6B7280',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Manage your scheduled posts
            </p>
          </div>
          <button
            onClick={fetchScheduledPosts}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#F9FAFB',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={18} style={{ color: '#8366FF' }} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Calendar Section */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Month Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#F9FAFB',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={20} style={{ color: '#000000' }} />
            </button>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {monthNames[currentMonth]} {currentYear}
            </h2>

            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#F9FAFB',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={20} style={{ color: '#000000' }} />
            </button>
          </div>

          {/* Weekday Headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}
          >
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div
                key={day}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#9CA3AF',
                  textAlign: 'center',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px'
            }}
          >
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />;
              }

              const hasScheduledPost = scheduledDays.includes(day);
              const isTodayDate = isToday(day);
              const isSelected = day === selectedDate;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '8px',
                    background: isSelected ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)' : isTodayDate ? '#F8F6FF' : 'transparent',
                    border: isTodayDate && !isSelected ? '2px solid #8366FF' : 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isSelected ? '#FFFFFF' : '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ lineHeight: '1' }}>{day}</span>

                  {/* Dot Indicator */}
                  {hasScheduledPost && (
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: isSelected ? '#FFFFFF' : '#8366FF',
                        marginTop: '2px',
                        boxShadow: isSelected ? '0 0 4px rgba(255, 255, 255, 0.5)' : '0 0 4px rgba(131, 102, 255, 0.5)'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Posts */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '16px'
            }}
          >
            Live Posts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {livePostsForSelectedDate.length === 0 ? (
              <div
                style={{
                  background: '#F9FAFB',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  border: '1px dashed #D1D5DB'
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    color: '#9CA3AF',
                    fontFamily: 'Outfit, sans-serif',
                    margin: 0
                  }}
                >
                  No live posts for this day
                </p>
              </div>
            ) : (
              livePostsForSelectedDate.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {(() => {
                    // Format time
                    const publishedDate = new Date(item.publishedAt);
                    const timeStr = publishedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                    return (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                        {/* Show all platform icons */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {(item.platforms || ['linkedin']).map((platformId: string, idx: number) => {
                            const platformInfo = {
                              linkedin: { icon: Linkedin, color: '#0A66C2', bg: '#EDF3F8' },
                              twitter: { icon: Twitter, color: '#000000', bg: '#F3F4F6' },
                              x: { icon: Twitter, color: '#000000', bg: '#F3F4F6' },
                              facebook: { icon: Facebook, color: '#1877F2', bg: '#EBF3FF' },
                              instagram: { icon: Instagram, color: '#E4405F', bg: '#FDEEF2' }
                            }[platformId?.toLowerCase()] || { icon: Linkedin, color: '#6B7280', bg: '#F3F4F6' };

                            const PlatformIcon = platformInfo.icon;

                            return (
                              <div
                                key={idx}
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '12px',
                                  background: platformInfo.bg,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                <PlatformIcon size={24} style={{ color: platformInfo.color }} />
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#000000', marginBottom: '4px' }}>
                            {item.title}
                          </h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} style={{ color: '#6B7280' }} />
                            <span style={{ fontSize: '13px', color: '#6B7280' }}>{timeStr}</span>
                          </div>
                        </div>
                        <div
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: '#D1FAE5',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#10B981'
                          }}
                        >
                          Live
                        </div>
                      </div>
                    );
                  })()}
                  {/* View Live Post Buttons - One for each platform */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.linkedInUrl && (
                      <button
                        onClick={() => window.open(item.linkedInUrl, '_blank')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '10px',
                          background: '#FFFFFF',
                          border: '1px solid #0A66C2',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#0A66C2',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <ExternalLink size={14} />
                        View on LinkedIn
                      </button>
                    )}
                    {item.twitterUrl && (
                      <button
                        onClick={() => window.open(item.twitterUrl, '_blank')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '10px',
                          background: '#FFFFFF',
                          border: '1px solid #000000',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#000000',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <ExternalLink size={14} />
                        View on X (Twitter)
                      </button>
                    )}

                    {/* Failed Platforms Section - Show retry or view based on state */}
                    {item.failedPlatforms && item.failedPlatforms.length > 0 && (
                      <>
                        {/* LinkedIn Failed/Retry */}
                        {item.failedPlatforms.includes('linkedin') && !item.linkedInUrl && (
                          retrySuccessUrls[`${item.id}_linkedin`] ? (
                            // Show View button after successful retry
                            <button
                              onClick={() => window.open(retrySuccessUrls[`${item.id}_linkedin`], '_blank')}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                background: '#FFFFFF',
                                border: '1px solid #0A66C2',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#0A66C2',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                              }}
                            >
                              <ExternalLink size={14} />
                              View on LinkedIn
                            </button>
                          ) : (
                            // Show Failed + Retry button
                            <button
                              onClick={async () => {
                                const retryKey = `${item.id}_linkedin`;
                                setRetryingPlatform(retryKey);
                                try {
                                  const response = await fetch(`${API_BASE_URL}/publish`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      userId: userId || localStorage.getItem('digimark_user_id'),
                                      platforms: ['linkedin'],
                                      content: item.caption || item.content,
                                      mediaUrl: item.imageUrl
                                    })
                                  });
                                  const result = await response.json();
                                  if (result.results?.linkedin?.status === 'success' && result.results?.linkedin?.url) {
                                    const linkedInUrl = result.results.linkedin.url;

                                    // Persist to Firestore so it survives navigation
                                    if (item.source === 'scheduledPosts') {
                                      try {
                                        const db = getFirestore();
                                        const postRef = doc(db, 'scheduledPosts', item.id);
                                        // Get existing publishResult and merge with new linkedin result
                                        const originalPost = scheduledPosts.find(sp => sp.id === item.id);
                                        const existingResults = originalPost?.publishResult?.results || {};
                                        await updateDoc(postRef, {
                                          'publishResult.results.linkedin': {
                                            status: 'success',
                                            url: linkedInUrl
                                          }
                                        });
                                      } catch (updateError) {
                                        console.error('[Retry] Failed to update Firestore:', updateError);
                                      }
                                    } else if (item.source === 'livePosts') {
                                      try {
                                        const db = getFirestore();
                                        const postRef = doc(db, 'livePosts', item.id);
                                        await updateDoc(postRef, {
                                          linkedInUrl: linkedInUrl
                                        });
                                      } catch (updateError) {
                                        console.error('[Retry] Failed to update livePosts:', updateError);
                                      }
                                    }

                                    // Update local state for immediate UI update
                                    setRetrySuccessUrls(prev => ({
                                      ...prev,
                                      [retryKey]: linkedInUrl
                                    }));

                                    // Also refresh data to ensure consistency
                                    fetchScheduledPosts();
                                    fetchLivePosts();
                                  } else {
                                    alert('Retry failed. Please try again.');
                                  }
                                } catch (error) {
                                  alert('Retry failed. Please check your connection.');
                                } finally {
                                  setRetryingPlatform(null);
                                }
                              }}
                              disabled={retryingPlatform === `${item.id}_linkedin`}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                background: retryingPlatform === `${item.id}_linkedin` ? '#E5E7EB' : '#FEF2F2',
                                border: '1px solid #FECACA',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#DC2626',
                                cursor: retryingPlatform === `${item.id}_linkedin` ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Linkedin size={16} style={{ color: '#0A66C2' }} />
                                <span>LinkedIn Failed</span>
                              </div>
                              <span style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: '#0A66C2',
                                color: '#FFFFFF',
                                fontSize: '12px'
                              }}>
                                {retryingPlatform === `${item.id}_linkedin` ? 'Retrying...' : 'Retry'}
                              </span>
                            </button>
                          )
                        )}

                        {/* Twitter/X Failed/Retry */}
                        {item.failedPlatforms.includes('x') && !item.twitterUrl && (
                          retrySuccessUrls[`${item.id}_twitter`] ? (
                            // Show View button after successful retry
                            <button
                              onClick={() => window.open(retrySuccessUrls[`${item.id}_twitter`], '_blank')}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                background: '#FFFFFF',
                                border: '1px solid #000000',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#000000',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                              }}
                            >
                              <ExternalLink size={14} />
                              View on X (Twitter)
                            </button>
                          ) : (
                            // Show Failed + Retry button
                            <button
                              onClick={async () => {
                                const retryKey = `${item.id}_twitter`;
                                setRetryingPlatform(retryKey);
                                try {
                                  const response = await fetch(`${API_BASE_URL}/publish`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      userId: userId || localStorage.getItem('digimark_user_id'),
                                      platforms: ['twitter'],
                                      content: item.caption || item.content,
                                      mediaUrl: item.imageUrl
                                    })
                                  });
                                  const result = await response.json();
                                  const twitterResult = result.results?.twitter || result.results?.x;
                                  if (twitterResult?.status === 'success' && twitterResult?.url) {
                                    const twitterUrl = twitterResult.url;

                                    // Persist to Firestore so it survives navigation
                                    if (item.source === 'scheduledPosts') {
                                      try {
                                        const db = getFirestore();
                                        const postRef = doc(db, 'scheduledPosts', item.id);
                                        await updateDoc(postRef, {
                                          'publishResult.results.twitter': {
                                            status: 'success',
                                            url: twitterUrl
                                          }
                                        });
                                      } catch (updateError) {
                                        console.error('[Retry] Failed to update Firestore:', updateError);
                                      }
                                    } else if (item.source === 'livePosts') {
                                      try {
                                        const db = getFirestore();
                                        const postRef = doc(db, 'livePosts', item.id);
                                        await updateDoc(postRef, {
                                          twitterUrl: twitterUrl
                                        });
                                      } catch (updateError) {
                                        console.error('[Retry] Failed to update livePosts:', updateError);
                                      }
                                    }

                                    // Update local state for immediate UI update
                                    setRetrySuccessUrls(prev => ({
                                      ...prev,
                                      [retryKey]: twitterUrl
                                    }));

                                    // Also refresh data to ensure consistency
                                    fetchScheduledPosts();
                                    fetchLivePosts();
                                  } else {
                                    alert('Retry failed. Please try again.');
                                  }
                                } catch (error) {
                                  alert('Retry failed. Please check your connection.');
                                } finally {
                                  setRetryingPlatform(null);
                                }
                              }}
                              disabled={retryingPlatform === `${item.id}_twitter`}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                background: retryingPlatform === `${item.id}_twitter` ? '#E5E7EB' : '#FEF2F2',
                                border: '1px solid #FECACA',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#DC2626',
                                cursor: retryingPlatform === `${item.id}_twitter` ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Twitter size={16} style={{ color: '#000000' }} />
                                <span>X (Twitter) Failed</span>
                              </div>
                              <span style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: '#000000',
                                color: '#FFFFFF',
                                fontSize: '12px'
                              }}>
                                {retryingPlatform === `${item.id}_twitter` ? 'Retrying...' : 'Retry'}
                              </span>
                            </button>
                          )
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Posts */}
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '16px'
            }}
          >
            Upcoming Posts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingPosts.length === 0 ? (
              <div
                style={{
                  background: '#F9FAFB',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  border: '1px dashed #D1D5DB'
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    color: '#9CA3AF',
                    fontFamily: 'Outfit, sans-serif',
                    margin: 0
                  }}
                >
                  No upcoming posts for this day
                </p>
              </div>
            ) : (
              upcomingPosts.map((post: any) => (
                <div
                  key={post.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    {/* Show all platform icons */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {(() => {
                        console.log('[Upcoming Post] Platforms for post:', post.id, post.platforms);
                        return post.platforms?.map((platformId: string, idx: number) => {
                          const platformInfo = {
                            linkedin: { icon: Linkedin, color: '#0A66C2', bg: '#EDF3F8' },
                            twitter: { icon: Twitter, color: '#000000', bg: '#F3F4F6' },
                            x: { icon: Twitter, color: '#000000', bg: '#F3F4F6' },
                            facebook: { icon: Facebook, color: '#1877F2', bg: '#EBF3FF' },
                            instagram: { icon: Instagram, color: '#E4405F', bg: '#FDEEF2' }
                          }[platformId?.toLowerCase()] || { icon: Linkedin, color: '#6B7280', bg: '#F3F4F6' };

                          const PlatformIcon = platformInfo.icon;

                          return (
                            <div
                              key={idx}
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: platformInfo.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              <PlatformIcon size={24} style={{ color: platformInfo.color }} />
                            </div>
                          );
                        });
                      })()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#000000', marginBottom: '4px' }}>
                        {post.title}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} style={{ color: '#6B7280' }} />
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>{post.time}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: post.statusBg,
                        fontSize: '12px',
                        fontWeight: 600,
                        color: post.statusColor
                      }}
                    >
                      {post.status}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        // Store post data for editing
                        localStorage.setItem('editingPost', JSON.stringify(post));
                        // Navigate based on whether post has an image
                        onNavigate(post.hasImage ? 'edit-scheduled-post-image' : 'edit-scheduled-post-text');
                      }}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#6B7280',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    {/* Post Now Button */}
                    <button
                      onClick={async () => {
                        try {
                          setPublishingPostId(post.id); // Set loading state

                          const content = post.content || '';
                          const mediaUrl = post.mediaUrl || null;

                          console.log('[Post Now] Found post:', post);
                          console.log('[Post Now] Sending data:', {
                            userId,
                            platforms: post.platforms,
                            content,
                            mediaUrl,
                            postType: post.type
                          });

                          const response = await fetch(`${API_BASE_URL}/publish`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              userId: userId,
                              platforms: post.platforms,
                              content: content,
                              mediaUrl: mediaUrl,
                              postType: post.type || 'imageGen'
                            })
                          });

                          const result = await response.json();
                          console.log('[Post Now] Response:', result);
                          console.log('[Post Now] Full results object:', JSON.stringify(result.results, null, 2));

                          if (response.ok && result.success) {
                            // Get published URLs (check both 'x' and 'twitter' for Twitter/X posts)
                            const linkedInUrl = result.results?.linkedin?.url;
                            const twitterUrl = result.results?.x?.url || result.results?.twitter?.url;

                            console.log('[Post Now] LinkedIn result:', result.results?.linkedin);
                            console.log('[Post Now] X/Twitter result:', result.results?.x || result.results?.twitter);
                            console.log('[Post Now] Extracted URLs:', { linkedInUrl, twitterUrl });

                            // Save to livePosts collection
                            const db = getFirestore();
                            await addDoc(collection(db, 'livePosts'), {
                              userId: userId,
                              title: post.title || content.substring(0, 50) + '...',
                              content: content,
                              mediaUrl: mediaUrl,
                              platforms: post.platforms,
                              publishedAt: new Date().toISOString(),
                              linkedInUrl: linkedInUrl || null,
                              twitterUrl: twitterUrl || null,
                              type: post.type || 'text'
                            });

                            // Delete from scheduled posts
                            await deleteDoc(doc(db, 'scheduledPosts', post.id));

                            // Refresh both lists
                            fetchScheduledPosts();
                            fetchLivePosts();
                          } else {
                            throw new Error(result.error || 'Failed to post');
                          }
                        } catch (error: any) {
                          console.error('[Post Now] Error:', error);
                          // Don't show alert, just log error
                        } finally {
                          setPublishingPostId(null); // Clear loading state
                        }
                      }}
                      disabled={publishingPostId === post.id}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: publishingPostId === post.id
                          ? 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)'
                          : 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        cursor: publishingPostId === post.id ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)',
                        opacity: publishingPostId === post.id ? 0.8 : 1
                      }}
                    >
                      {publishingPostId === post.id ? (
                        <>
                          <Loader2 size={14} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Post Now
                        </>
                      )}
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeletePost('upcoming', post.id, post.title)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: '#FEE2E2',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Trash2 size={16} style={{ color: '#EF4444' }} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid #F3F4F6',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {/* Home */}
        <button
          onClick={() => onNavigate('dashboard')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px'
          }}
        >
          <House size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Home
          </span>
        </button>

        {/* ADs */}
        <button
          onClick={() => onNavigate('ads-campaign-objective')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px'
          }}
        >
          <Megaphone size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            ADs
          </span>
        </button>

        {/* Calendar - Active */}
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '8px 16px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#8366FF'
            }}
          />
          <CalendarIcon size={24} style={{ color: '#8366FF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Calendar
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('profile-settings')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px'
          }}
        >
          <User size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Profile
          </span>
        </button>
      </div>


      {/* Modals */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm && postToDelete !== null}
        title={postToDelete?.title || ''}
        onConfirm={confirmDeletePost}
        onCancel={cancelDeletePost}
      />
      <DeleteSuccessModal isOpen={showDeleteSuccess} onClose={closeDeleteSuccess} />
    </div>
  );
}