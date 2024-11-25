'use client'

import { useState, useEffect } from 'react'

interface TypewriterEffectProps {
  text: string
  speed?: number
}

export default function TypewriterEffect({ text, speed = 30 }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  return (
    <div className="relative">
      {displayedText}
      {currentIndex < text.length && (
        <span className="ml-1 inline-block w-2 h-4 bg-current animate-pulse" />
      )}
    </div>
  )
} 