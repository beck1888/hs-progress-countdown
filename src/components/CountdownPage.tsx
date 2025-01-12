"use client";

import { useState, useEffect } from "react";
import InfoBox from "@/components/ui/InfoBox";
import Settings from "@/components/ui/Settings";
import DigitalCountdown from "@/components/ui/DigitalCountdown";
import CircularTimer from "@/components/ui/CircularTimer"; // New import
import { getTimeDiff, pad } from "@/utils/time"; // New import

import Image from "next/image";
import InfoIcon from "@/public/icons/info.svg";
import SettingsIcon from "@/public/icons/settings.svg";
import CloseIcon from "@/public/icons/close.svg";

type TimeParts = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownPage = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [timeParts, setTimeParts] = useState<TimeParts>({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const startDate = new Date('2021-08-23T08:45:00');
  const endDate = new Date('2025-06-05T16:00:00');
  
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDecimals, setShowDecimals] = useState(true);
  const [showDigital, setShowDigital] = useState(true);
  const [showRing, setShowRing] = useState(true);
  const [showText, setShowText] = useState(true); // New state
  const [roundingMethod, setRoundingMethod] = useState<'floor' | 'nearest'>('floor'); // New state

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
    if (showDigital && !showRing) {
      setShowRing(true);
    }
    setShowDigital(!showDigital);
  };
  const handleToggleRing = () => {
    if (showRing && !showDigital) {
      setShowDigital(true);
    }
    setShowRing(!showRing);
  };

  const handleToggleText = () => {
    setShowText(!showText);
  };

  const handleChangeRoundingMethod = (method: 'floor' | 'nearest') => {
    setRoundingMethod(method);
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
      <Settings
        isOpen={showSettings}
        decimals={showDecimals}
        showDigital={showDigital}
        showRing={showRing}
        showText={showText} // New prop
        roundingMethod={roundingMethod} // New prop
        onToggleDecimals={handleToggleDecimals}
        onToggleDigital={handleToggleDigital}
        onToggleRing={handleToggleRing}
        onToggleText={handleToggleText} // New prop
        onChangeRoundingMethod={handleChangeRoundingMethod} // New prop
      />
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={handleToggleInfo}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${showInfoBox ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <Image src={showInfoBox ? CloseIcon : InfoIcon} alt="Info" />
        </button>
        <button
          onClick={handleToggleSettings}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${showSettings ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <Image src={showSettings ? CloseIcon : SettingsIcon} alt="Settings" />
        </button>
      </div>
      <div className="flex flex-col items-center mt-8">
        {showRing && (
          <CircularTimer
            percentage={percentage}
            showText={showText} // New prop
            showDecimals={showDecimals} // New prop
            roundingMethod={roundingMethod} // New prop
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

export default CountdownPage;