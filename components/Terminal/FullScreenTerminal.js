import { useState, useRef, useEffect } from 'react'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import styles from './FullScreenTerminal.module.scss'
import Background3D from './Background3D'
import MatrixRainOverlay from './MatrixRainOverlay'
import MatrixMode from './MatrixMode'

const MotionBox = motion.create(Box)

const ASCII_BANNER = `
    ____              _      __   ____        _
   / __ \\____ _____  (_)__  / /  / __ )____ _(_)__  _____
  / / / / __ \`/ __ \\/ / _ \\/ /  / __  / __ \`/ / _ \\/ ___/
 / /_/ / /_/ / / / / /  __/ /  / /_/ / /_/ / /  __/ /
/_____/\\__,_/_/ /_/_/\\___/_/  /_____/\\__,_/_/\\___/_/

`

const COMMANDS = {
  help: {
    description: 'Show available commands',
    execute: () => ({
      output: [
        '╔════════════════════════════════════════════════════════════╗',
        '║                    AVAILABLE COMMANDS                      ║',
        '╚════════════════════════════════════════════════════════════╝',
        '',
        '📋 Navigation:',
        '  home          - Return to home',
        '  about         - Learn about Daniel',
        '  skills        - Display technical skills',
        '  contact       - Get contact information',
        '  experience    - Show work experience',
        '',
        '🛠️  System:',
        '  help          - Show this help message',
        '  clear         - Clear terminal',
        '  whoami        - Display current user',
        '  date          - Show current date and time',
        '  ls            - List available files',
        '  echo [text]   - Echo text back',
        '',
        '🎮 Fun:',
        '  matrix        - Enter the Matrix',
        '  hack          - Try to hack the system',
        '  konami        - Classic gaming code',
        '  cat secret.txt - Access classified files',
        '',
        '💡 Tips:',
        '  - Use Tab for autocomplete',
        '  - Use ↑/↓ for command history',
        '  - Discover hidden commands!',
        ''
      ]
    })
  },
  home: {
    description: 'Go to homepage',
    navigate: '/'
  },
  about: {
    description: 'Information about Daniel',
    execute: () => ({
      output: [
        '',
        '╔═══════════════════════════════════════════════════════════════╗',
        '║                      DANIEL BAIER                             ║',
        '║                Full-Stack Web Developer                       ║',
        '╚═══════════════════════════════════════════════════════════════╝',
        '',
        '👨‍💻 PROFILE',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '> Full-stack Web Developer & Consultant',
        '> Specializing in modern web technologies',
        '> Cloud architecture and secure systems',
        '> Location: Switzerland 🇨🇭',
        '> Status: Available for projects ✓',
        '',
        '🎯 FOCUS AREAS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '• Building scalable web applications',
        '• Modern JavaScript ecosystems (React, Next.js)',
        '• Cloud infrastructure and DevOps',
        '• Performance optimization',
        '• Security best practices',
        '',
        '💬 "Code is like humor. When you have to explain it, it\'s bad."',
        '',
        'Type "skills" or "contact" to learn more!',
        ''
      ]
    })
  },
  skills: {
    description: 'Display technical skills',
    execute: () => ({
      output: [
        '',
        '⚡ TECHNICAL SKILLS MATRIX',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🎨 Frontend Development',
        '  ├─ React.js           ████████████████████░ 95%',
        '  ├─ Next.js            ███████████████████░░ 90%',
        '  ├─ TypeScript         ███████████████████░░ 90%',
        '  ├─ JavaScript (ES6+)  ████████████████████░ 95%',
        '  ├─ HTML5/CSS3/SCSS    ████████████████████░ 95%',
        '  └─ Chakra UI/Tailwind █████████████████░░░ 85%',
        '',
        '⚙️  Backend Development',
        '  ├─ Node.js            ███████████████████░░ 90%',
        '  ├─ Express.js         ███████████████████░░ 90%',
        '  ├─ REST APIs          ████████████████████░ 95%',
        '  ├─ GraphQL            ██████████████░░░░░░ 70%',
        '  └─ WebSockets         ████████████████░░░░ 80%',
        '',
        '☁️  Cloud & DevOps',
        '  ├─ Cloudflare         ███████████████████░░ 90%',
        '  ├─ Docker             ██████████████████░░ 85%',
        '  ├─ CI/CD              ██████████████████░░ 85%',
        '  ├─ Git/GitHub         ████████████████████░ 95%',
        '  └─ Linux/Bash         ███████████████████░░ 90%',
        '',
        '🗄️  Databases',
        '  ├─ PostgreSQL         ███████████████████░░ 90%',
        '  ├─ MongoDB            ██████████████████░░ 85%',
        '  ├─ Redis              ████████████████░░░░ 80%',
        '  └─ MySQL              ██████████████████░░ 85%',
        '',
        '🎯 Other Skills',
        '  ├─ Framer Motion      ███████████████████░░ 90%',
        '  ├─ Three.js           █████████████░░░░░░░ 65%',
        '  ├─ Testing (Jest)     ██████████████████░░ 85%',
        '  └─ Agile/Scrum        ███████████████████░░ 90%',
        '',
        '🏆 Overall Rating: ████████████████████░ Senior Level',
        ''
      ]
    })
  },
  contact: {
    description: 'Get contact information',
    execute: () => ({
      output: [
        '',
        '📧 CONTACT INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '📬 Email:',
        '   hello@devbaier.ch',
        '   (Response time: Usually within 24 hours)',
        '',
        '🔗 Professional Networks:',
        '   GitHub:    github.com/devbaier',
        '   LinkedIn:  linkedin.com/in/danielbaier',
        '   Twitter:   @devbaier',
        '',
        '💬 Available For:',
        '   ✓ Freelance projects',
        '   ✓ Consulting',
        '   ✓ Technical partnerships',
        '   ✓ Speaking engagements',
        '',
        '🌍 Location:',
        '   Switzerland 🇨🇭',
        '   (Remote work worldwide)',
        '',
        '⏰ Timezone:',
        '   CET/CEST (UTC+1/+2)',
        '',
        '📅 Let\'s build something amazing together!',
        ''
      ]
    })
  },
  experience: {
    description: 'Show work experience',
    execute: () => ({
      output: [
        '',
        '💼 PROFESSIONAL EXPERIENCE',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '2020 - Present │ FREELANCE FULL-STACK DEVELOPER',
        '                │ Self-Employed',
        '                │',
        '                ├─ Building scalable web applications for clients',
        '                ├─ Tech: React, Next.js, Node.js, Cloud platforms',
        '                ├─ 50+ successful projects delivered',
        '                └─ 100% client satisfaction rate',
        '',
        '2018 - 2020    │ SENIOR WEB DEVELOPER',
        '                │ TechCorp Solutions AG',
        '                │',
        '                ├─ Led team of 5 developers',
        '                ├─ Architected enterprise applications',
        '                ├─ Implemented CI/CD pipelines',
        '                └─ Improved performance by 300%',
        '',
        '2016 - 2018    │ FULL-STACK DEVELOPER',
        '                │ Digital Innovations GmbH',
        '                │',
        '                ├─ Developed client projects',
        '                ├─ Frontend and backend development',
        '                └─ Agile methodology implementation',
        '',
        '2014 - 2016    │ JUNIOR DEVELOPER',
        '                │ StartUp Labs',
        '                │',
        '                ├─ Learned modern web technologies',
        '                ├─ Contributed to multiple projects',
        '                └─ Rapid skill development',
        '',
        '📊 Career Stats:',
        '   ├─ Years of Experience: █████████░ 10+',
        '   ├─ Projects Completed:  █████████░ 100+',
        '   ├─ Technologies Mastered: 25+',
        '   └─ Coffee Consumed: ████████████████████ ∞',
        ''
      ]
    })
  },
  whoami: {
    description: 'Display current user',
    execute: () => ({
      output: [
        '',
        '👤 USER INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'Username:    visitor',
        'Role:        Guest',
        'Access Level: Public',
        'Session:     Active',
        'IP Address:  [REDACTED FOR PRIVACY]',
        '',
        'You are browsing as a guest. Welcome! 👋',
        ''
      ]
    })
  },
  date: {
    description: 'Show current date and time',
    execute: () => ({
      output: [
        '',
        '🕐 SYSTEM TIME',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        new Date().toString(),
        '',
        '✓ System time synchronized',
        ''
      ]
    })
  },
  clear: {
    description: 'Clear terminal',
    execute: () => ({ clear: true })
  },
  cls: {
    description: 'Clear terminal (alias)',
    execute: () => ({ clear: true })
  },
  ls: {
    description: 'List files',
    execute: () => ({
      output: [
        '',
        'drwxr-xr-x  10  visitor  staff   320  Jan 14 2026  .',
        'drwxr-xr-x   5  visitor  staff   160  Jan 14 2026  ..',
        '-rw-r--r--   1  visitor  staff  2048  Jan 14 2026  about.txt',
        '-rw-r--r--   1  visitor  staff  4096  Jan 14 2026  skills.txt',
        '-rw-r--r--   1  visitor  staff  3072  Jan 14 2026  projects.txt',
        '-rw-r--r--   1  visitor  staff  1024  Jan 14 2026  contact.txt',
        '-rw-------   1  visitor  staff   512  Jan 14 2026  secret.txt',
        '',
        '💡 Tip: Use command names to view file contents!',
        ''
      ]
    })
  },
  cat: {
    description: 'Read file contents',
    execute: (args) => {
      const file = args[0]
      if (file === 'secret.txt') {
        return {
          output: [
            '',
            '⚠️  ACCESS DENIED ⚠️',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '🔒 This file requires Level 9 clearance.',
            '',
            'Your current clearance level: 0',
            'Required clearance level: 9',
            '',
            '[ ACCESS VIOLATION LOGGED ]',
            '',
            'Nice try though! 😏',
            'Maybe try some other commands...',
            ''
          ],
          special: 'hack'
        }
      }
      return {
        output: [
          '',
          'cat: missing file operand',
          'Try: cat secret.txt',
          ''
        ]
      }
    }
  },
  echo: {
    description: 'Echo text',
    execute: (args) => ({
      output: ['', args.join(' ') || '', '']
    })
  },
  matrix: {
    description: 'Hidden command',
    execute: () => {
      const greetings = [
        'Welcome to the Matrix, digital wanderer...',
        'Greetings, curious mind...',
        'Hello there, code explorer...',
        'Welcome, seeker of knowledge...',
        'Greetings, mysterious visitor...',
        'Hello, brave soul...',
        'Welcome to the rabbit hole...',
        'Greetings, unknown traveler...'
      ]

      const users = [
        'Neo', 'Trinity', 'Morpheus', 'Cipher', 'Tank',
        'Dozer', 'Mouse', 'Apoc', 'Switch', 'Ghost',
        'Niobe', 'Link', 'Stranger', 'Visitor', 'User'
      ]

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
      const randomUser = users[Math.floor(Math.random() * users.length)]

      return {
        output: [
          '',
          '🟢 ENTERING THE MATRIX...',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '        ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗',
          '        ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝',
          '        ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ ',
          '        ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ ',
          '        ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗',
          '        ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝',
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '[ DECODING BINARY SEQUENCE ]',
          '',
          '  01010111 01100001 01101011 01100101 00100000',
          '  01110101 01110000 00101100 00100000' + randomUser.split('').map(c =>
            ' ' + c.charCodeAt(0).toString(2).padStart(8, '0')).join(''),
          '',
          '[ TRANSLATION IN PROGRESS... ]',
          '',
          `  > Wake up, ${randomUser}...`,
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          `💚 ${randomGreeting}`,
          '',
          '  The Matrix has you...',
          '  Follow the white rabbit. 🐰',
          '',
          '  Reality is merely an illusion,',
          '  albeit a very persistent one.',
          '  - Albert Einstein',
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '[ SYSTEM STATUS ]',
          `  User ID: ${randomUser.toUpperCase()}_${Math.floor(Math.random() * 9999)}`,
          '  Access Level: VISITOR',
          '  Matrix Version: 4.0',
          '  Connection: SECURE ✓',
          '',
          '🎉 Easter egg unlocked! The code flows through you...',
          ''
        ],
        special: 'matrix'
      }
    }
  },
  hack: {
    description: 'Hidden command',
    execute: () => ({
      output: [
        '',
        '⚠️  INITIATING HACK SEQUENCE...',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '[>] Scanning network...',
        '[>] Found target: devbaier.ch',
        '[>] Bypassing firewall...',
        '',
        '    [████████████████████] 100%',
        '',
        '[✓] Firewall bypassed',
        '[✓] Accessing mainframe...',
        '[✓] Root access granted',
        '[✓] Downloading secret files...',
        '[✓] Injecting payload...',
        '',
        '[ SYSTEM COMPROMISED ]',
        '',
        '😄 Just kidding! No actual hacking here.',
        'But I like your curiosity!',
        '',
        '🥚 Easter egg unlocked!',
        ''
      ],
      special: 'hack'
    })
  },
  konami: {
    description: 'The classic code',
    execute: () => ({
      output: [
        '',
        '🎮 KONAMI CODE ACTIVATED!',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '     ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ 🅰️',
        '',
        '✨ POWER-UPS UNLOCKED:',
        '',
        '  [✓] 30 Extra Lives',
        '  [✓] Unlimited Continue',
        '  [✓] God Mode Enabled',
        '  [✓] All Weapons Unlocked',
        '',
        '(Just kidding, but you found a classic!)',
        '',
        '🏆 Achievement Unlocked: Gaming Legend',
        ''
      ],
      special: 'matrix'
    })
  },
  sudo: {
    description: 'Hidden command',
    execute: (args) => {
      if (args.join(' ') === 'make me a sandwich') {
        return {
          output: [
            '',
            '🥪 SANDWICH GENERATOR v1.0',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '   [Preparing your sandwich...]',
            '',
            '        _____',
            '       /     \\',
            '      |  🥬🧀  |',
            '      |  🥓🍅  |',
            '      |  🥚🥓  |',
            '      |_______|',
            '',
            '✓ Sandwich ready!',
            'Enjoy your meal! 🍽️',
            '',
            'Type "help" for actual commands.',
            ''
          ]
        }
      }
      return {
        output: [
          '',
          'sudo: permission denied',
          '',
          'Nice try! But you\'re not root here. 😉',
          '',
          '💡 Hint: Try "sudo make me a sandwich"',
          ''
        ]
      }
    }
  }
}

