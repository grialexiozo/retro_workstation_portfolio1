'use client';

import { TerminalLine } from '../../data/types';

interface TerminalOutputProps {
  lines: TerminalLine[];
}

const TerminalOutput = ({ lines }: TerminalOutputProps) => {
  return (
    <>
      {lines.map(line => (
        <div key={line.id} className={`${line.isCommand ? 'text-green-300' : 'text-green-400'}`} style={{ 
          overflow: 'hidden',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          maxWidth: '100%'
        }}>
          {line.content || '\u00A0'}
        </div>
      ))}
    </>
  );
};

export default TerminalOutput;