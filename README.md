# Retro Terminal Portfolio

A retro-styled terminal portfolio website built with Next.js, featuring interactive terminal commands, CRT monitor effects, and nostalgic aesthetics.

## Features

- **Interactive Terminal Interface** - Navigate through portfolio content using terminal commands
- **Retro CRT Monitor Effects** - Authentic vintage monitor styling with scan lines and glow effects
- **Sound Effects** - Keyboard typing sounds and button press audio feedback
- **Matrix Rain Animation** - Background digital rain effect
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Modern Tech Stack** - Built with Next.js 15, React 19, and TypeScript

## Available Commands

- `ABOUT` - Personal bio and introduction
- `SKILLS` - Technical skills and proficiency levels
- `EXPERIENCE` - Work history and professional background
- `PRICING` - Service packages and pricing information
- `HIRE` - Contact form for project inquiries
- `HELP` - List all available commands

## Technologies Used

- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom CSS** - Retro CRT effects and animations

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── Monitor/        # Monitor frame and effects
│   └── Terminal/       # Terminal interface components
├── data/               # Static data and constants
├── hooks/              # Custom React hooks
├── styles/             # CSS modules and global styles
└── utils/              # Utility functions
```

## Customization

To customize this portfolio for your own use:

1. Update personal information in `src/data/commands.ts`
2. Replace audio files in `public/sound/` with your preferred sounds
3. Modify styling in `src/styles/` to match your aesthetic preferences
4. Update the terminal welcome message in `src/hooks/useTerminal.ts`

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Feel free to fork this project and make it your own! If you create something cool, I'd love to see it.
