import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const { src, alt, style, className, ...rest } = props

  // Loading shimmer animation
  const shimmerStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
    borderRadius: '12px',
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      {/* Loading shimmer overlay */}
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={shimmerStyle}
        >
          {/* Spinner */}
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e0e0e0',
              borderTop: '4px solid #7c3aed',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          {/* Generating text */}
          <p style={{
            marginTop: '12px',
            color: '#7c3aed',
            fontWeight: 600,
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Generating image...
          </p>
        </div>
      )}

      {/* Actual image (hidden until loaded) */}
      <img
        src={src}
        alt={alt}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        {...rest}
        onError={handleError}
        onLoad={handleLoad}
      />

      {/* CSS animations injected via style tag */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
