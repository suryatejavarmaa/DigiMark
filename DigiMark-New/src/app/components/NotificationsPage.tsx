import { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, ExternalLink, Bell, AlertCircle, Clock } from 'lucide-react';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

interface Notification {
  id: string;
  type: string;
  status: string;
  platforms: string[];
  postLinks: Record<string, string>;
  caption: string;
  imageUrl?: string;
  createdAt: { seconds: number };
  read: boolean;
  error?: string;
  displayType: 'image' | 'text'; // Derived helper
}

interface NotificationsPageProps {
  onNavigate: (screen: string) => void;
  userId?: string | null;
}

export function NotificationsPage({ onNavigate, userId }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener
  useEffect(() => {
    // If no userId prop, try localStorage as fallback
    const effectiveUserId = userId || localStorage.getItem('digimark_user_id');

    if (!effectiveUserId) {
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'users', effectiveUserId, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Infer display type based on presence of imageUrl
          displayType: data.imageUrl ? 'image' : 'text'
        };
      }) as Notification[];

      setNotifications(notifs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications page:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // Group notifications by type (Image vs Text)
  const imageNotifications = notifications.filter(n => n.displayType === 'image');
  const textNotifications = notifications.filter(n => n.displayType === 'text');

  const isEmpty = !loading && notifications.length === 0;

  const formatTime = (timestamp: { seconds: number } | undefined) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp.seconds * 1000);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'success':
        return { icon: CheckCircle, color: '#8366FF', text: 'Published Successfully' };
      case 'partial':
        return { icon: AlertCircle, color: '#F59E0B', text: 'Partially Published' };
      case 'failed':
        return { icon: AlertCircle, color: '#EF4444', text: 'Failed to Publish' };
      default:
        return { icon: Clock, color: '#3B82F6', text: 'Processing' };
    }
  };

  const renderNotification = (notification: Notification) => {
    const statusInfo = getStatusInfo(notification.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div key={notification.id}>
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            gap: '12px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
          }}
        >
          {/* Thumbnail (image type only) */}
          {notification.imageUrl && (
            <img
              src={notification.imageUrl}
              alt="Post preview"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid #E5E7EB'
              }}
            />
          )}

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px'
              }}
            >
              <StatusIcon size={16} style={{ color: statusInfo.color }} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: statusInfo.color,
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {statusInfo.text}
              </span>
            </div>

            {/* Date/Time */}
            <p
              style={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontFamily: 'Outfit, sans-serif',
                margin: '0 0 8px 0'
              }}
            >
              {formatTime(notification.createdAt)}
            </p>

            {/* Caption */}
            <p
              style={{
                fontSize: '14px',
                color: '#374151',
                fontFamily: 'Outfit, sans-serif',
                margin: '0 0 12px 0',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {notification.caption}
            </p>

            {/* Platform Badges */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(notification.platforms || []).map((platform, idx) => {
                const link = notification.postLinks?.[platform];
                const isFailed = !link && notification.status !== 'success' && notification.status !== 'processing';

                return (
                  <div
                    key={idx}
                    onClick={(e) => {
                      if (link) {
                        e.stopPropagation();
                        window.open(link, '_blank');
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      background: isFailed ? '#FEF2F2' : (link ? '#8366FF' : '#E5E7EB'),
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isFailed ? '#EF4444' : (link ? '#FFFFFF' : '#6B7280'),
                      fontFamily: 'Outfit, sans-serif',
                      cursor: link ? 'pointer' : 'default',
                      border: isFailed ? '1px solid #xFECACA' : 'none'
                    }}
                  >
                    <span style={{ textTransform: 'capitalize' }}>{platform}</span>
                    {link && <ExternalLink size={12} style={{ color: '#FFFFFF' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '80px',
        animation: 'slideUpFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #F3F4F6',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <button
          onClick={() => onNavigate('dashboard')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={24} style={{ color: '#000000' }} />
        </button>
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif',
            margin: 0
          }}
        >
          Notifications
        </h1>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ padding: '20px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                marginBottom: '16px',
                padding: '16px',
                borderRadius: '12px',
                background: '#F9FAFB',
                animation: 'shimmer 1.5s infinite'
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '16px',
                  background: '#E5E7EB',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  background: '#E5E7EB',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}
              />
              <div
                style={{
                  width: '80px',
                  height: '24px',
                  background: '#E5E7EB',
                  borderRadius: '8px'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {isEmpty && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '40px 20px'
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: '#EDE9FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}
          >
            <Bell size={56} style={{ color: '#8366FF' }} />
          </div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '8px'
            }}
          >
            No notifications yet
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center',
              maxWidth: '280px'
            }}
          >
            When you schedule or publish posts, you'll see updates here
          </p>
        </div>
      )}

      {/* Notification List - Grouped by Type */}
      {!isEmpty && !loading && (
        <div style={{ padding: '0' }}>
          {/* Business Posters & Graphics Section (Images) */}
          {imageNotifications.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              {/* Section Header */}
              <div
                style={{
                  padding: '16px 20px 12px',
                  background: '#F9FAFB',
                  borderBottom: '1px solid #F3F4F6'
                }}
              >
                <h2
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    margin: 0
                  }}
                >
                  Business Posters & Graphics
                </h2>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    fontFamily: 'Outfit, sans-serif',
                    margin: '4px 0 0 0'
                  }}
                >
                  {imageNotifications.length} {imageNotifications.length === 1 ? 'post' : 'posts'}
                </p>
              </div>

              {/* Notifications */}
              {imageNotifications.map((notification, index) => (
                <div key={notification.id}>
                  {renderNotification(notification)}
                  {/* Divider */}
                  {index < imageNotifications.length - 1 && (
                    <div
                      style={{
                        height: '1px',
                        background: '#F3F4F6',
                        margin: '0 20px'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Text Posts & Captions Section */}
          {textNotifications.length > 0 && (
            <div>
              {/* Section Header */}
              <div
                style={{
                  padding: '16px 20px 12px',
                  background: '#F9FAFB',
                  borderBottom: '1px solid #F3F4F6'
                }}
              >
                <h2
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    margin: 0
                  }}
                >
                  Text Posts & Captions
                </h2>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    fontFamily: 'Outfit, sans-serif',
                    margin: '4px 0 0 0'
                  }}
                >
                  {textNotifications.length} {textNotifications.length === 1 ? 'post' : 'posts'}
                </p>
              </div>

              {/* Notifications */}
              {textNotifications.map((notification, index) => (
                <div key={notification.id}>
                  {renderNotification(notification)}
                  {/* Divider */}
                  {index < textNotifications.length - 1 && (
                    <div
                      style={{
                        height: '1px',
                        background: '#F3F4F6',
                        margin: '0 20px'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
