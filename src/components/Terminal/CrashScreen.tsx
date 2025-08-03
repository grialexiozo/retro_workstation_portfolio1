'use client';

interface CrashScreenProps {
  crashText: string;
  showCrashPrompt: boolean;
}

const CrashScreen = ({ crashText, showCrashPrompt }: CrashScreenProps) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-green-400 font-mono bg-black" style={{ paddingLeft: '20px' }}>
      {crashText && (
        <div className="glitch-wrapper">
          <div className="glitch" data-glitch={crashText}>
            {crashText}
          </div>
        </div>
      )}
      {showCrashPrompt && (
        <div className="mt-4 text-green-300 animate-pulse">
          Press any key to continue
        </div>
      )}
    </div>
  );
};

export default CrashScreen;