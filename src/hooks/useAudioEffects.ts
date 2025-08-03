import { useRef, useEffect, useState, useCallback } from 'react';
import { playRandomSound, playAudio } from '../utils';
import { soundFiles, buttonPressImages } from '../data/constants';

export const useAudioEffects = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastImage, setLastImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('/images/keyboard-press/button_press1.png');
  const [showButtonPress, setShowButtonPress] = useState(false);

  const playKeyboardSound = useCallback(() => {
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
  }, [lastImage]);

  const playButtonSound = () => {
    playAudio('/sound/old-radio-button-click-97549.mp3', 0.7);
  };

  const playScreenSound = () => {
    playAudio('/sound/screen_on_off.mp3', 0.5);
  };

  useEffect(() => {
    const handleKeyDown = () => {
      playKeyboardSound();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playKeyboardSound]);

  return {
    audioRef,
    soundFiles,
    buttonPressImages,
    showButtonPress,
    currentImage,
    playKeyboardSound,
    playButtonSound,
    playScreenSound
  };
};