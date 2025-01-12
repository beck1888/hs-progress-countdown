"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CircularTimerProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

interface TimeParts {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeDiff(start: Date, end: Date): TimeParts {
  if (start >= end) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  let s = new Date(start.getTime());
  let e = new Date(end.getTime());
  let years = e.getFullYear() - s.getFullYear();
  if (
    e.getMonth() < s.getMonth() ||
    (e.getMonth() === s.getMonth() && e.getDate() < s.getDate())
  ) {
    years--;
  }
  s.setFullYear(s.getFullYear() + years);
  let months = e.getMonth() - s.getMonth();
  if (months < 0) months += 12;
  if (e.getDate() < s.getDate()) months--;
  s.setMonth(s.getMonth() + months);
  let days = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  s.setDate(s.getDate() + days);
  let hours = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60));
  s.setHours(s.getHours() + hours);
  let minutes = Math.floor((e.getTime() - s.getTime()) / (1000 * 60));
  s.setMinutes(s.getMinutes() + minutes);
  let seconds = Math.floor((e.getTime() - s.getTime()) / 1000);
  return { years, months, days, hours, minutes, seconds };
}

function pad(num: number): string {
  return num.toString().padStart(2, "0");
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  percentage,
  size = 320,
  strokeWidth = 20,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashOffset = circumference - (percentage / 100) * circumference;

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
        <p className="text-2xl font-bold text-white">
          {percentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const TimeElapsedPage = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [timeParts, setTimeParts] = useState<TimeParts>({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showDates, setShowDates] = useState(false);
  
  const startDate = new Date('2021-08-23T08:45:00');
  const endDate = new Date('2025-06-05T16:00:00');
  
  const calculatePercentage = () => {
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    const calculatedPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.max(0, Math.min(100, calculatedPercentage));
  };

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setPercentage(calculatePercentage());
      setTimeParts(getTimeDiff(now, endDate));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}>
        Class of 2025 Graduation Countdown
      </h1>
      <button
        onClick={() => setShowDates(!showDates)}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
      >
        Info
      </button>
      {showDates && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded border border-gray-700 w-64 text-sm">
          <div>Start: {startDate.toLocaleString()}</div>
          <div>End: {endDate.toLocaleString()}</div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <CircularTimer percentage={percentage} />
        <div className="mt-6 text-center space-y-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="text-2xl font-bold">{pad(timeParts.years)}</div>
              <div className="text-sm">Years</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="text-2xl font-bold">{pad(timeParts.months)}</div>
              <div className="text-sm">Months</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="text-2xl font-bold">{pad(timeParts.days)}</div>
              <div className="text-sm">Days</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="text-2xl font-bold">{pad(timeParts.hours)}</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="text-2xl font-bold">{pad(timeParts.minutes)}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="text-2xl font-bold">{pad(timeParts.seconds)}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeElapsedPage;