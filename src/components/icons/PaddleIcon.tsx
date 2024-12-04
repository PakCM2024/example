import React from 'react';

interface PaddleIconProps {
  className?: string;
}

export const PaddleIcon: React.FC<PaddleIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2c-4 0-7 2-8 5-2 6 2 10 4 12s3 2 4 2 2 0 4-2 6-6 4-12c-1-3-4-5-8-5z" />
    <path d="M12 7a2 2 0 100 4 2 2 0 000-4z" />
    <path d="M12 2v3" />
    <path d="M12 19v3" />
    <path d="M6 5l3 3" />
    <path d="M18 5l-3 3" />
    <path d="M9 3c-4 2-6 6-4 12" />
    <path d="M15 3c4 2 6 6 4 12" />
  </svg>
);