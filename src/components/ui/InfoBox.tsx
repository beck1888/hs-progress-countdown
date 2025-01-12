import React, { useState, useEffect } from 'react';

interface InfoBoxProps {
  isOpen: boolean;
  startDate: Date;
  endDate: Date;
  onToggle: () => void;
  children?: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ isOpen, startDate, endDate, onToggle, children }) => {
  const [lastCommitId, setLastCommitId] = useState<string>("");

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

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 right-16 bg-gray-800 p-4 rounded border border-gray-700 w-80 text-sm">
      <div><strong>Start:</strong> Monday, August 23rd, 2021 at 8:45 AM</div>
      <div><strong>End:</strong> Thursday, June 5th, 2025 at 4:00 PM</div>
      <div className="mt-2">
        <strong>Version:</strong> <a href={`https://github.com/beck1888/hs-progress-countdown/commit/${lastCommitId}`} target="_blank" rel="noopener noreferrer">{lastCommitId}</a>
      </div>
      {children}
    </div>
  );
};

export default InfoBox;
