'use client';

import React from 'react';
import Image from 'next/image';

interface MonitorControlsProps {
  onPowerToggle: () => void;
  isMonitorOn: boolean;
  isTransitioning: boolean;
  showOnOffButtonPress: boolean;
}

const MonitorControls: React.FC<MonitorControlsProps> = ({
  onPowerToggle,
  isTransitioning,
  showOnOffButtonPress
}) => {
  const handlePowerClick = () => {
    if (isTransitioning) return;
    
    const audio = new Audio('/sound/old-radio-button-click-97549.mp3');
    audio.volume = 0.7;
    audio.play().catch(error => console.log('Audio play failed:', error));
    
    onPowerToggle();
  };

  return (
    <>
      {showOnOffButtonPress && (
        <Image
          src="/images/monitor-button/onoff_button_pressed.png"
          alt="On/Off Button Pressed"
          width={800}
          height={800}
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            zIndex: 9998,
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div
        onClick={handlePowerClick}
        className="absolute cursor-pointer"
        style={{
          left: '72.35%',
          top: '54%',
          width: '4.1%',
          height: '3.55%',
          zIndex: 10
        }}
      />
    </>
  );
};

export default MonitorControls;