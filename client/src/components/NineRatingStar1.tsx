import React from 'react';

interface NineRatingStar1Props {
  className?: string;
}

export const NineRatingStar1: React.FC<NineRatingStar1Props> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 0L9.183 5.182L15 5.182L10.409 8.386L12.092 13.568L7.5 10.364L2.908 13.568L4.591 8.386L0 5.182L5.817 5.182L7.5 0Z"
          fill="#FFD700"
        />
      </svg>
    </div>
  );
};
