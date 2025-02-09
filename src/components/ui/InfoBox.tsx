import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface InfoBoxProps {
  isOpen: boolean;
  children?: React.ReactNode;
  startDate: Date;
  endDate: Date;
  onToggle: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ isOpen, children }) => {
  const [lastCommitId, setLastCommitId] = useState<string>("");
  const [clientType, setClientType] = useState<string>("");

  useEffect(() => {
    const fetchLastCommitId = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/beck1888/hs-progress-countdown/commits');
        const data = await response.json();
        if (data && data.length > 0) {
          setLastCommitId(data[0].sha.substring(0, 7));
        }
      } catch (error) {
        console.error("Failed to fetch last commit ID:", error);
      }
    };

    fetchLastCommitId();
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent)) {
      setClientType("Mobile");
    } else {
      setClientType("Desktop");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-4 bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-lg border border-gray-700 w-full max-w-sm text-sm overflow-auto max-h-full z-50
                 sm:fixed sm:inset-4 sm:w-auto sm:h-auto sm:m-4 sm:rounded-lg sm:max-w-none sm:bg-gray-900 sm:bg-opacity-80
                 md:fixed md:inset-4 md:w-auto md:h-auto md:m-4 md:rounded-lg md:max-w-none md:bg-gray-900 md:bg-opacity-100"
    >
      <div><strong>Start:</strong> Monday, August 23rd, 2021 at 8:45 AM</div>
      <div><strong>End:</strong> Thursday, June 5th, 2025 at 4:00 PM</div>
      <div className="mt-2">
        <strong>Version:</strong> <a href="https://github.com/beck1888/hs-progress-countdown" target="_blank" className='underline' rel="noopener noreferrer">{lastCommitId}</a>
      </div>
      <div><strong>Build:</strong> {process.env.NEXT_PUBLIC_RUNNING_BUILD}</div>
      <div><strong>Client Type:</strong> {clientType}</div>
      <footer className="absolute bottom-2 w-full text-center text-white text-xs opacity-30">
          This site is not affiliated with <a href="https://kehillah.org/" target="_blank" className="underline">Kehillah</a> nor <a href="https://kehillah.today/" target="_blank" className="underline">kehillah.today</a> and may not reflect most current dates.
          <br />
          &copy; 2025 <a href="https://github.com/beck1888" target="_blank" className="underline">Beck Orion</a>. | <a href="https://docs.google.com/forms/d/e/1FAIpQLSfvxpGIi-Gi2LJDD_VLIX3U3wmdFmX2pjhosUZGYhTnGpKZlQ/viewform?usp=header" target="_blank" className="underline">Contact</a> | This developer stands with <a href="https://www.standwithus.com/" target="_blank" className="underline">Israel</a>. 
          <Image src="/icons/israel.svg" alt="Israel flag" width={16} height={16} className="inline ml-1 align-text-bottom brightness-110" />
        </footer>
      {children}
    </div>
  );
};

export default InfoBox;
