import { useState, useEffect } from 'react'

export default function useTypingEffect(text, speed = 30, startTyping = true) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(startTyping)

  useEffect(() => {
    if (!startTyping) {
      setDisplayedText(text)
      setIsTyping(false)
      return
    }

    setIsTyping(true)
    setDisplayedText('')
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, startTyping])

  return { displayedText, isTyping }
}