export default function FullScreenTerminal() {
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: [
        ASCII_BANNER,
        '╔════════════════════════════════════════════════════════════╗',
        '║     Welcome to Daniel Baier Interactive Terminal 🚀       ║',
        '║               Secure connection established...             ║',
        '╚════════════════════════════════════════════════════════════╝',
        '',
        '🎯 SYSTEM STATUS: Online',
        '🔒 SECURITY: Encrypted',
        '🌐 NETWORK: Connected',
        '',
        'Type "help" to see available commands.',
        'Hint: Discover hidden features and easter eggs! 🔍',
        ''
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showMatrixMode, setShowMatrixMode] = useState(false)
  const [hackerMode, setHackerMode] = useState(false)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const [command, ...args] = trimmedCmd.toLowerCase().split(' ')

    setHistory(prev => [...prev, { type: 'input', content: trimmedCmd }])
    setCommandHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    if (COMMANDS[command]) {
      if (COMMANDS[command].navigate) {
        router.push(COMMANDS[command].navigate)
        return
      }

      // Special handling for matrix command to trigger full-screen mode
      if (command === 'matrix') {
        setShowMatrixMode(true)
        return
      }

      // Special handling for konami command to toggle hacker mode
      if (command === 'konami') {
        setHackerMode(!hackerMode)
        setTimeout(() => {
          setHistory(prev => [...prev, {
            type: 'output',
            content: !hackerMode ? [
              '',
              '🔴 HACKER MODE ACTIVATED!',
              '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
              '',
              '     ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ 🅰️',
              '',
              '🔥 SYSTEM BREACH:',
              '',
              '  [✓] Firewall Disabled',
              '  [✓] Root Access Granted',
              '  [✓] Anonymous Mode: ON',
              '  [✓] Red Theme Activated',
              '',
              '⚠️  Warning: You are now in hacker mode!',
              '   Type "konami" again to return to normal mode.',
              '',
              '🏴‍☠️ New commands available: exploit, decrypt, backdoor',
              ''
            ] : [
              '',
              '✅ NORMAL MODE RESTORED',
              '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
              '',
              '  [✓] Security Systems: ONLINE',
              '  [✓] Standard Theme: ACTIVE',
              '  [✓] All Systems: NORMAL',
              '',
              '  Welcome back to normal mode!',
              ''
            ],
            special: !hackerMode ? 'hack' : ''
          }])
        }, 100)
        return
      }

      const result = COMMANDS[command].execute(args)

      if (result.clear) {
        setHistory([])
      } else {
        setTimeout(() => {
          setHistory(prev => [...prev, {
            type: 'output',
            content: result.output,
            special: result.special
          }])
        }, 100)
      }
    } else if (hackerMode && ['exploit', 'decrypt', 'backdoor'].includes(command)) {
      // Hacker mode exclusive commands
      const hackerCommands = {
        exploit: [
          '',
          '🔴 EXPLOITING SYSTEM VULNERABILITIES...',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '[>] Scanning for open ports...',
          '[>] Found vulnerability: CVE-2024-FAKE',
          '[>] Injecting payload...',
          '',
          '    [████████████████████] 100%',
          '',
          '[✓] Exploit successful!',
          '[✓] System access: GRANTED',
          '',
          '⚠️  Just kidding! This is a safe demo. 😄',
          ''
        ],
        decrypt: [
          '',
          '🔴 DECRYPTION SEQUENCE INITIATED...',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '[>] Analyzing encryption algorithm...',
          '[>] Brute forcing AES-256...',
          '[>] Cracking hash: SHA-512',
          '',
          '    01101000 01100001 01100011 01101011 01100101 01110010',
          '',
          '[✓] Decryption complete!',
          '[✓] Message: "Welcome to hacker mode!"',
          '',
          '💀 All your base are belong to us!',
          ''
        ],
        backdoor: [
          '',
          '🔴 INSTALLING BACKDOOR ACCESS...',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '[>] Creating hidden admin user...',
          '[>] Modifying system files...',
          '[>] Establishing remote connection...',
          '',
          '    [████████████████████] 100%',
          '',
          '[✓] Backdoor installed successfully!',
          '[✓] Remote access: ENABLED',
          '[✓] Port 31337 open',
          '',
          '🏴‍☠️ System compromised! (Not really though...)',
          ''
        ]
      }

      setTimeout(() => {
        setHistory(prev => [...prev, {
          type: 'output',
          content: hackerCommands[command],
          special: 'hack'
        }])
      }, 100)
    } else {
      setTimeout(() => {
        setHistory(prev => [...prev, {
          type: 'error',
          content: [
            '',
            `⚠️  Command not found: ${command}`,
            '',
            'Type "help" for available commands.',
            'Tip: Maybe it\'s a hidden command? 🤔',
            ''
          ]
        }])
      }, 100)
    }

    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
        if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (input) {
        const matchingCommands = Object.keys(COMMANDS).filter(cmd =>
          cmd.startsWith(input.toLowerCase())
        )
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0])
        } else if (matchingCommands.length > 1) {
          setHistory(prev => [...prev, {
            type: 'output',
            content: ['', 'Possible commands:', ...matchingCommands.map(cmd => `  ${cmd}`), '']
          }])
        }
      }
    }
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <Background3D />
      <MatrixRainOverlay />
      {showMatrixMode && (
        <MatrixMode onComplete={() => setShowMatrixMode(false)} />
      )}
      <MotionBox
        className={`${styles.fullscreenTerminal} ${hackerMode ? styles.hackerMode : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={handleTerminalClick}
      >
        <VStack
          ref={terminalRef}
          className={styles.terminalBody}
          align="stretch"
          spacing={1}
        >
          <AnimatePresence>
            {history.map((entry, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {entry.type === 'input' && (
                  <Text className={styles.inputLine}>
                    <span className={styles.prompt}>visitor@devbaier:~$</span> {entry.content}
                  </Text>
                )}
                {entry.type === 'output' && (
                  <Box className={`${styles.output} ${entry.special ? styles[entry.special] : ''}`}>
                    {entry.content.map((line, i) => (
                      <Text key={i} className={styles.outputLine}>{line}</Text>
                    ))}
                  </Box>
                )}
                {entry.type === 'error' && (
                  <Box className={styles.error}>
                    {entry.content.map((line, i) => (
                      <Text key={i} className={styles.errorLine}>{line}</Text>
                    ))}
                  </Box>
                )}
              </MotionBox>
            ))}
          </AnimatePresence>

          <Box className={styles.inputContainer}>
            <Text as="span" className={styles.prompt}>visitor@devbaier:~$</Text>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              variant="unstyled"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </Box>
        </VStack>
      </MotionBox>
    </>
  )
}
