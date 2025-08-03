import { useState, useCallback, useEffect } from 'react';
import { createCharacterSpans, applyDisappearingEffect, restoreCharacterOpacity } from '../utils';

export const useCrashEffect = (inputRef?: React.RefObject<HTMLInputElement | null>) => {
  const [isCrashScreen, setIsCrashScreen] = useState(false);
  const [crashText, setCrashText] = useState('');
  const [showCrashPrompt, setShowCrashPrompt] = useState(false);
  const [disappearingChars, setDisappearingChars] = useState<HTMLElement[]>([]);

  const triggerCrashEffect = useCallback((terminalRef: React.RefObject<HTMLDivElement | null>) => {
    if (!terminalRef.current) return;
    
    const terminal = terminalRef.current;
    const allChars = terminal.querySelectorAll('div');
    const charElements: HTMLSpanElement[] = [];
    
    allChars.forEach((element) => {
      const chars = createCharacterSpans(element);
      charElements.push(...chars);
    });
    
    setDisappearingChars(charElements);
    
    // Apply disappearing effect using utility function
    applyDisappearingEffect(charElements, 2000);
    
    setTimeout(() => {
      setCrashText('Not Found');
      setShowCrashPrompt(true);
    }, 2500);
  }, []);

  const handleCrashKeyPress = useCallback((e: KeyboardEvent, inputRef?: React.RefObject<HTMLInputElement | null>) => {
    if (isCrashScreen && showCrashPrompt) {
      setIsCrashScreen(false);
      setCrashText('');
      setShowCrashPrompt(false);
      restoreCharacterOpacity(disappearingChars);
      setTimeout(() => {
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [isCrashScreen, showCrashPrompt, disappearingChars]);

  useEffect(() => {
    if (isCrashScreen) {
      const handler = (e: KeyboardEvent) => handleCrashKeyPress(e, inputRef);
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [isCrashScreen, handleCrashKeyPress, inputRef]);

  return {
    isCrashScreen,
    setIsCrashScreen,
    crashText,
    setCrashText,
    showCrashPrompt,
    setShowCrashPrompt,
    disappearingChars,
    setDisappearingChars,
    triggerCrashEffect,
    handleCrashKeyPress
  };
};