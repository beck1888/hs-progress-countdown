"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/ui/InfoBox";
import Settings from "@/components/ui/Settings";
import DigitalCountdown from "@/components/ui/DigitalCountdown";
import InfoIcon from "@/public/icons/info.svg";
import SettingsIcon from "@/public/icons/settings.svg";

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
        <p className="text-4xl font-bold text-white transition-all duration-300">
          {percentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const TimeElapsedPage = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [timeParts, setTimeParts] = useState<TimeParts>({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const startDate = new Date('2021-08-23T08:45:00');
  const endDate = new Date('2025-06-05T16:00:00');
  
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDecimals, setShowDecimals] = useState(true);
  const [showDigital, setShowDigital] = useState(true);
  const [showRing, setShowRing] = useState(true);

  // Toggle handlers for InfoBox and Settings so only one can be open at a time
  const handleToggleInfo = () => {
    setShowInfoBox(!showInfoBox);
    if (!showInfoBox) setShowSettings(false);
  };
  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
    if (!showSettings) setShowInfoBox(false);
  };

  // Handlers for the Settings toggles
  const handleToggleDecimals = () => {
    setShowDecimals(!showDecimals);
  };
  const handleToggleDigital = () => {
    // If turning off digital and ring is already off, re-enable digital
    if (showDigital && !showRing) return;
    setShowDigital(!showDigital);
    if (!showDigital) setShowRing(true);
  };
  const handleToggleRing = () => {
    // If turning off ring and digital is already off, re-enable ring
    if (showRing && !showDigital) return;
    setShowRing(!showRing);
    if (!showRing) setShowDigital(true);
  };

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
      <InfoBox 
        isOpen={showInfoBox} 
        startDate={startDate} 
        endDate={endDate} 
        onToggle={handleToggleInfo}
      />
      <img src={InfoIcon} alt="Info" className="w-6 h-6" onClick={handleToggleInfo} />
      <Settings
        isOpen={showSettings}
        decimals={showDecimals}
        showDigital={showDigital}
        showRing={showRing}
        onToggleDecimals={handleToggleDecimals}
        onToggleDigital={handleToggleDigital}
        onToggleRing={handleToggleRing}
      />
      <img src={SettingsIcon} alt="Settings" className="w-6 h-6" />
      <div className="flex flex-col items-center mt-8">
        {showRing && (
          <CircularTimer
            percentage={showDecimals ? percentage : parseFloat(percentage.toFixed(0))}
          />
        )}
        {showDigital && (
          <DigitalCountdown
            timeParts={timeParts}
            pad={pad}
          />
        )}
      </div>
    </div>
  );
};

export default TimeElapsedPage;