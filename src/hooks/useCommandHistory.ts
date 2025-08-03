import { useState, useCallback } from 'react';

export const useCommandHistory = (
  currentInput: string,
  setCurrentInput: (value: string) => void,
  executeCommand: (cmd: string) => void,
  isProcessing: boolean
) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim() && !isProcessing) {
      const cmd = currentInput.trim();
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
      executeCommand(cmd);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  }, [currentInput, isProcessing, executeCommand, setCurrentInput, commandHistory, historyIndex]);

  return {
    commandHistory,
    historyIndex,
    handleKeyDown
  };
};