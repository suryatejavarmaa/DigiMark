import { ChevronLeft, Calendar, Clock, Instagram, Facebook, Linkedin, Twitter, Edit2, Trash2 } from 'lucide-react';

interface CalendarDetailProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  post?: {
    title: string;
    caption: string;
    date: string;
    time: string;
    platforms: string[];
    imageUrl?: string;
  };
}

export function CalendarDetail({
  onBack,
  onEdit,
  onDelete,
  post = {
    title: "Holiday Sale Announcement",
    caption: "🎄 Special Holiday Sale! Get 50% off on all products. Limited time offer. Shop now and save big this festive season! #HolidaySale #Shopping #Deals",
    date: "",
    time: "10:00 AM",
    platforms: ["instagram", "facebook", "linkedin", "twitter"],
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80"
  }
}: CalendarDetailProps) {
  const platformIcons = {
    instagram: <Instagram size={18} style={{ color: '#E1306C' }} />,
    facebook: <Facebook size={18} style={{ color: '#1877F2' }} />,
    linkedin: <Linkedin size={18} style={{ color: '#0A66C2' }} />,
    twitter: <Twitter size={18} style={{ color: '#1DA1F2' }} />
  };

  const platformNames = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    twitter: 'X (Twitter)'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8F7FF 0%, #FFF 100%)',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '100px'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#F3F4F6',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E5E7EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
        >
          <ChevronLeft size={24} style={{ color: '#1F2937' }} />
        </button>
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#1F2937',
            fontFamily: 'Outfit, sans-serif',
            flex: 1
          }}
        >
          Scheduled Post
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Post Image */}
        {post.imageUrl && (
          <div
            style={{
              width: '100%',
              height: '240px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}
          >
            <img
              src={post.imageUrl}
              alt="Post preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Post Title */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginBottom: '8px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500
            }}
          >
            POST TITLE
          </p>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1F2937',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {post.title}
          </p>
        </div>

        {/* Schedule Info */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginBottom: '16px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500
            }}
          >
            SCHEDULE
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#F3F0FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Calendar size={20} style={{ color: '#8366FF' }} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    marginBottom: '2px',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Date
                </p>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#1F2937',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  {post.date}
                </p>
              </div>
            </div>

            {/* Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#F3F0FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Clock size={20} style={{ color: '#8366FF' }} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    marginBottom: '2px',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Time
                </p>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#1F2937',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  {post.time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginBottom: '12px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500
            }}
          >
            PUBLISHING TO
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {post.platforms.map((platform) => (
              <div
                key={platform}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}
              >
                {platformIcons[platform as keyof typeof platformIcons]}
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#1F2937',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  {platformNames[platform as keyof typeof platformNames]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginBottom: '12px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500
            }}
          >
            CAPTION
          </p>
          <p
            style={{
              fontSize: '15px',
              color: '#1F2937',
              lineHeight: '1.6',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {post.caption}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Edit Button */}
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8366FF 0%, #7C3AED 100%)',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
            }}
          >
            <Edit2 size={18} />
            Edit Post
          </button>

          {/* Delete Button */}
          <button
            onClick={onDelete}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: '#FEE2E2',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FECACA';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FEE2E2';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Trash2 size={20} style={{ color: '#EF4444' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
