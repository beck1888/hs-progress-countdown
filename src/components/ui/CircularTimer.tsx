import React from "react";

interface CircularTimerProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
  showDecimals?: boolean;
  roundingMethod?: "floor" | "nearest";
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  percentage,
  size = 400, // Increased from 320
  strokeWidth = 24, // Increased from 20
  className = '',
  showText,
  showDecimals,
  roundingMethod
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashOffset = circumference - (percentage / 100) * circumference;

  const displayPercentage = showDecimals
    ? percentage.toFixed(2)
    : roundingMethod === 'floor'
    ? Math.floor(percentage).toString()
    : Math.round(percentage).toString();

  return (
    <div className={`relative ${className}`} style={{ padding: '20px' }}>
      <svg 
        width={size + 40} 
        height={size + 40} 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={(size + 40) / 2}
          cy={(size + 40) / 2}
          r={radius}
          className="stroke-gray-700"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={(size + 40) / 2}
          cy={(size + 40) / 2}
          r={radius}
          stroke="#0000ff"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashOffset,
            transition: 'stroke-dashoffset 0.5s ease',
            filter: 'drop-shadow(0 0 15px rgba(0, 0, 255, 0.8))'
          }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-4xl font-bold text-white transition-all duration-300">
          {displayPercentage}%
        </p>
        {showText && (
          <p className="text-sm text-gray-400">done with high school</p>
        )}
      </div>
    </div>
  );
};

export default CircularTimer;