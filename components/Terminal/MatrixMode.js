import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MatrixMode.module.scss'

export default function MatrixMode({ onComplete }) {
  const canvasRef = useRef(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const messages = [
    {
      main: 'DANIEL BAIER',
      sub: 'Web Developer',
      quote: 'Crafting digital solutions with precision and passion',
      delay: 1000
    },
    {
      main: 'CORE SKILLS',
      sub: 'HTML5 • CSS3 • PHP • MySQL',
      quote: 'Building robust web applications from the ground up',
      delay: 6000
    },
    {
      main: 'FRAMEWORKS',
      sub: 'Laravel • Vue.js • Git',
      quote: 'Modern tools for modern challenges',
      delay: 12000
    },
    {
      main: 'EXPERIENCE',
      sub: 'Alltitude SA • Digicomp Academy • Ioware',
      quote: '10+ years of professional web development',
      delay: 18000
    },
    {
      main: 'LANGUAGES',
      sub: 'Deutsch • Français • English',
      quote: 'Multilingual communication for global projects',
      delay: 24000
    },
    {
      main: 'BASED IN CH 🇨🇭',
      sub: 'Ch. des Lilas 2, Lausanne',
      quote: 'Swiss quality, worldwide delivery',
      delay: 30000
    },
    {
      main: 'READY TO COLLABORATE',
      sub: 'From concept to deployment',
      quote: 'Let\'s build something amazing together',
      delay: 36000
    },
    {
      main: 'GET IN TOUCH',
      sub: 'daniel@baier.ch',
      quote: 'Available for freelance projects and consultations 💚',
      delay: 42000
    }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Matrix characters (including Cyrillic for authentic look)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ:・."=*+-<>¦｜АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'

    const fontSize = 16
    const columns = canvas.width / fontSize

    // Each column has multiple drops
    const drops = []
    const dropSpeeds = []
    const dropLengths = []
    const dropBrightness = []

    // Initialize multiple drops per column for density
    for (let i = 0; i < columns; i++) {
      drops[i] = []
      dropSpeeds[i] = []
      dropLengths[i] = []
      dropBrightness[i] = []

      // 2-4 drops per column
      const numDrops = 2 + Math.floor(Math.random() * 3)
      for (let j = 0; j < numDrops; j++) {
        drops[i][j] = Math.random() * -canvas.height
        dropSpeeds[i][j] = 0.5 + Math.random() * 1.5
        dropLengths[i][j] = 10 + Math.random() * 30
        dropBrightness[i][j] = Math.random()
      }
    }

    let animationId
    let frame = 0

    const draw = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frame++

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < drops[i].length; j++) {
          // Different shades of green for depth
          const brightness = dropBrightness[i][j]

          // Draw the tail/trail
          for (let k = 0; k < dropLengths[i][j]; k++) {
            const y = (drops[i][j] - k) * fontSize
            if (y < 0) continue

            // Fade from bright green (head) to dark (tail)
            const fade = 1 - (k / dropLengths[i][j])
            const alpha = fade * brightness

            // Bright white/green at the head
            if (k === 0) {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
            } else if (k < 3) {
              ctx.fillStyle = `rgba(200, 255, 200, ${alpha})`
            } else {
              ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.8})`
            }

            const text = characters[Math.floor(Math.random() * characters.length)]
            const x = i * fontSize

            // Add slight horizontal offset for 3D effect
            const offset = Math.sin(frame * 0.01 + y * 0.01) * 2

            ctx.font = `${fontSize}px monospace`
            ctx.fillText(text, x + offset, y)
          }

          // Move drop down
          drops[i][j] += dropSpeeds[i][j]

          // Reset drop when it goes off screen
          if (drops[i][j] * fontSize > canvas.height + dropLengths[i][j] * fontSize) {
            drops[i][j] = -dropLengths[i][j]
            dropSpeeds[i][j] = 0.5 + Math.random() * 1.5
            dropLengths[i][j] = 10 + Math.random() * 30
            dropBrightness[i][j] = 0.3 + Math.random() * 0.7
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Progressive message system
  useEffect(() => {
    const timeouts = []

    messages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setCurrentMessageIndex(index)
      }, message.delay)
      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return (
    <motion.div
      className={styles.matrixMode}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onComplete}
    >
      <canvas ref={canvasRef} className={styles.canvas} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          className={styles.messageContainer}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateX: -90,
            z: -1000
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            z: 0
          }}
          exit={{
            opacity: 0,
            scale: 1.5,
            rotateX: 90,
            z: 1000
          }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.div
            className={styles.matrixText}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              textShadow: [
                '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)',
                '0 0 40px rgba(0, 255, 65, 1), 0 0 80px rgba(0, 255, 65, 0.5)',
                '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)'
              ]
            }}
            transition={{
              scale: { duration: 0.8, type: "spring", stiffness: 200 },
              rotate: { duration: 0.8, type: "spring", stiffness: 100 },
              textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {messages[currentMessageIndex].main}
          </motion.div>

          <motion.div
            className={styles.subText}
            initial={{ opacity: 0, x: -100, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            {messages[currentMessageIndex].sub}
          </motion.div>

          <motion.div
            className={styles.quote}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              type: "spring",
              stiffness: 150
            }}
          >
            {messages[currentMessageIndex].quote}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.clickHint}>
        Click anywhere to return...
      </div>
    </motion.div>
  )
}
