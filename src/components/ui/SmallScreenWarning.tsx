import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PhoneIcon from '@/public/icons/phone.svg';

const SmallScreenWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem('dontShowSmallScreenWarning');
    if (!storedPreference) {
      setIsVisible(true);
    }
  }, []);

  const handleProceed = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowSmallScreenWarning', 'true');
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white p-4" style={{ zIndex: 2147483647 }}>
      <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center max-w-md w-full mx-4">
        <Image src={PhoneIcon} alt="Phone Icon" width={48} height={48} />
        <h2 className="text-2xl font-bold mt-4">Heads up!</h2>
        <p className="mt-2 text-center">
          This website is best experienced on a desktop.
        </p>
        <p className="mt-1 text-sm text-gray-400 text-center">
          Viewing this on a small screen may result in broken formatting for the time being.
        </p>
        <button
          onClick={handleProceed}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
        >
          Proceed
        </button>
        <label className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={() => setDontShowAgain(!dontShowAgain)}
            className="mr-2"
          />
          Don't show this again
        </label>
      </div>
    </div>
  );
};

export default SmallScreenWarning;
