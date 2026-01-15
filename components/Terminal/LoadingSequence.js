import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './LoadingSequence.module.scss'

export default function LoadingSequence({ onComplete }) {
  const [mounted, setMounted] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState([])
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const bootContainerRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressFillRef = useRef(null)
  const progressTextRef = useRef(null)
  const checkmarkRef = useRef(null)
  const particlesRef = useRef([])
  const bootMessagesRefs = useRef([])
  const bootMessagesContainerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const tl = gsap.timeline()

    // Stage 1: Logo entrance with crazy effects (0-3s)
    tl.fromTo(logoRef.current,
      {
        scale: 0,
        rotation: -720,
        opacity: 0,
        filter: 'blur(20px)'
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'elastic.out(1, 0.3)',
      }
    )

    // Logo pulse and glitch effect
    tl.to(logoRef.current, {
      textShadow: '0 0 40px rgba(0, 255, 65, 1), 0 0 80px rgba(0, 255, 65, 0.8)',
      duration: 0.3,
      yoyo: true,
      repeat: 5,
    }, '-=0.8')

    // Glitch effect
    tl.to(logoRef.current, {
      x: () => gsap.utils.random(-5, 5),
      y: () => gsap.utils.random(-5, 5),
      duration: 0.05,
      repeat: 15,
      yoyo: true,
    }, '-=0.5')

    tl.to(logoRef.current, { x: 0, y: 0, duration: 0.1 })

    // Stage 2: Logo exit and boot sequence entrance (3-4s)
    tl.to(logoRef.current, {
      scale: 0,
      rotation: 720,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 0.7,
      ease: 'back.in(2)'
    })

    // Boot container entrance
    tl.fromTo(bootContainerRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotationY: -90,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.3'
    )

    // Boot messages appear with stagger (4-15s)
    // Add messages progressively to avoid pre-rendering scroll issue
    bootMessages.forEach((msg, index) => {
      tl.call(() => {
        setVisibleMessages(prev => [...prev, msg])
        // Scroll to bottom after adding message
        setTimeout(() => {
          if (bootMessagesContainerRef.current) {
            bootMessagesContainerRef.current.scrollTop = bootMessagesContainerRef.current.scrollHeight
          }
        }, 10)
      }, [], index * 0.12 + 3.5) // Start at 3.5s (after boot container appears)
    })

    // Progress bar entrance (15s)
    tl.fromTo(progressBarRef.current,
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '+=0.5'
    )

    // Progress fill animation with crazy effects (15-18s)
    tl.to(progressFillRef.current, {
      width: '100%',
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100)
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `Loading Terminal... ${progress}%`
        }
        // Pulse effect during loading
        gsap.to(progressBarRef.current, {
          boxShadow: `0 0 ${20 + progress * 0.3}px rgba(0, 255, 65, ${0.5 + progress * 0.005})`,
          duration: 0.1,
        })
      }
    })

    // Boot container exit with explosion effect (18s)
    tl.to(bootContainerRef.current, {
      scale: 2,
      opacity: 0,
      rotationY: 180,
      filter: 'blur(20px)',
      duration: 0.7,
      ease: 'power4.in',
    }, '-=0.3')

    // Checkmark entrance with bounce (18-19s)
    tl.fromTo(checkmarkRef.current,
      {
        scale: 0,
        rotation: -360,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.4)',
      }
    )

    // Checkmark pulse (19-20s)
    tl.to(checkmarkRef.current, {
      scale: 1.2,
      textShadow: '0 0 60px rgba(0, 255, 65, 1), 0 0 100px rgba(0, 255, 65, 0.8)',
      duration: 0.3,
      yoyo: true,
      repeat: 3,
    })

    // Final explosion exit (20s)
    tl.to(containerRef.current, {
      scale: 3,
      opacity: 0,
      filter: 'blur(50px)',
      duration: 1,
      ease: 'power4.in',
      onComplete: () => {
        setTimeout(onComplete, 100)
      }
    }, '+=0.4')

    // Particles animation (continuous)
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((particle, i) => {
        gsap.to(particle, {
          y: () => gsap.utils.random(-100, window.innerHeight + 100),
          x: () => gsap.utils.random(-50, 50),
          opacity: gsap.utils.random(0.3, 1),
          scale: gsap.utils.random(0.5, 2),
          rotation: gsap.utils.random(0, 360),
          duration: gsap.utils.random(2, 5),
          repeat: -1,
          ease: 'none',
          delay: i * 0.05,
        })
      })
    }

    return () => {
      tl.kill()
    }
  }, [mounted, onComplete])

  const bootMessages = [
    'Booting Daniel Baier System v4.5.1...',
    '',
    '[ OK ] Starting Daniel Baier Portfolio System',
    '[ OK ] Reached target Local File Systems',
    '[ OK ] Listening on Journal Socket',
    '[ OK ] Started Journal Service',
    '[ OK ] Started Remount Root and Kernel File Systems',
    '[ OK ] Started Apply Kernel Variables',
    '[ OK ] Started Create Static Device Nodes in /dev',
    '[ OK ] Reached target Local File Systems (Pre)',
    '[ OK ] Reached target Local File Systems',
    '[ OK ] Started Create Volatile Files and Directories',
    '[ OK ] Started Network Time Synchronization',
    '[ OK ] Reached target System Time Synchronized',
    '[ OK ] Started Update UTMP about System Boot',
    '[ OK ] Started Network Manager',
    '[ OK ] Reached target Network',
    '[ OK ] Started Network Manager Wait Online',
    '[ OK ] Reached target Network is Online',
    '[ OK ] Started 3D Graphics Engine',
    '[ OK ] Started WebGL Renderer Service',
    '[ OK ] Started Shader Compilation Service',
    '[ OK ] Started Physics Engine',
    '[ OK ] Started Particle System Manager',
    '[ OK ] Started Terminal Interface Service',
    '[ OK ] Started Command Parser Module',
    '[ OK ] Started Input Handler Service',
    '[ OK ] Started Animation Controller',
    '[ OK ] Started Transition Manager',
    '[ OK ] Started GSAP Timeline Service',
    '[ OK ] Started Matrix Mode Module',
    '[ OK ] Started Digital Rain Renderer',
    '[ OK ] Started Hacker Mode Service',
    '[ OK ] Started Portfolio Content Manager',
    '[ OK ] Started Skills Database',
    '[ OK ] Started Experience Timeline',
    '[ OK ] Started Contact Information Service',
    '[ OK ] Started Theme Manager',
    '[ OK ] Started Color Palette Service',
    '[ OK ] Started Typography Engine',
    '[ OK ] Started Responsive Layout Manager',
    '[ OK ] Started Performance Monitor',
    '[ OK ] Started Analytics Service',
    '[ OK ] Started Error Handler',
    '[ OK ] Started Security Manager',
    '[ OK ] Reached target Multi-User System',
    '[ OK ] Reached target Graphical Interface',
    '',
    'Daniel Baier Portfolio System v1.0 - Ready',
    'Type "help" for available commands',
    ''
  ]

  return (
    <div ref={containerRef} className={styles.loadingSequence}>
      {/* Logo Stage */}
      <div ref={logoRef} className={styles.logoContainer}>
        <div className={styles.logo}>DB</div>
        <div className={styles.logoText}>DANIEL BAIER</div>
      </div>

      {/* Boot Stage */}
      <div ref={bootContainerRef} className={styles.bootContainer}>
        <div className={styles.bootHeader}>
          <div className={styles.spinner}>⚡</div>
          <div className={styles.bootTitle}>SYSTEM INITIALIZATION</div>
        </div>

        <div ref={bootMessagesContainerRef} className={styles.bootMessages}>
          {visibleMessages.map((msg, index) => (
            <div
              key={index}
              ref={el => bootMessagesRefs.current[index] = el}
              className={styles.bootMessage}
            >
              {msg}
            </div>
          ))}
        </div>

        <div className={styles.progressContainer}>
          <div ref={progressTextRef} className={styles.progressLabel}>
            Loading Terminal... 0%
          </div>
          <div ref={progressBarRef} className={styles.progressBar}>
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
        </div>
      </div>

      {/* Checkmark Stage */}
      <div ref={checkmarkRef} className={styles.checkmarkContainer}>
        <div className={styles.checkmark}>✓</div>
        <div className={styles.completeText}>READY</div>
      </div>

      {/* Particles */}
      <div className={styles.particles}>
        {mounted && [...Array(100)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Matrix-style digital rain overlay */}
      <div className={styles.digitalRain}>
        {mounted && [...Array(30)].map((_, i) => (
          <div
            key={i}
            className={styles.rainColumn}
            style={{
              left: `${(i * 100) / 30}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${gsap.utils.random(1, 3)}s`
            }}
          >
            {String.fromCharCode(33 + Math.random() * 94)}
          </div>
        ))}
      </div>

      {/* Scanline effect */}
      <div className={styles.scanline} />
    </div>
  )
}
