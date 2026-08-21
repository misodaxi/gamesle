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
      {/* Asian Character '文' stroke geometry */}
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      {/* Latin Character 'A' stroke geometry */}
      <path d="M14 18h6" />
    </svg>
  );
};
