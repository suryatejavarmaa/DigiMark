import { Bell, House, Megaphone, Calendar, User, Image, Video, Sparkles, TrendingUp, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { NotificationDropdown } from './NotificationDropdown';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  userName?: string;
  companyName?: string;
  userId?: string | null;
}

export function Dashboard({ onNavigate, userName, companyName, userId }: DashboardProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 18) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, []);

  const quickActions = [
    { id: 'social-post', label: 'Social Post', icon: Sparkles, badge: null },
    { id: 'business-poster', label: 'Business Poster', icon: Image, badge: null },
    { id: 'social-reel', label: 'Social Reel', icon: Video, badge: null },
    { id: 'content-remix', label: 'Content Remix', icon: RefreshCw, badge: 'NEW' }
  ];

  // Engagement data for the chart
  const engagementData = [
    { day: 'Mon', value: 420 },
    { day: 'Tue', value: 520 },
    { day: 'Wed', value: 380 },
    { day: 'Thu', value: 620 },
    { day: 'Fri', value: 590 },
    { day: 'Sat', value: 550 },
    { day: 'Sun', value: 680 }
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Good {timeOfDay},
              </span>
            </div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {companyName || userName || 'DigiMark User'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} style={{ color: '#000000' }} />
              {/* Notification Dot */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#8366FF'
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Dropdown Overlay */}
      {showNotifications && (
        <NotificationDropdown
          userId={userId}
          onClose={() => setShowNotifications(false)}
          onSeeAll={() => {
            setShowNotifications(false);
            onNavigate('notifications');
          }}
        />
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2
            className="mb-4"
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Quick Actions
          </h2>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    if (action.id === 'social-post') {
                      onNavigate('social-post-creation');
                    } else if (action.id === 'business-poster') {
                      onNavigate('create-business-poster');
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
                    border: '2px solid #E5E7EB',
                    borderRadius: '16px',
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(131, 102, 255, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    textAlign: 'center',
                    minHeight: '140px',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8366FF';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(131, 102, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(131, 102, 255, 0.15)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.96)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {/* NEW Badge */}
                  {action.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#8366FF',
                        color: '#FFFFFF',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    >
                      {action.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#EDE9FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={24} style={{ color: '#8366FF' }} />
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#000000',
                      fontFamily: 'Outfit, sans-serif',
                      lineHeight: '1.3'
                    }}
                  >
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analytics Section */}
        <div>
          <h2
            className="mb-4"
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Analytics Overview
          </h2>

          {/* Single Analytics Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
              border: '2px solid #E5E7EB',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(131, 102, 255, 0.15)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s',
              transitionDelay: '400ms'
            }}
          >
            {/* Followers and Reach Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Followers */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} style={{ color: '#3B3A47' }} />
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#3B3A47',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    Followers
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    marginBottom: '8px'
                  }}
                >
                  12.4k
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} style={{ color: '#22C55E' }} />
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#22C55E',
                      fontWeight: 600,
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    +12.5%
                  </span>
                </div>
              </div>

              {/* Reach */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} style={{ color: '#3B3A47' }} />
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#3B3A47',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    Reach
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    marginBottom: '8px'
                  }}
                >
                  45.8k
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} style={{ color: '#22C55E' }} />
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#22C55E',
                      fontWeight: 600,
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    +8.2%
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Chart */}
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif',
                  marginBottom: '16px'
                }}
              >
                Engagement (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={engagementData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: 'Outfit, sans-serif',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#000000', fontWeight: 600 }}
                    itemStyle={{ color: '#22C55E' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22C55E"
                    strokeWidth={3}
                    dot={{ fill: '#22C55E', strokeWidth: 2, r: 5, stroke: '#FFFFFF' }}
                    activeDot={{ r: 7, fill: '#22C55E', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
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
        {/* Home - Active */}
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
          <House size={24} style={{ color: '#8366FF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#8366FF',
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

        {/* Calendar */}
        <button
          onClick={() => onNavigate('calendar-view')}
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
          <Calendar size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CA3AF',
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
    </div>
  );
}