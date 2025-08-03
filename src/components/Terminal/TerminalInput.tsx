'use client';

import { forwardRef } from 'react';

interface TerminalInputProps {
  currentInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isProcessing: boolean;
  isWaitingForEmail: boolean;
  isWaitingForMessage: boolean;
}

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>((
  { currentInput, onInputChange, onKeyDown, isProcessing, isWaitingForEmail, isWaitingForMessage },
  ref
) => {
  return (
    <div className="flex items-center relative" style={{ minWidth: 0 }}>
      <span className="text-green-300 mr-2 flex-shrink-0">
        {isWaitingForEmail ? 'Enter email:' : isWaitingForMessage ? 'Enter message:' : 'user@portfolio:~$'} 
      </span>
      <input
        ref={ref}
        type="text"
        value={currentInput}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        className="bg-transparent border-none outline-none text-green-400 font-mono flex-1 caret-green-400"
        style={{ minWidth: 0, maxWidth: '100%' }}
        disabled={isProcessing}
        autoComplete="off"
        spellCheck={false}
      />
      {isProcessing && (
        <span className="text-green-400 ml-2 animate-pulse flex-shrink-0">Processing...</span>
      )}
    </div>
  );
});

TerminalInput.displayName = 'TerminalInput';

export default TerminalInput;