'use client';

import React from 'react';
import Image from 'next/image';

interface MonitorEffectsProps {
  showButtonPress: boolean;
  currentImage: string;
}

const MonitorEffects: React.FC<MonitorEffectsProps> = ({
  showButtonPress,
  currentImage
}) => {
  return (
    <>
      {showButtonPress && (
        <Image
          src={currentImage}
          alt="Button Press"
          width={800}
          height={800}
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div 
        className="absolute pointer-events-none"
        style={{
          left: '0%',
          top: '3%',
          width: '18%',
          height: '57%',
          background: 'linear-gradient(to left, rgba(227, 18, 124, 0.8) 0%, rgba(227, 18, 124, 0.4) 30%, rgba(227, 18, 124, 0.1) 60%, transparent 100%)',
          filter: 'blur(15px)',
          opacity: 0.7,
          animation: 'glowPulse 1.5s infinite alternate',
          transform: 'rotate(-1deg)',
          transformOrigin: 'top',
          zIndex: 5
        }}
      />
    </>
  );
};

export default MonitorEffects;