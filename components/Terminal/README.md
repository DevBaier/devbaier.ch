# Hacker Terminal Component

An interactive terminal interface for your portfolio website with a hacker aesthetic and discoverable commands.

## Features

### Core Functionality
- **Interactive Command Line**: Real terminal-like experience
- **Command History**: Use ↑/↓ arrows to navigate through previous commands
- **Tab Completion**: Press Tab to autocomplete commands
- **Animated Output**: Smooth fade-in animations for command results
- **Auto-scroll**: Terminal automatically scrolls to show new output

### Visual Design
- Matrix-inspired green-on-black color scheme
- Glowing neon effects
- macOS-style terminal header with traffic light buttons
- Custom scrollbar styling
- Responsive design for mobile devices

### Available Commands

#### Standard Commands
- `help` - Display all available commands
- `about` - Information about Daniel
- `skills` - Technical skills overview
- `projects` - Portfolio projects list
- `contact` - Contact information
- `experience` - Work experience timeline
- `clear` / `cls` - Clear terminal screen
- `whoami` - Display current user
- `date` - Show current date and time
- `ls` - List available "files"
- `echo [text]` - Echo back text
- `cat [file]` - Read file contents

#### Easter Eggs & Hidden Commands
- `matrix` - Enter the Matrix 🟢
- `hack` - Initiate "hack sequence" ⚠️
- `konami` - Classic Konami code reference 🎮
- `sudo make me a sandwich` - XKCD reference 🥪
- `cat secret.txt` - Try to access classified files 🔒

## Technical Details

### Technologies Used
- React (Hooks)
- Chakra UI
- Framer Motion (for animations)
- SCSS Modules

### Key Features
- **Command Parser**: Splits input into command and arguments
- **Command History**: Stores all executed commands for navigation
- **Special Effects**: Different visual effects for special commands
- **Mobile Responsive**: Adapts to different screen sizes

## Customization

### Adding New Commands
Edit `Terminal.js` and add to the `COMMANDS` object:

```javascript
commandName: {
  description: 'What it does',
  execute: (args) => ({
    output: ['Line 1', 'Line 2'],
    special: 'matrix' // Optional: for special effects
  })
}
```

### Special Effect Types
- `matrix` - Green glow effect
- `hack` - Red flicker effect

### Styling
Modify `Terminal.module.scss` to customize:
- Colors (change `#00ff41` for different terminal colors)
- Fonts
- Animations
- Responsive breakpoints

## Tips for Users

Encourage visitors to:
1. Type `help` to start
2. Try Unix-like commands (`ls`, `cat`, `whoami`)
3. Discover hidden commands
4. Use Tab for autocomplete
5. Use ↑/↓ for command history

## Future Enhancements Ideas

- [ ] Sound effects on typing
- [ ] More elaborate animations
- [ ] Command aliases
- [ ] Multi-line output with typing effect
- [ ] Draggable/resizable terminal window
- [ ] Multiple terminal tabs
- [ ] Save/export session history
- [ ] Theme switching (amber, green, etc.)
