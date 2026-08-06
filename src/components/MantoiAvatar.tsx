import React from 'react';

interface MantoiAvatarProps {
  type: string;
  size?: number;
  className?: string;
  showHalo?: boolean;
}

export const MantoiAvatar: React.FC<MantoiAvatarProps> = ({
  type,
  size = 120,
  className = '',
  showHalo = false,
}) => {
  const renderAvatarContent = () => {
    switch (type) {
      case 'chilli':
        return (
          <g>
            {/* Chilli Stem */}
            <path
              d="M 60 22 C 60 12, 72 8, 78 12 C 72 18, 65 20, 60 22 Z"
              fill="#22543D"
            />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#E53E3E"
            />
            {/* Bao fold lines */}
            <path
              d="M 60 25 Q 52 40 55 50 M 60 25 Q 68 40 65 50 M 60 25 Q 60 42 60 52"
              stroke="#FEB2B2"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Fiery Eyes */}
            <circle cx="45" cy="55" r="4" fill="#1A202C" />
            <circle cx="75" cy="55" r="4" fill="#1A202C" />
            <circle cx="46" cy="53" r="1.5" fill="#FFFFFF" />
            <circle cx="76" cy="53" r="1.5" fill="#FFFFFF" />
            {/* Expressive Eyebrows */}
            <path
              d="M 38 47 L 50 51"
              stroke="#742A2A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 82 47 L 70 51"
              stroke="#742A2A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Spicy Smile */}
            <path
              d="M 50 67 Q 60 76 70 67"
              stroke="#1A202C"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Rosy Cheeks */}
            <ellipse cx="37" cy="62" rx="5" ry="3" fill="#FEB2B2" opacity="0.8" />
            <ellipse cx="83" cy="62" rx="5" ry="3" fill="#FEB2B2" opacity="0.8" />
            {/* Sparkle */}
            <path
              d="M 88 32 L 91 37 L 96 38 L 92 42 L 93 47 L 88 44 L 83 47 L 84 42 L 80 38 L 85 37 Z"
              fill="#F6E05E"
            />
          </g>
        );

      case 'kaya':
        return (
          <g>
            {/* Kaya topping swirl */}
            <ellipse cx="60" cy="27" rx="14" ry="5" fill="#ECC94B" />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#ECC94B"
            />
            {/* Golden bao texture */}
            <path
              d="M 60 25 Q 50 42 52 52 M 60 25 Q 70 42 68 52"
              stroke="#FEFCBF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Sweet Happy Arc Eyes */}
            <path
              d="M 40 55 Q 45 49 50 55"
              stroke="#744210"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 70 55 Q 75 49 80 55"
              stroke="#744210"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Warm Smile */}
            <path
              d="M 52 65 Q 60 72 68 65"
              stroke="#744210"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cheeks */}
            <ellipse cx="36" cy="60" rx="6" ry="4" fill="#F6AD55" opacity="0.6" />
            <ellipse cx="84" cy="60" rx="6" ry="4" fill="#F6AD55" opacity="0.6" />
          </g>
        );

      case 'pandan':
        return (
          <g>
            {/* Pandan leaf on top */}
            <path
              d="M 60 25 Q 52 10 40 16 Q 50 25 60 25 Z"
              fill="#276749"
            />
            <path
              d="M 60 25 Q 68 10 80 16 Q 70 25 60 25 Z"
              fill="#2F855A"
            />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#48BB78"
            />
            {/* Soft pleats */}
            <path
              d="M 60 25 Q 55 45 57 55 M 60 25 Q 65 45 63 55"
              stroke="#C6F6D5"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Peaceful Eyes */}
            <circle cx="45" cy="54" r="3.5" fill="#1C4532" />
            <circle cx="75" cy="54" r="3.5" fill="#1C4532" />
            {/* Soft Smile */}
            <path
              d="M 53 64 Q 60 69 67 64"
              stroke="#1C4532"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="37" cy="60" rx="5" ry="3" fill="#9AE6B4" opacity="0.8" />
            <ellipse cx="83" cy="60" rx="5" ry="3" fill="#9AE6B4" opacity="0.8" />
          </g>
        );

      case 'coco':
        return (
          <g>
            {/* Cocoa Sprinkle on top */}
            <circle cx="56" cy="22" r="1.5" fill="#4A1D0D" />
            <circle cx="62" cy="20" r="2" fill="#4A1D0D" />
            <circle cx="67" cy="23" r="1.5" fill="#4A1D0D" />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#7B341E"
            />
            <path
              d="M 60 25 Q 50 42 53 52 M 60 25 Q 70 42 67 52"
              stroke="#C05621"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Closed, cozy sleeping/reflecting eyes */}
            <path
              d="M 40 54 Q 45 58 50 54"
              stroke="#FFF5F5"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 70 54 Q 75 58 80 54"
              stroke="#FFF5F5"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Serene Smile */}
            <path
              d="M 54 64 Q 60 68 66 64"
              stroke="#FFF5F5"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cozy Cheeks */}
            <ellipse cx="36" cy="60" rx="5" ry="3" fill="#DD6B20" opacity="0.6" />
            <ellipse cx="84" cy="60" rx="5" ry="3" fill="#DD6B20" opacity="0.6" />
          </g>
        );

      case 'kopi':
        return (
          <g>
            {/* Coffee bean on headband */}
            <rect x="35" y="26" width="50" height="8" rx="4" fill="#4A1D0D" />
            <ellipse cx="60" cy="30" rx="6" ry="4" fill="#C05621" />
            <path d="M 60 26 Q 58 30 60 34" stroke="#FFF5F5" strokeWidth="1.5" fill="none" />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#8C4A27"
            />
            {/* Bright Enthusiastic Eyes */}
            <circle cx="45" cy="54" r="4" fill="#FFFFFF" />
            <circle cx="75" cy="54" r="4" fill="#FFFFFF" />
            <circle cx="46" cy="54" r="2" fill="#1A202C" />
            <circle cx="76" cy="54" r="2" fill="#1A202C" />
            {/* Big Energetic Smile */}
            <path
              d="M 48 64 Q 60 74 72 64 Z"
              fill="#FFFFFF"
            />
            <path
              d="M 48 64 Q 60 74 72 64"
              stroke="#1A202C"
              strokeWidth="2"
              fill="none"
            />
            <ellipse cx="36" cy="61" rx="5" ry="3" fill="#F6AD55" opacity="0.7" />
            <ellipse cx="84" cy="61" rx="5" ry="3" fill="#F6AD55" opacity="0.7" />
          </g>
        );

      case 'mantone':
        return (
          <g>
            {/* Musical note floating */}
            <path
              d="M 75 14 L 75 22 M 75 14 L 85 10 L 85 18 M 85 10 L 75 14"
              stroke="#C3DAFE"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#4C51BF"
            />
            {/* Smooth tone waves */}
            <path
              d="M 60 25 Q 52 42 54 52 M 60 25 Q 68 42 66 52"
              stroke="#C3DAFE"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* Serene eyes */}
            <path
              d="M 40 55 Q 45 50 50 55"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 70 55 Q 75 50 80 55"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Gentle smile */}
            <path
              d="M 53 65 Q 60 69 67 65"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="36" cy="60" rx="5" ry="3" fill="#9F7AEA" opacity="0.7" />
            <ellipse cx="84" cy="60" rx="5" ry="3" fill="#9F7AEA" opacity="0.7" />
          </g>
        );

      case 'mantold':
        return (
          <g>
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#2B6CB0"
            />
            {/* Wise Spectacles */}
            <circle cx="45" cy="54" r="7" stroke="#E2E8F0" strokeWidth="2" fill="none" />
            <circle cx="75" cy="54" r="7" stroke="#E2E8F0" strokeWidth="2" fill="none" />
            <line x1="52" y1="54" x2="68" y2="54" stroke="#E2E8F0" strokeWidth="2" />
            {/* Calm eyes behind glasses */}
            <circle cx="45" cy="54" r="2.5" fill="#FFFFFF" />
            <circle cx="75" cy="54" r="2.5" fill="#FFFFFF" />
            {/* Wise smile */}
            <path
              d="M 52 66 Q 60 70 68 66"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="36" cy="62" rx="4" ry="2.5" fill="#63B3ED" opacity="0.6" />
            <ellipse cx="84" cy="62" rx="4" ry="2.5" fill="#63B3ED" opacity="0.6" />
          </g>
        );

      case 'looking':
        return (
          <g>
            {/* Releasing crown / droplet cap */}
            <path
              d="M 48 24 L 54 12 L 60 20 L 66 12 L 72 24 Z"
              fill="#4FD1C5"
            />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#319795"
            />
            {/* Breezy Pleats */}
            <path
              d="M 60 25 Q 52 42 55 52 M 60 25 Q 68 42 65 52"
              stroke="#E6FFFA"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Joyful Winking Eyes */}
            <path
              d="M 40 54 Q 45 48 50 54"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="75" cy="52" r="3.5" fill="#FFFFFF" />
            {/* Lighthearted Open Smile */}
            <path
              d="M 50 64 Q 60 72 70 64"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="36" cy="61" rx="5" ry="3" fill="#81E6D9" opacity="0.8" />
            <ellipse cx="84" cy="61" rx="5" ry="3" fill="#81E6D9" opacity="0.8" />
          </g>
        );

      case 'binking':
        return (
          <g>
            {/* Sorting Box badge on top */}
            <rect x="52" y="16" width="16" height="12" rx="2" fill="#A0AEC0" />
            <line x1="60" y1="16" x2="60" y2="28" stroke="#4A5568" strokeWidth="1.5" />
            <line x1="52" y1="22" x2="68" y2="22" stroke="#4A5568" strokeWidth="1.5" />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#4A5568"
            />
            {/* Methodical Eyes */}
            <rect x="42" y="50" width="7" height="7" rx="2" fill="#E2E8F0" />
            <rect x="71" y="50" width="7" height="7" rx="2" fill="#E2E8F0" />
            <circle cx="45.5" cy="53.5" r="1.5" fill="#1A202C" />
            <circle cx="74.5" cy="53.5" r="1.5" fill="#1A202C" />
            {/* Neat Smile */}
            <line x1="52" y1="65" x2="68" y2="65" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="35" cy="60" rx="4" ry="2.5" fill="#CBD5E0" opacity="0.5" />
            <ellipse cx="85" cy="60" rx="4" ry="2.5" fill="#CBD5E0" opacity="0.5" />
          </g>
        );

      case 'sinkking':
        return (
          <g>
            {/* Gentle Anchor emblem */}
            <path
              d="M 60 12 L 60 22 M 54 22 C 54 26, 66 26, 66 22 M 56 16 L 64 16"
              stroke="#DD6B20"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#C05621"
            />
            {/* Grounding Base Line */}
            <path d="M 20 85 L 100 85" stroke="#7B341E" strokeWidth="4" strokeLinecap="round" />
            {/* Peaceful eyes */}
            <circle cx="45" cy="54" r="3.5" fill="#FEEBC8" />
            <circle cx="75" cy="54" r="3.5" fill="#FEEBC8" />
            <path
              d="M 52 64 Q 60 69 68 64"
              stroke="#FEEBC8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="36" cy="60" rx="5" ry="3" fill="#FBD38D" opacity="0.7" />
            <ellipse cx="84" cy="60" rx="5" ry="3" fill="#FBD38D" opacity="0.7" />
          </g>
        );

      case 'plain':
      default:
        return (
          <g>
            {/* Classic Warm Cream Bao Body */}
            <path
              d="M 25 75 C 20 40, 40 25, 60 25 C 80 25, 100 40, 95 75 C 90 92, 30 92, 25 75 Z"
              fill="#FAF0E6"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            {/* Soft pleat lines */}
            <path
              d="M 60 25 Q 52 42 55 52 M 60 25 Q 68 42 65 52 M 60 25 Q 60 40 60 50"
              stroke="#CBD5E0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Wholesome happy eyes */}
            <circle cx="45" cy="54" r="3.5" fill="#4A5568" />
            <circle cx="75" cy="54" r="3.5" fill="#4A5568" />
            {/* Cute gentle smile */}
            <path
              d="M 52 64 Q 60 70 68 64"
              stroke="#4A5568"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="36" cy="60" rx="5" ry="3" fill="#FEB2B2" opacity="0.7" />
            <ellipse cx="84" cy="60" rx="5" ry="3" fill="#FEB2B2" opacity="0.7" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {showHalo && (
        <div
          className="absolute inset-0 rounded-full animate-pulse blur-md opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(237,137,54,0.6) 0%, rgba(255,255,255,0) 70%)`,
          }}
        />
      )}
      <svg
        viewBox="0 0 120 100"
        width={size}
        height={(size * 100) / 120}
        className="overflow-visible drop-shadow-sm"
      >
        {renderAvatarContent()}
      </svg>
    </div>
  );
};
