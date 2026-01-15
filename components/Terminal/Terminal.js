import { useState, useRef, useEffect } from 'react'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Terminal.module.scss'

const MotionBox = motion.create(Box)

const COMMANDS = {
  help: {
    description: 'Show available commands',
    execute: () => ({
      output: [
        'Available commands:',
        '  help          - Show this help message',
        '  about         - Learn about Daniel',
        '  skills        - Display technical skills',
        '  projects      - List portfolio projects',
        '  contact       - Get contact information',
        '  experience    - Show work experience',
        '  clear         - Clear terminal',
        '  whoami        - Display current user',
        '  date          - Show current date and time',
        '  matrix        - ???',
        '  hack          - Try it ;)',
        '  konami        - The classic code',
        '',
        'Tip: Type commands to discover hidden features!'
      ]
    })
  },
  about: {
    description: 'Information about Daniel',
    execute: () => ({
      output: [
        '╔════════════════════════════════════════╗',
        '║         DANIEL BAIER - PROFILE         ║',
        '╚════════════════════════════════════════╝',
        '',
        '> Full-stack Web Developer & Consultant',
        '> Location: [CLASSIFIED]',
        '> Status: Available for projects',
        '',
        'Specializing in modern web technologies,',
        'cloud architecture, and secure systems.',
        '',
        'Type "skills" or "projects" for more info.'
      ]
    })
  },
  skills: {
    description: 'Display technical skills',
    execute: () => ({
      output: [
        '⚡ TECHNICAL SKILLS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🔹 Frontend:',
        '  React, Next.js, TypeScript, Chakra UI',
        '',
        '🔹 Backend:',
        '  Node.js, Express, REST APIs',
        '',
        '🔹 Cloud & DevOps:',
        '  Cloudflare, Docker, CI/CD',
        '',
        '🔹 Database:',
        '  PostgreSQL, MongoDB, Redis',
        '',
        'Skill level: █████████░ 90%'
      ]
    })
  },
  projects: {
    description: 'List portfolio projects',
    execute: () => ({
      output: [
        '📁 PROJECTS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '[1] Enterprise Dashboard',
        '    Tech: Next.js, TypeScript, Chakra UI',
        '    Status: ✓ Deployed',
        '',
        '[2] E-Commerce Platform',
        '    Tech: React, Node.js, PostgreSQL',
        '    Status: ✓ Live',
        '',
        '[3] Real-time Chat Application',
        '    Tech: WebSocket, Redis, React',
        '    Status: ✓ Production',
        '',
        'Type "contact" to discuss your project!'
      ]
    })
  },
  contact: {
    description: 'Get contact information',
    execute: () => ({
      output: [
        '📧 CONTACT INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'Email: hello@devbaier.ch',
        'GitHub: github.com/devbaier',
        'LinkedIn: linkedin.com/in/danielbaier',
        '',
        'Feel free to reach out for collaborations!'
      ]
    })
  },
  experience: {
    description: 'Show work experience',
    execute: () => ({
      output: [
        '💼 WORK EXPERIENCE',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '2020 - Present',
        '├─ Freelance Full-stack Developer',
        '└─ Building scalable web applications',
        '',
        '2018 - 2020',
        '├─ Senior Developer at TechCorp',
        '└─ Led team of 5 developers',
        '',
        'Years of coding: █████████░ 8+',
      ]
    })
  },
  whoami: {
    description: 'Display current user',
    execute: () => ({
      output: ['visitor', '', 'You are browsing as a guest. Welcome! 👋']
    })
  },
  date: {
    description: 'Show current date and time',
    execute: () => ({
      output: [new Date().toString(), '', 'System time synchronized ✓']
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
  matrix: {
    description: 'Hidden command',
    execute: () => ({
      output: [
        '',
        '🟢 Entering the Matrix...',
        '',
        '01001000 01100101 01101100 01101100 01101111',
        '01010111 01101111 01110010 01101100 01100100',
        '',
        'Translation: "HelloWorld"',
        '',
        'Wake up, Neo... 🎉',
        'The Matrix has you...'
      ],
      special: 'matrix'
    })
  },
  hack: {
    description: 'Hidden command',
    execute: () => ({
      output: [
        '',
        '⚠️  INITIATING HACK SEQUENCE...',
        '',
        '[████████████████████] 100%',
        '',
        '✓ Bypassing firewall...',
        '✓ Accessing mainframe...',
        '✓ Downloading data...',
        '✓ Injecting payload...',
        '',
        '😄 Just kidding! No actual hacking here.',
        'But I like your curiosity!',
        '',
        'Easter egg unlocked! 🥚'
      ],
      special: 'hack'
    })
  },
  konami: {
    description: 'The classic code',
    execute: () => ({
      output: [
        '',
        '⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ 🅰️',
        '',
        '🎮 KONAMI CODE ACTIVATED! 🎮',
        '',
        'You unlocked: 30 extra lives!',
        '(Just kidding, but you found a classic!)',
        '',
        '🏆 Achievement Unlocked: Gaming Legend'
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
            '🥪 Here\'s your sandwich!',
            '',
            '   _____',
            '  /     \\',
            ' |  🥬🧀  |',
            ' |  🥓🍅  |',
            ' |_______|',
            '',
            'Enjoy! Type "help" for real commands.'
          ]
        }
      }
      return {
        output: [
          'Nice try! But you\'re not root here. 😉',
          '',
          'Hint: Try "sudo make me a sandwich"'
        ]
      }
    }
  },
  ls: {
    description: 'List files',
    execute: () => ({
      output: [
        'drwxr-xr-x  about.txt',
        'drwxr-xr-x  skills.txt',
        'drwxr-xr-x  projects.txt',
        'drwxr-xr-x  contact.txt',
        'drwxr-xr-x  secret.txt',
        '',
        'Use command names to "read" these files!'
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
            '🔒 ACCESS DENIED',
            '',
            'This file requires Level 9 clearance.',
            'Your current level: 0',
            '',
            'Nice try though! 😏'
          ],
          special: 'hack'
        }
      }
      return {
        output: ['cat: missing file operand', 'Try: cat secret.txt']
      }
    }
  },
  echo: {
    description: 'Echo text',
    execute: (args) => ({
      output: [args.join(' ') || '']
    })
  }
}

export default function Terminal() {
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: [
        '╔════════════════════════════════════════════════════════════╗',
        '║  Welcome to DEVBAIER Terminal v1.0                         ║',
        '║  Secure connection established...                          ║',
        '╚════════════════════════════════════════════════════════════╝',
        '',
        'Type "help" to see available commands.',
        'Hint: Try to discover hidden commands! 🔍',
        ''
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

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
    } else {
      setTimeout(() => {
        setHistory(prev => [...prev, {
          type: 'error',
          content: [`Command not found: ${command}`, 'Type "help" for available commands.']
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
        }
      }
    }
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  return (
    <MotionBox
      className={styles.terminal}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleTerminalClick}
    >
      <Box className={styles.terminalHeader}>
        <Box className={styles.buttons}>
          <span className={styles.close}></span>
          <span className={styles.minimize}></span>
          <span className={styles.maximize}></span>
        </Box>
        <Text className={styles.title}>terminal@devbaier:~</Text>
      </Box>

      <VStack
        ref={terminalRef}
        className={styles.terminalBody}
        align="stretch"
        spacing={2}
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
                    <Text key={i} className={styles.errorLine}>⚠️  {line}</Text>
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
  )
}
