'use client';

import { useEffect, useRef } from 'react';
import MatrixRain from './MatrixRain';
import MonitorFrame from './MonitorFrame';
import TerminalOutput from './Terminal/TerminalOutput';
import TerminalInput from './Terminal/TerminalInput';
import CrashScreen from './Terminal/CrashScreen';
import { useTerminal } from '../hooks/useTerminal';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useCrashEffect } from '../hooks/useCrashEffect';
import { useCRTEffects } from '../hooks/useCRTEffects';
import { focusInput, smartScroll } from '../utils/domHelpers';

const Terminal = () => {
  const {
    lines,
    isProcessing,
    isWaitingForEmail,
    isWaitingForMessage,
    currentInput,
    setCurrentInput,
    handleInputChange,
    executeCommand,
    lastCommandLineCount,
    isNewCommand
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const {
    isCrashScreen,
    setIsCrashScreen,
    crashText,
    showCrashPrompt,
    handleCrashKeyPress,
    triggerCrashEffect
  } = useCrashEffect(inputRef);

  const executeCommandWithCrash = (cmd: string) => {
    const crashTrigger = () => {
      setIsCrashScreen(true);
      if (terminalRef.current) {
        triggerCrashEffect(terminalRef);
      }
    };
    executeCommand(cmd, crashTrigger);
  };

  const {
    handleKeyDown
  } = useCommandHistory(currentInput, setCurrentInput, executeCommandWithCrash, isProcessing);

  const {
    applyCurvatureToInput
  } = useCRTEffects();

  const handleInputChangeWithCurvature = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setTimeout(() => {
      applyCurvatureToInput(e.target);
    }, 0);
  };

  const handleKeyDownWrapper = (e: React.KeyboardEvent) => {
    if (isCrashScreen) {
      handleCrashKeyPress(e.nativeEvent);
      return;
    }
    handleKeyDown(e);
  };







  useEffect(() => {
    if (inputRef.current) {
      focusInput(inputRef.current);
      applyCurvatureToInput(inputRef.current);
    }
  }, [lines, applyCurvatureToInput]);

  useEffect(() => {
    if (inputRef.current) {
      applyCurvatureToInput(inputRef.current);
    }
  }, [currentInput, applyCurvatureToInput]);

  useEffect(() => {
    if (terminalRef.current) {
      smartScroll(terminalRef.current, lastCommandLineCount, isNewCommand);
    }
  }, [lines, lastCommandLineCount, isNewCommand]);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        focusInput(inputRef.current);
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleMonitorTurnOn = () => {
    if (inputRef.current) {
      focusInput(inputRef.current);
    }
  };

  return (
    <MonitorFrame onMonitorTurnOn={handleMonitorTurnOn}>
      <div className="relative h-full flex bg-black">
        <MatrixRain />
        <div className="flex-1 flex flex-col" style={{ padding: '5px 9px', minWidth: 0 }}>
          <div 
            ref={terminalRef}
            className={`relative flex-1 ${!isCrashScreen ? 'overflow-y-auto' : 'overflow-hidden'} terminal-scrollbar crt-curvature`}
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
          >
            <TerminalOutput lines={lines} />
            {!isCrashScreen && (
              <TerminalInput
                ref={inputRef}
                currentInput={currentInput}
                onInputChange={handleInputChangeWithCurvature}
                onKeyDown={handleKeyDownWrapper}
                isProcessing={isProcessing}
                isWaitingForEmail={isWaitingForEmail}
                isWaitingForMessage={isWaitingForMessage}
              />
            )}
          </div>
        </div>
        {isCrashScreen && (
          <CrashScreen crashText={crashText} showCrashPrompt={showCrashPrompt} />
        )}
      </div>
    </MonitorFrame>
  );
};

export default Terminal;