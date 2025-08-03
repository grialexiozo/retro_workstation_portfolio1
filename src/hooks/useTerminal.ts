import { useState, useRef, useCallback } from 'react';
import { terminalCommands } from '../data/commands';

interface TerminalLine {
  id: number;
  content: string;
  isCommand?: boolean;
}

export const useTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, content: 'Welcome to Alex\'s Portfolio Terminal v2.0.1' },
    { id: 1, content: 'Type HELP to see available commands or just start exploring!' },
    { id: 2, content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWaitingForEmail, setIsWaitingForEmail] = useState(false);
  const [isWaitingForMessage, setIsWaitingForMessage] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [lastCommandLineCount, setLastCommandLineCount] = useState(0);
  const [isNewCommand, setIsNewCommand] = useState(false);
  const lineIdRef = useRef(3);



  const executeCommand = useCallback((cmd: string, triggerCrash?: () => void) => {
    if (isWaitingForEmail) {
      const email = cmd;
      setUserEmail(email);
      setIsWaitingForEmail(false);
      setIsWaitingForMessage(true);
      
      const newLines: TerminalLine[] = [
        { id: lineIdRef.current++, content: `Email: ${email}`, isCommand: true },
        { id: lineIdRef.current++, content: '📧 Email received!' },
        { id: lineIdRef.current++, content: '' },
        { id: lineIdRef.current++, content: 'Now, please tell me about your project or request:' },
        { id: lineIdRef.current++, content: '' }
      ];
      
      setLastCommandLineCount(newLines.length);
      setLines(prev => [...prev, ...newLines]);
      return;
    }
    
    if (isWaitingForMessage) {
      const message = cmd;
      setIsWaitingForMessage(false);
      
      const newLines: TerminalLine[] = [
        { id: lineIdRef.current++, content: `Message: ${message}`, isCommand: true },
        { id: lineIdRef.current++, content: '💬 Project details received!' },
        { id: lineIdRef.current++, content: '' },
        { id: lineIdRef.current++, content: `📧 Email: ${userEmail}` },
        { id: lineIdRef.current++, content: `💼 Project: ${message}` },
        { id: lineIdRef.current++, content: '' },
        { id: lineIdRef.current++, content: '✅ I will contact you faster than you can say "React Native"' },
        { id: lineIdRef.current++, content: '⏰ Expected response time: 24 hours (or 3 coffees, whichever comes first)' },
        { id: lineIdRef.current++, content: '' },
        { id: lineIdRef.current++, content: 'In the meantime, feel free to explore more commands!' },
        { id: lineIdRef.current++, content: '' }
      ];
      
      setLastCommandLineCount(newLines.length);
      setLines(prev => [...prev, ...newLines]);
      setUserEmail('');
      return;
    }

    const upperCmd = cmd.toUpperCase().trim();
    setIsProcessing(true);
    setIsNewCommand(true);
    
    setTimeout(() => {
      const newLines: TerminalLine[] = [
        { id: lineIdRef.current++, content: `user@portfolio:~$ ${cmd}`, isCommand: true }
      ];
      
      if (terminalCommands[upperCmd]) {
        const result = terminalCommands[upperCmd](triggerCrash, setIsWaitingForEmail);
        if (Array.isArray(result)) {
          result.forEach(line => {
            newLines.push({ id: lineIdRef.current++, content: line });
          });
        }
      } else {
        const errorMessages = [
          `Command '${cmd}' not found. Did you mean to order coffee instead?`,
          `'${cmd}' is not a valid command. Try HELP, or just mash the keyboard like the rest of us.`,
          `Unknown command '${cmd}'. Even Google doesn't know what you meant.`,
          `'${cmd}' command not recognized. Have you tried turning it off and on again?`
        ];
        newLines.push({ 
          id: lineIdRef.current++, 
          content: errorMessages[Math.floor(Math.random() * errorMessages.length)] 
        });
        newLines.push({ id: lineIdRef.current++, content: '' });
      }
      
      setLastCommandLineCount(newLines.length);
      setLines(prev => [...prev, ...newLines]);
      setIsProcessing(false);
      setTimeout(() => setIsNewCommand(false), 100);
    }, 500);
  }, [isWaitingForEmail, isWaitingForMessage, userEmail]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  }, []);

  return {
    lines,
    setLines,
    lineIdRef,
    currentInput,
    setCurrentInput,
    isProcessing,
    setIsProcessing,
    isWaitingForEmail,
    setIsWaitingForEmail,
    isWaitingForMessage,
    setIsWaitingForMessage,
    userEmail,
    setUserEmail,
    lastCommandLineCount,
    isNewCommand,
    executeCommand,
    handleInputChange
  };
};