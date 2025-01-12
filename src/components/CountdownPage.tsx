"use client";

import { useState, useEffect, useRef } from "react";
import InfoBox from "@/components/ui/InfoBox";
import Settings from "@/components/ui/Settings";
import DigitalCountdown from "@/components/ui/DigitalCountdown";
import CircularTimer from "@/components/ui/CircularTimer";
import { getTimeDiff, pad } from "@/utils/time";

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
  const [timeParts, setTimeParts] = useState<TimeParts>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startDate = new Date('2021-08-23T08:45:00');
  const endDate = new Date('2025-06-05T16:00:00');

  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDecimals, setShowDecimals] = useState(true);
  const [showDigital, setShowDigital] = useState(true);
  const [showRing, setShowRing] = useState(true);
  const [showText, setShowText] = useState(true);
  const [roundingMethod, setRoundingMethod] = useState<'floor' | 'nearest'>('floor');
  const [showHeaders, setShowHeaders] = useState(false);
  const [enableTickingSound, setEnableTickingSound] = useState(false);
  const [useNewBranding, setUseNewBranding] = useState(false); // Add this
  const tickingSoundRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleInfo = () => {
    setShowInfoBox(!showInfoBox);
    if (!showInfoBox) setShowSettings(false);
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
    if (!showSettings) setShowInfoBox(false);
  };

  const handleToggleDecimals = () => {
    setShowDecimals((prev) => {
      const newValue = !prev;
      localStorage.setItem("showDecimals", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleToggleDigital = () => {
    setShowDigital((prev) => {
      const newValue = !prev;
      localStorage.setItem("showDigital", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleToggleRing = () => {
    setShowRing((prev) => {
      const newValue = !prev;
      localStorage.setItem("showRing", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleToggleText = () => {
    setShowText((prev) => {
      const newValue = !prev;
      localStorage.setItem("showText", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleChangeRoundingMethod = (method: 'floor' | 'nearest') => {
    setRoundingMethod(method);
    localStorage.setItem("roundingMethod", method);
  };

  const handleToggleHeaders = () => {
    setShowHeaders((prev) => {
      const newValue = !prev;
      localStorage.setItem("showHeaders", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleToggleTickingSound = () => {
    setEnableTickingSound((prev) => {
      const newValue = !prev;
      localStorage.setItem("enableTickingSound", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleToggleBranding = () => {
    setUseNewBranding((prev) => {
      const newValue = !prev;
      localStorage.setItem("useNewBranding", JSON.stringify(newValue));
      window.location.reload(); // Refresh the page
      return newValue;
    });
  };

  // Move the update logic outside of useEffect to prevent infinite loops
  const updateCountdown = () => {
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    const calc = (elapsedDuration / totalDuration) * 100;
    
    return {
      percentage: Math.max(0, Math.min(100, calc)),
      timeParts: getTimeDiff(now, endDate)
    };
  };

  useEffect(() => {
    // Initial update
    const initialValues = updateCountdown();
    setPercentage(initialValues.percentage);
    setTimeParts(initialValues.timeParts);

    // Set up interval for updates
    const timer = setInterval(() => {
      const values = updateCountdown();
      setPercentage(values.percentage);
      setTimeParts(values.timeParts);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array since startDate and endDate are constants

  useEffect(() => {
    if (enableTickingSound) {
      if (!tickingSoundRef.current) {
        tickingSoundRef.current = new Audio('/audio/clock_tick.mp3');
        tickingSoundRef.current.loop = true;
      }
      tickingSoundRef.current.play();
    } else if (tickingSoundRef.current) {
      tickingSoundRef.current.pause();
      tickingSoundRef.current.currentTime = 0;
    }
  }, [enableTickingSound]);

  useEffect(() => {
    setShowDecimals(JSON.parse(localStorage.getItem("showDecimals") || "true"));
    setShowDigital(JSON.parse(localStorage.getItem("showDigital") || "true"));
    setShowRing(JSON.parse(localStorage.getItem("showRing") || "true"));
    setShowText(JSON.parse(localStorage.getItem("showText") || "true"));
    setRoundingMethod(localStorage.getItem("roundingMethod") as 'floor' | 'nearest' || 'floor');
    setShowHeaders(JSON.parse(localStorage.getItem("showHeaders") || "false"));
    setEnableTickingSound(JSON.parse(localStorage.getItem("enableTickingSound") || "false"));
    setUseNewBranding(JSON.parse(localStorage.getItem("useNewBranding") || "false"));
  }, []);

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 text-white flex flex-col items-center">
      {showHeaders && (
        <>
          <h1 
            className="text-xl md:text-2xl font-semibold mb-2 bg-black/30 backdrop-blur-sm px-4 md:px-6 py-2 rounded-lg text-red-500"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            Graduation Countdown
          </h1>
          <h2 
            className="text-2xl md:text-4xl font-bold mb-4 bg-black/30 backdrop-blur-sm px-6 md:px-8 py-3 rounded-lg text-yellow-400"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            {useNewBranding ? 'KHS Class of 2025' : 'KJHS Class of 2025'}
          </h2>
        </>
      )}
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
        showText={showText}
        showHeaders={showHeaders}
        enableTickingSound={enableTickingSound}
        roundingMethod={roundingMethod}
        onToggleDecimals={handleToggleDecimals}
        onToggleDigital={handleToggleDigital}
        onToggleRing={handleToggleRing}
        onToggleText={handleToggleText}
        onToggleHeaders={handleToggleHeaders}
        onToggleTickingSound={handleToggleTickingSound}
        useNewBranding={useNewBranding} // Add this
        onToggleBranding={handleToggleBranding} // Add this
        onChangeRoundingMethod={handleChangeRoundingMethod} // Add this
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
      <div className="flex flex-col items-center mt-4">
        {showRing && (
          <CircularTimer
            percentage={percentage}
            showText={showText}
            showDecimals={showDecimals}
            roundingMethod={roundingMethod}
            className="mb-8"
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