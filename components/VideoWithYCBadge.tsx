import React from 'react';

interface VideoWithYCBadgeProps {
  children: React.ReactNode;
  isYCBacked?: boolean;
  badgeText?: string;
}

export default function VideoWithYCBadge({ 
  children, 
  isYCBacked = true,
  badgeText = "Showcasing a YC-backed startup"
}: VideoWithYCBadgeProps) {
  return (
    <>
      <div className="space-y-3">
        {/* YC Badge - Glassmorphic design matching banner */}
        {isYCBacked && (
          <div className="flex items-center justify-center py-2">
            <div className="glass-badge flex items-center gap-2.5 px-6 py-3 rounded-[50px]">
              <div className="w-8 h-8 bg-[#FB651E] flex items-center justify-center font-bold text-lg text-white font-mono rounded">
                Y
              </div>
              <span className="text-white text-sm font-medium tracking-wide">
                {badgeText}
              </span>
            </div>
          </div>
        )}
        
        {/* Video content */}
        {children}
      </div>

      <style jsx>{`
        .glass-badge {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.15) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(200, 200, 200, 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}