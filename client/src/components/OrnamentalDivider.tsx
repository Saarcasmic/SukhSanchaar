import React from "react";

interface OrnamentalDividerProps {
  variant?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  variant = "vertical",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-1 h-32",
    md: "w-1 h-48",
    lg: "w-1 h-64",
  };

  const horizontalSizeClasses = {
    sm: "w-32 h-1",
    md: "w-48 h-1",
    lg: "w-64 h-1",
  };

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`${horizontalSizeClasses[size]} bg-gradient-to-r from-transparent via-ayur-gold to-transparent relative`}>
          {/* Decorative elements */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-ayur-gold rounded-full shadow-lg" />
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 bg-ayur-gold rounded-full" />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 bg-ayur-gold rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-b from-transparent via-ayur-gold to-transparent relative`}>
        {/* Main decorative center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ayur-gold rounded-full shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        
        {/* Top decorative elements */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-2 h-2 bg-ayur-gold/60 rounded-full" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-1 h-1 bg-ayur-gold/40 rounded-full" />
        
        {/* Bottom decorative elements */}
        <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-2 h-2 bg-ayur-gold/60 rounded-full" />
        <div className="absolute left-1/2 bottom-1/3 -translate-x-1/2 w-1 h-1 bg-ayur-gold/40 rounded-full" />
        
        {/* Side decorative elements */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-ayur-gold/30 rounded-full" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-ayur-gold/20 rounded-full" />
      </div>
    </div>
  );
};

export default OrnamentalDivider;
