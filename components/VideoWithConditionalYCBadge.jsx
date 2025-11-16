import React from 'react';

/**
 * Video player with conditional YC badge
 * Only shows badge for YC-backed startups
 */
const VideoWithConditionalYCBadge = ({ videoSrc, videoId, isYCBacked = true, videoIndex }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Video Player */}
      <video
        src={videoSrc}
        controls
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      
      {/* YC Badge Overlay - Only shows if isYCBacked is true */}
      {isYCBacked && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '12px 20px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 10
          }}
        >
          {/* YC Logo */}
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#FB651E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: 'white',
              fontFamily: 'monospace'
            }}
          >
            Y
          </div>
          
          {/* Text */}
          <span
            style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.3px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            From a YC-backed startup
          </span>
        </div>
      )}
    </div>
  );
};

export default VideoWithConditionalYCBadge;
