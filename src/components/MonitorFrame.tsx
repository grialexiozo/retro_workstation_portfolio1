'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MonitorFrameProps } from '../data/types';
import { playAudio, playRandomSound } from '../utils';
import { soundFiles, buttonPressImages } from '../data/constants';
import MonitorControls from './Monitor/MonitorControls';
import MonitorEffects from './Monitor/MonitorEffects';

const MonitorFrame: React.FC<MonitorFrameProps> = ({ children, onMonitorTurnOn }) => {
  const [showButtonPress, setShowButtonPress] = useState(false);
  const [lastImage, setLastImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('/images/keyboard-press/button_press1.png');
  const [isMonitorOn, setIsMonitorOn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOnOffButtonPress, setShowOnOffButtonPress] = useState(false);


  const handlePowerToggle = () => {
    const newMonitorState = !isMonitorOn;
    
    setShowOnOffButtonPress(newMonitorState);
    
    setTimeout(() => {
      setIsTransitioning(true);
      setIsMonitorOn(newMonitorState);
      
      if (newMonitorState) {
        playAudio('/sound/screen_on_off.mp3', 0.5);
        
        if (onMonitorTurnOn) {
          setTimeout(() => {
            onMonitorTurnOn();
          }, 300);
        }
      } else {
        playAudio('/sound/screen_on_off.mp3', 0.5);
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = () => {
      playRandomSound(soundFiles, 0.25);

      let nextImage;
      do {
        nextImage = buttonPressImages[Math.floor(Math.random() * buttonPressImages.length)];
      } while (nextImage === lastImage);

      setCurrentImage(nextImage);
      setLastImage(nextImage);
      
      setShowButtonPress(true);
      setTimeout(() => {
        setShowButtonPress(false);
      }, 150);
    };

    const handleClick = () => {};

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, [lastImage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="relative max-w-full max-h-full">
        <Image
          src="/images/monitor-base/monitor_final.webp"
          alt="Monitor"
          width={800}
          height={800}
          className="drop-shadow-2xl"
          priority
        />
        
        <MonitorEffects
          showButtonPress={showButtonPress}
          currentImage={currentImage}
        />
        
        <div className="monitor-screen">
          <div 
            className={`monitor-content ${isMonitorOn ? 'crt-on' : 'crt-off'} ${isTransitioning ? 'crt-transition' : ''}`}
            style={{
              visibility: isMonitorOn || isTransitioning ? 'visible' : 'hidden'
            }}
          >
            {children}
          </div>
        </div>
        
        <MonitorControls
          onPowerToggle={handlePowerToggle}
          isMonitorOn={isMonitorOn}
          isTransitioning={isTransitioning}
          showOnOffButtonPress={showOnOffButtonPress}
        />
        

      </div>
      

    </div>
  );
};

export default MonitorFrame;