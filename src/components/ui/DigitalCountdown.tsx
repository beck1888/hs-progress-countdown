
import React from 'react';

interface TimeParts {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface DigitalCountdownProps {
  timeParts: TimeParts;
  pad: (num: number) => string;
}

const DigitalCountdown: React.FC<DigitalCountdownProps> = ({ timeParts, pad }) => {
  return (
    <div className="mt-6 text-center space-y-2 transition-all duration-300">
      <div className="grid grid-cols-3 gap-4">
        {/* Years */}
        <div className="p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out transform">
          <div className="text-4xl font-bold">{pad(timeParts.years)}</div>
          <div className="text-sm">Years</div>
        </div>
        {/* Months */}
        <div className="p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out transform">
          <div className="text-4xl font-bold">{pad(timeParts.months)}</div>
          <div className="text-sm">Months</div>
        </div>
        {/* Days */}
        <div className="p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out transform">
          <div className="text-4xl font-bold">{pad(timeParts.days)}</div>
          <div className="text-sm">Days</div>
        </div>
        {/* Hours */}
        <div className="p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out transform">
          <div className="text-4xl font-bold">{pad(timeParts.hours)}</div>
          <div className="text-sm">Hours</div>
        </div>
        {/* Minutes */}
        <div className="p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out transform">
          <div className="text-4xl font-bold">{pad(timeParts.minutes)}</div>
          <div className="text-sm">Minutes</div>
        </div>
        {/* Seconds */}
        <div className="p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out transform">
          <div className="text-4xl font-bold">{pad(timeParts.seconds)}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCountdown;