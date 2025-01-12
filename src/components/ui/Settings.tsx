import React from 'react';

interface SettingsProps {
  isOpen: boolean;
  decimals: boolean;
  showDigital: boolean;
  showRing: boolean;
  showText: boolean; // New prop
  roundingMethod: 'floor' | 'nearest'; // New prop
  onToggleDecimals: () => void;
  onToggleDigital: () => void;
  onToggleRing: () => void;
  onToggleText: () => void; // New prop
  onChangeRoundingMethod: (method: 'floor' | 'nearest') => void; // New prop
}

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  decimals,
  showDigital,
  showRing,
  showText, // New prop
  roundingMethod, // New prop
  onToggleDecimals,
  onToggleDigital,
  onToggleRing,
  onToggleText, // New prop
  onChangeRoundingMethod, // New prop
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 right-16 bg-gray-800 p-4 rounded border border-gray-700 w-80 text-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-300 mb-2">Display Options</h3>
        <div className="flex items-center justify-between mb-2">
          <span>Show ring countdown?</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={showRing}
              onChange={() => {
                if (showRing && !showDigital) onToggleDigital();
                onToggleRing();
              }}
            />
            <div className="w-10 h-5 bg-gray-600 rounded-full relative">
              <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${showRing ? 'translate-x-5 bg-blue-300' : ''}`} />
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
              onChange={() => {
                if (showDigital && !showRing) onToggleRing();
                onToggleDigital();
              }}
            />
            <div className="w-10 h-5 bg-gray-600 rounded-full relative">
              <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${showDigital ? 'translate-x-5 bg-blue-300' : ''}`} />
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>Show text under progress percentage?</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={showText}
              onChange={onToggleText}
            />
            <div className="w-10 h-5 bg-gray-600 rounded-full relative">
              <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${showText ? 'translate-x-5 bg-blue-300' : ''}`} />
            </div>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-300 mb-2">Precision</h3>
        <div className="flex items-center justify-between mb-2">
          <span>Show decimals?</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={decimals}
              onChange={onToggleDecimals}
            />
            <div className="w-10 h-5 bg-gray-600 rounded-full relative">
              <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-all ${decimals ? 'translate-x-5 bg-blue-300' : ''}`} />
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>Rounding method:</span>
          <select
            value={roundingMethod}
            onChange={(e) => onChangeRoundingMethod(e.target.value as 'floor' | 'nearest')}
            className="bg-gray-600 text-white rounded p-1"
          >
            <option value="floor">Floor</option>
            <option value="nearest">Nearest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;