import { useRef, useState, useEffect } from 'react'

const values = [
  {
    title: 'Circular Economy',
    body: 'Every transaction diverts materials from landfill and back into productive use. We measure our success in tonnes, not just rands.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-orange-500">
        <path d="M24 6 C13 6 6 13 6 24" />
        <path d="M6 24 C6 35 13 42 24 42" />
        <path d="M24 42 C35 42 42 35 42 24" />
        <path d="M42 24 C42 13 35 6 24 6" />
        <polyline points="18,6 24,6 24,12" />
        <polyline points="30,42 24,42 24,36" />
      </svg>
    ),
  },
  {
    title: 'Community First',
    body: "Township builders, informal settlement residents, and DIY home improvers come first. Affordable quality materials shouldn't be a luxury.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-orange-500">
        <circle cx="16" cy="16" r="6" />
        <circle cx="32" cy="16" r="6" />
        <circle cx="24" cy="30" r="6" />
        <path d="M10 38 C10 32 13 28 16 28" />
        <path d="M38 38 C38 32 35 28 32 28" />
        <path d="M18 42 C18 36 21 34 24 34" />
        <path d="M30 42 C30 36 27 34 24 34" />
      </svg>
    ),
  },
  {
    title: 'Radical Transparency',
    body: 'Every price, condition grade, and stock quantity is honest. No hidden fees, just the 7.5% platform fee shown clearly at checkout.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-orange-500">
        <rect x="10" y="6" width="28" height="36" rx="3" />
        <line x1="16" y1="16" x2="32" y2="16" />
        <line x1="16" y1="22" x2="32" y2="22" />
        <line x1="16" y1="28" x2="26" y2="28" />
      </svg>
    ),
  },
]

function ValueCard({ value, index }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }

  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-transparent hover:border-orange-500 p-8 cursor-default"
      style={{
        transition: `transform 0.15s ease, box-shadow 0.2s ease, border-color 0.3s ease, opacity 0.7s ease ${index * 120}ms`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="mb-5">{value.icon}</div>
      <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">{value.title}</h3>
      <p className="font-body text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{value.body}</p>
    </div>
  )
}

export default function ValuesGrid() {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-body text-orange-500 text-sm uppercase tracking-widest font-semibold mb-3">What We Stand For</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-slate-900 dark:text-white">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => <ValueCard key={v.title} value={v} index={i} />)}
        </div>
      </div>
    </section>
  )
}
