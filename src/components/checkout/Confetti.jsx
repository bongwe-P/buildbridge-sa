import { useEffect } from 'react'

const COLORS = ['#F97316', '#0EA5E9', '#22C55E', '#EAB308', '#EC4899', '#8B5CF6']

export default function Confetti() {
  useEffect(() => {
    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;'
    document.body.appendChild(container)

    const style = document.createElement('style')
    style.textContent = `@keyframes confettiFall {
      0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(105vh) rotate(${720}deg); opacity: 0; }
    }`
    document.head.appendChild(style)

    const pieces = Array.from({ length: 60 }).map(() => {
      const el = document.createElement('div')
      const size = 6 + Math.random() * 8
      el.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        left:${Math.random() * 100}%;
        top:-20px;
        animation:confettiFall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.8}s forwards;
      `
      container.appendChild(el)
      return el
    })

    const cleanup = setTimeout(() => {
      container.remove()
      style.remove()
    }, 4000)

    return () => {
      clearTimeout(cleanup)
      container.remove()
      style.remove()
    }
  }, [])

  return null
}
