import React from "react";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = 200,
  height = 200,
  alt = "Placeholder",
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 ${className}`}
      style={{ width, height }}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="8.5"
          cy="8.5"
          r="1.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
};
