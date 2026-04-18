import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    />
  )
}
