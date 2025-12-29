import { useState, useEffect } from 'react';
import { X, CheckCircle, ExternalLink, Bell, AlertCircle, Clock } from 'lucide-react';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, updateDoc, doc } from 'firebase/firestore';

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
}

interface NotificationDropdownProps {
  onClose: () => void;
  onSeeAll: () => void;
  userId?: string | null;
}

export function NotificationDropdown({ onClose, onSeeAll, userId }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for notifications
  useEffect(() => {
    // If no userId prop, try to get from localStorage
    const effectiveUserId = userId || localStorage.getItem('digimark_user_id');

    if (!effectiveUserId) {
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'users', effectiveUserId, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];

      setNotifications(notifs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    const effectiveUserId = userId || localStorage.getItem('digimark_user_id');
    if (!effectiveUserId) return;

    const db = getFirestore();
    try {
      await updateDoc(doc(db, 'users', effectiveUserId, 'notifications', notificationId), {
        read: true
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'success':
        return { icon: CheckCircle, color: '#8366FF', text: 'Posted' };
      case 'partial':
        return { icon: AlertCircle, color: '#F59E0B', text: 'Partial' };
      case 'failed':
        return { icon: AlertCircle, color: '#EF4444', text: 'Failed' };
      default:
        return { icon: Clock, color: '#3B82F6', text: 'Processing' };
    }
  };

  const formatTime = (timestamp: { seconds: number } | undefined) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          zIndex: 998,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Dropdown Card */}
      <div
        style={{
          position: 'fixed',
          top: '72px',
          right: '16px',
          width: '340px',
          maxHeight: '480px',
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(131, 102, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Outfit, sans-serif',
          animation: 'slideDown 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF'
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              margin: 0
            }}
          >
            Notifications
          </h3>
          <button
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={18} style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Notification List */}
        <div
          className="custom-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 12px 12px',
            minHeight: '200px'
          }}
        >
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
              <Bell style={{ opacity: 0.2, width: '48px', height: '48px', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '14px' }}>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification, index) => {
              const statusInfo = getStatusInfo(notification.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: index < notifications.length - 1 ? '8px' : '0',
                    background: !notification.read ? '#F5F3FF' : '#F9FAFB',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: !notification.read ? '1px solid #E9D5FF' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#EDE9FE';
                    e.currentTarget.style.borderColor = '#E9D5FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = !notification.read ? '#F5F3FF' : '#F9FAFB';
                    e.currentTarget.style.borderColor = !notification.read ? '#E9D5FF' : 'transparent';
                  }}
                >
                  {/* Status & Timestamp */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px'
                    }}
                  >
                    <StatusIcon size={14} style={{ color: statusInfo.color, flexShrink: 0 }} />
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: statusInfo.color,
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    >
                      {statusInfo.text}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#9CA3AF',
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    >
                      {formatTime(notification.createdAt)}
                    </span>
                    {!notification.read && (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8366FF', marginLeft: 'auto' }} />
                    )}
                  </div>

                  {/* Content Area */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    {/* Caption */}
                    <p
                      style={{
                        flex: 1,
                        fontSize: '13px',
                        color: '#374151',
                        fontFamily: 'Outfit, sans-serif',
                        margin: 0,
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {notification.caption}
                    </p>

                    {/* Thumbnail */}
                    {notification.imageUrl && (
                      <img
                        src={notification.imageUrl}
                        alt="Post preview"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          flexShrink: 0,
                          border: '1px solid #E5E7EB'
                        }}
                      />
                    )}
                  </div>

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
                            padding: '4px 8px',
                            background: isFailed ? '#FEF2F2' : (link ? '#8366FF' : '#E5E7EB'),
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: isFailed ? '#EF4444' : (link ? '#FFFFFF' : '#6B7280'),
                            fontFamily: 'Outfit, sans-serif',
                            cursor: link ? 'pointer' : 'default',
                            border: isFailed ? '1px solid #xFECACA' : 'none'
                          }}
                        >
                          <span style={{ textTransform: 'capitalize' }}>{platform}</span>
                          {link && <ExternalLink size={10} style={{ color: '#FFFFFF' }} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #F3F4F6',
            textAlign: 'center',
            background: '#FFFFFF'
          }}
        >
          <button
            onClick={onSeeAll}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EDE9FE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            See All Notifications
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E5E7EB;
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #D1D5DB;
        }
      `}</style>
    </>
  );
}