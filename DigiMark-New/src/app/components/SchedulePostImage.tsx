import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

interface SchedulePostImageProps {
  onNavigate: (screen: string) => void;
  onTimeSelect?: (time: string) => void;
}

export function SchedulePostImage({ onNavigate, onTimeSelect }: SchedulePostImageProps) {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<number | null>(now.getDate());
  const [selectedHour, setSelectedHour] = useState(now.getHours() + 1); // Default to next hour
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const generateCalendarDays = () => {
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleConfirm = () => {
    if (selectedDate) {
      // Format date: "Dec 20, 2024"
      const formattedDate = `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`;

      // Format time: "2:30 PM"
      const hour12 = selectedHour % 12 || 12;
      const ampm = selectedHour >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hour12}:${selectedMinute.toString().padStart(2, '0')} ${ampm}`;

      // Combined format: "Dec 20, 2024 at 2:30 PM"
      const fullDateTime = `${formattedDate} at ${formattedTime}`;

      // Store the scheduled time in localStorage for backwards compatibility
      localStorage.setItem('scheduledTime', fullDateTime);
      // Set action to schedule so preview page knows to show only schedule button
      localStorage.setItem('imagePostAction', 'schedule');

      // Call the time select callback if provided
      if (onTimeSelect) {
        onTimeSelect(fullDateTime);
      }

      onNavigate('preview-post-image');
    }
  };

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
        className="px-6 py-6"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('select-channels-image')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#F9FAFB',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} style={{ color: '#000000' }} />
          </button>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Schedule Post
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
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
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div
                key={day}
                style={{
                  fontSize: '12px',
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
              gap: '8px'
            }}
          >
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />;
              }

              const isSelected = day === selectedDate;
              const today = new Date();
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '10px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                      : isToday
                        ? '#F8F6FF'
                        : 'transparent',
                    border: isToday && !isSelected ? '2px solid #8366FF' : 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isSelected ? '#FFFFFF' : '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected ? '0 4px 12px rgba(131, 102, 255, 0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#F8F6FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = isToday ? '#F8F6FF' : 'transparent';
                    }
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Picker Section */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <CalendarIcon size={20} style={{ color: '#8366FF' }} />
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#000000',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Select Time
            </h3>
          </div>

          {/* Time Wheels */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            {/* Hour Picker */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <button
                onClick={() => setSelectedHour((selectedHour + 1) % 24)}
                style={{
                  width: '100%',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight
                  size={20}
                  style={{ color: '#8366FF', transform: 'rotate(-90deg)' }}
                />
              </button>

              <input
                type="text"
                inputMode="numeric"
                value={selectedHour.toString().padStart(2, '0')}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value === '') {
                    setSelectedHour(0);
                  } else {
                    const hour = Math.min(23, Math.max(0, parseInt(value, 10)));
                    setSelectedHour(hour);
                  }
                }}
                onFocus={(e) => e.target.select()}
                maxLength={2}
                style={{
                  width: '64px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
                  border: '2px solid #8366FF',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#8366FF',
                  fontFamily: 'Outfit, sans-serif',
                  boxShadow: '0 4px 12px rgba(131, 102, 255, 0.2)',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />

              <button
                onClick={() => setSelectedHour((selectedHour - 1 + 24) % 24)}
                style={{
                  width: '100%',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight
                  size={20}
                  style={{ color: '#8366FF', transform: 'rotate(90deg)' }}
                />
              </button>
            </div>

            {/* Separator */}
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#8366FF',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '32px'
              }}
            >
              :
            </span>

            {/* Minute Picker */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <button
                onClick={() => setSelectedMinute((selectedMinute + 1) % 60)}
                style={{
                  width: '100%',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight
                  size={20}
                  style={{ color: '#8366FF', transform: 'rotate(-90deg)' }}
                />
              </button>

              <input
                type="text"
                inputMode="numeric"
                value={selectedMinute.toString().padStart(2, '0')}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value === '') {
                    setSelectedMinute(0);
                  } else {
                    const minute = Math.min(59, Math.max(0, parseInt(value, 10)));
                    setSelectedMinute(minute);
                  }
                }}
                onFocus={(e) => e.target.select()}
                maxLength={2}
                style={{
                  width: '64px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
                  border: '2px solid #8366FF',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#8366FF',
                  fontFamily: 'Outfit, sans-serif',
                  boxShadow: '0 4px 12px rgba(131, 102, 255, 0.2)',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />

              <button
                onClick={() => setSelectedMinute((selectedMinute - 1 + 60) % 60)}
                style={{
                  width: '100%',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight
                  size={20}
                  style={{ color: '#8366FF', transform: 'rotate(90deg)' }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
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
          padding: '20px 24px'
        }}
      >
        <button
          onClick={handleConfirm}
          disabled={!selectedDate}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: selectedDate
              ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
              : '#E5E7EB',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: selectedDate ? 'pointer' : 'not-allowed',
            boxShadow: selectedDate ? '0 8px 24px rgba(131, 102, 255, 0.4)' : 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (selectedDate) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedDate) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
            }
          }}
        >
          Confirm Schedule
        </button>
      </div>
    </div>
  );
}