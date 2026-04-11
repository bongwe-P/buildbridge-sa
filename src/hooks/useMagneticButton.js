// src/hooks/useMagneticButton.js
import { useRef } from 'react'

export function useMagneticButton(strength = 0.3) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return { ref, onMouseMove, onMouseLeave }
}
