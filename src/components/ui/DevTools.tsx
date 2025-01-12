import React, { useState, useEffect } from "react";

interface DevToolsProps {
  onClose: () => void;
}

const DevTools: React.FC<DevToolsProps> = ({ onClose }) => {
  const [overrideDate, setOverrideDate] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("manualCountdownOverride");
    if (stored) {
      setOverrideDate(stored);
    } else {
      const laNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      // Use a 'datetime-local' friendly format
      setOverrideDate(laNow.toISOString().slice(0,16));
    }
  }, []);

  const handleOverride = () => {
    // Example logic to override the current date in an app-specific way
    // You would store overrideDate in localStorage or global state
    localStorage.setItem("manualCountdownOverride", overrideDate);
    alert(`Overriding date/time to: ${overrideDate}`);
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();
    alert("Local storage cleared. Page will reload.");
    window.location.reload();
  };

  const handleJumpToEnd = () => {
    const endDate = new Date('2025-06-05T16:00:00');
    const jumpDate = new Date(endDate.getTime() - 5000); // 5 seconds before end
    localStorage.setItem("manualCountdownOverride", jumpDate.toISOString());
    alert(`Jumping to: ${jumpDate}`);
    window.location.reload();
  };

  const handleResetToCurrentTime = () => {
    localStorage.removeItem("manualCountdownOverride");
    alert("Reset to current time. Page will reload.");
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 p-4 rounded border border-gray-700 w-[90%] max-w-sm text-sm overflow-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-300">Dev Tools</h3>
        <button
          className="text-white hover:text-gray-400"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="mb-2">
        <label className="block text-gray-300 mb-1">Manual Countdown Override:</label>
        <input
          type="datetime-local"
          value={overrideDate}
          onChange={(e) => setOverrideDate(e.target.value)}
          className="bg-gray-600 text-white rounded p-1 w-full"
        />
        <button
          onClick={handleOverride}
          className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
        >
          Apply
        </button>
      </div>
      <button
        onClick={handleJumpToEnd}
        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-white mb-2"
      >
        Jump to 5s Before End
      </button>
      <button
        onClick={handleResetToCurrentTime}
        className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-white mb-2"
      >
        Reset to Current Time
      </button>
      <button
        onClick={handleClearLocalStorage}
        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white"
      >
        Clear Local Storage
      </button>
    </div>
  );
};

export default DevTools;