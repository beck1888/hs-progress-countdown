"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CircularTimerProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  percentage,
  size = 200,
  strokeWidth = 12,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <svg 
        width={size} 
        height={size} 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-gray-700"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-blue-500"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashOffset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-2xl font-bold text-white">
          {percentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const TimeElapsedPage = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  const startDate = new Date('2021-08-23T08:45:00');
  const endDate = new Date('2025-06-05T16:00:00');
  
  const calculatePercentage = () => {
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    const calculatedPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.max(0, Math.min(100, calculatedPercentage));
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  useEffect(() => {
    setPercentage(calculatePercentage());
    setCurrentTime(formatDate(new Date()));

    const timer = setInterval(() => {
      setPercentage(calculatePercentage());
      setCurrentTime(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <Card className="max-w-xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Time Elapsed Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-300">Freshman Kinnus:</h3>
                <p className="text-white">August 23rd, 2025 at 8:45 AM</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-300">Senior Graduation:</h3>
                <p className="text-white">June 5th, 2025 at 4:00 PM</p>
              </div>
            </div>
            
            {/* <div className="mt-6">
              <h3 className="font-medium text-gray-300">Current Time:</h3>
              <p className="text-white">{currentTime}</p>
            </div> */}

            <div className="mt-6 flex flex-col items-center">
              <h3 className="font-medium text-gray-300 mb-4">Progress:</h3>
              <CircularTimer percentage={percentage} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeElapsedPage;