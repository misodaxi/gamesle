import React from 'react';

interface TranslateIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const TranslateIcon: React.FC<TranslateIconProps> = ({
  size = 18,
  color = 'currentColor',
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Central Globe */}
      <circle cx="12" cy="12" r="5" />
      <path d="M12 7c-1.5 1.5-2.5 3.2-2.5 5s1 3.5 2.5 5" />
      <path d="M12 7c1.5 1.5 2.5 3.2 2.5 5s-1 3.5-2.5 5" />
      <line x1="7" y1="12" x2="17" y2="12" />

      {/* Upper Rotating Arrow with 'A' */}
      <path d="M7 6.5A8 8 0 0 1 18 6.5" />
      <polyline points="15 3.5 18 6.5 15 9.5" />
      <text x="18" y="10" fontSize="7" fontWeight="bold" fill={color} stroke="none" fontFamily="sans-serif">A</text>

      {/* Lower Rotating Arrow with '文' */}
      <path d="M17 17.5A8 8 0 0 1 6 17.5" />
      <polyline points="9 20.5 6 17.5 9 14.5" />
      <text x="1.5" y="16" fontSize="6.5" fontWeight="bold" fill={color} stroke="none" fontFamily="sans-serif">文</text>
    </svg>
  );
};
