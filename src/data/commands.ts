type TerminalCommands = {
  [key: string]: (...args: unknown[]) => string[];
};

export const terminalCommands: TerminalCommands = {
  ABOUT: () => [
    '👨‍💻 About Aleksandr Grigorjev',
    '',
    'Senior Coffee Consumer & Part-time App Developer',
    'Professional Debugger of Other People\'s Code',
    '',
    '🎯 Mission: Building apps that don\'t crash (most of the time)',
    '📍 Location: Somewhere between caffeine and code',
    '🎂 Age: Old enough to remember when phones had buttons',
    ''
  ],
  SKILLS: () => [
    '🛠️ Technical Skills & Confidence Levels:',
    '',
    'React Native: ████████░░ 85% (Pretty solid)',
    'Flutter: ███████░░░ 75% (Getting there)',
    'iOS Native: ██████░░░░ 65% (Swift learner)',
    'Android Native: ███████░░░ 70% (Kotlin convert)',
    'JavaScript: █████████░ 90% (My first love)',
    'TypeScript: ████████░░ 80% (Type safety advocate)',
    'Firebase: ███████░░░ 75% (Cloud enthusiast)',
    'Git: ██████░░░░ 60% (Still googling commands)',
    'Debugging: ██████████ 150% (Supernatural ability)',
    'Coffee Making: ██████████ 100% (Essential skill)',
    'Patience: ██░░░░░░░░ 12% (Work in progress)',
    ''
  ],
  EXPERIENCE: (...args: unknown[]) => {
    const triggerCrash = args[0] as (() => void) | undefined;
    if (triggerCrash) {
      setTimeout(() => {
        triggerCrash();
      }, 600);
    }
    return [];
  },
  PRICING: () => [
    '💰 Service prices:',
    '',
    '🔹 Quick Consultation',
    '   Price: 1 good coffee + interesting conversation',
    '   Duration: 30 minutes of wisdom',
    '',
    '🔸 Simple App (Todo, Weather, etc.)',
    '   Price: Your firstborn\'s college fund',
    '   Timeline: 2-4 weeks (depending on coffee supply)',
    '',
    '🔹 Complex App (Social, E-commerce, etc.)',
    '   Price: Your firstborn + naming rights',
    '   Timeline: 2-6 months (includes therapy sessions)',
    '',
    '🔸 "Make me the next TikTok"',
    '   Price: Your soul + 51% equity',
    '   Timeline: When pigs fly (but I\'ll try)',
    '',
    '💡 All packages include:',
    '• Unlimited "it\'s not a bug, it\'s a feature" explanations',
    '• Free existential crisis during deployment',
    '• Lifetime supply of dad jokes in code comments',
    ''
  ],
  HIRE: (...args: unknown[]) => {
    const setIsWaitingForEmail = args[1] as ((value: boolean) => void) | undefined;
    if (setIsWaitingForEmail) {
      setIsWaitingForEmail(true);
    }
    return [
      '📧 Ready to hire the best developer in the multiverse?',
      '',
      'Please enter your email address below:',
      ''
    ];
  },
  HELP: () => [
    '📋 Available Commands:',
    '',
    '🔹 ABOUT      - Personal bio',
    '🔹 SKILLS     - Technical skills',
    '🔹 EXPERIENCE - Work history',
    '🔹 PRICING    - Service prices',
    '🔹 HIRE       - Get in touch',
    '🔹 HELP       - List all available commands',
    '',
    '💡 Commands are case-insensitive',
    '⌨️  Use ↑↓ arrows for command history',
    ''
  ]
};