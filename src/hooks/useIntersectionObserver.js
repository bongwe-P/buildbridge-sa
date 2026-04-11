// src/hooks/useIntersectionObserver.js
import { useEffect, useRef } from 'react'

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('animate-in')
        observer.unobserve(el)
      }
    }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
