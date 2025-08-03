export interface TerminalLine {
  id: number;
  content: string;
  isCommand?: boolean;
}

export interface MatrixChar {
  id: number;
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

export interface MonitorFrameProps {
  children: React.ReactNode;
  onMonitorTurnOn?: () => void;
}

export interface RainDrop {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
}