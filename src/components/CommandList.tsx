'use client';

const CommandList = () => {

  const commands = [
    { cmd: 'ABOUT', desc: 'Personal bio' },
    { cmd: 'SKILLS', desc: 'Technical skills' },
    { cmd: 'EXPERIENCE', desc: 'Work history' },
    { cmd: 'PRICING', desc: 'Service prices' },
    { cmd: 'HIRE', desc: 'Get in touch about your project' },
    { cmd: 'HELP', desc: 'List all available commands' }
  ];

  return (
    <div className="w-64 bg-black bg-opacity-95 border-l border-green-600 p-4 font-mono text-sm flex-shrink-0">
        <h3 className="text-green-300 font-bold mb-3 text-center border-b border-green-600 pb-2">
          AVAILABLE COMMANDS
        </h3>
        
        <div className="space-y-2">
          {commands.map((command, index) => (
            <div key={index} className="flex justify-between items-center group hover:bg-green-900 hover:bg-opacity-20 px-2 py-1 rounded transition-colors">
              <span className="text-green-400 font-bold">{command.cmd}</span>
              <span className="text-green-500 text-xs ml-2 opacity-70 group-hover:opacity-100">
                {command.desc}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-green-600 text-center">
          <div className="text-green-500 text-xs opacity-70">
            💡 Tip: Commands are case-insensitive
          </div>
          <div className="text-green-500 text-xs opacity-70 mt-1">
            ↑↓ arrows for command history
          </div>
        </div>
    </div>
  );
};

export default CommandList;