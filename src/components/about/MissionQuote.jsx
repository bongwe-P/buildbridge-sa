import { useRef, useEffect, useState } from 'react'

export default function MissionQuote() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className="border-l-4 border-orange-500 pl-8"
          style={{
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-48px)',
          }}
        >
          <blockquote className="font-heading font-bold italic text-2xl md:text-4xl text-slate-900 dark:text-white leading-tight mb-6">
            "Every tonne of surplus concrete diverted is a foundation laid for someone's future."
          </blockquote>
          <p className="font-body text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest">
            BuildBridge SA Mission Statement
          </p>
        </div>
      </div>
    </section>
  )
}
