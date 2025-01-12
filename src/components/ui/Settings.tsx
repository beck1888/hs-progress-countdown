import React from 'react';

interface SettingsProps {
  isOpen: boolean;
  decimals: boolean;
  showDigital: boolean;
  showRing: boolean;
  onToggleDecimals: () => void;
  onToggleDigital: () => void;
  onToggleRing: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  decimals,
  showDigital,
  showRing,
  onToggleDecimals,
  onToggleDigital,
  onToggleRing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 right-16 bg-gray-800 p-4 rounded border border-gray-700 w-80 text-sm">
      <div className="flex items-center justify-between mb-2">
        <span>Show two decimals?</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={decimals}
            onChange={onToggleDecimals}
          />
          <div className="w-10 h-5 bg-gray-600 rounded-full relative">
            <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${decimals ? 'translate-x-5 bg-blue-500' : ''}`} />
          </div>
        </label>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>Show ring countdown?</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={showRing}
            onChange={onToggleRing}
          />
          <div className="w-10 h-5 bg-gray-600 rounded-full relative">
            <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${showRing ? 'translate-x-5 bg-blue-500' : ''}`} />
          </div>
        </label>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>Show digital countdown?</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={showDigital}
            onChange={onToggleDigital}
          />
          <div className="w-10 h-5 bg-gray-600 rounded-full relative">
            <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${showDigital ? 'translate-x-5 bg-blue-500' : ''}`} />
          </div>
        </label>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        At least one display must be active.
      </div>
    </div>
  );
};

export default Settings;