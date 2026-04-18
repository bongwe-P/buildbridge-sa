import { useRef, useEffect, useState } from 'react'

const milestones = [
  { year: '2022', title: 'BuildBridge SA Founded', body: 'Started in Cape Town with a mission to connect construction surplus with community builders across the Western Cape.', side: 'left' },
  { year: '2023', title: '100+ Active Surplus Suppliers', body: 'Civil contractors, developers, and demolition firms joined our growing supplier network.', side: 'right' },
  { year: '2024', title: '1,200 Community Builders Served', body: 'Township builders and DIY home improvers across the Cape Flats gained access to quality materials at 50 to 80% below retail.', side: 'left' },
  { year: '2026', title: 'R1.2M Saved Across the Western Cape', body: 'Our platform has saved builders over R1.2 million while diverting 2,400+ tonnes of materials from landfill.', side: 'right' },
]

function TimelineCard({ milestone, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isLeft = milestone.side === 'left'

  return (
    <div className={`relative flex items-center gap-8 mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Card */}
      <div
        ref={ref}
        className="w-full md:w-5/12"
        style={{
          transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
        }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg font-body mb-3">
            {milestone.year}
          </span>
          <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">
            {milestone.title}
          </h3>
          <p className="font-body text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            {milestone.body}
          </p>
        </div>
      </div>

      {/* Centre dot */}
      <div className="hidden md:flex w-2/12 justify-center">
        <div
          className="w-4 h-4 rounded-full border-2 border-orange-500 z-10"
          style={{
            transition: `transform 0.4s ease ${index * 120 + 200}ms, background-color 0.4s ease ${index * 120 + 200}ms`,
            transform: visible ? 'scale(1)' : 'scale(0)',
            backgroundColor: visible ? '#F97316' : 'white',
          }}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-5/12" />
    </div>
  )
}

export default function BlueprintTimeline() {
  const lineRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    const totalLength = line.getTotalLength ? line.getTotalLength() : 9999
    line.style.strokeDasharray = totalLength
    line.style.strokeDashoffset = totalLength

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 2000
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        line.style.strokeDashoffset = totalLength * (1 - eased)
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
      obs.disconnect()
    }, { threshold: 0.1 })

    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-orange-500 text-sm uppercase tracking-widest font-semibold mb-3">Our Journey</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-slate-900 dark:text-white">
            From Idea to Impact
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* SVG animated line — desktop only */}
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:block pointer-events-none"
            width="4"
            style={{ height: '100%', position: 'absolute' }}
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="2" y1="0" x2="2" y2="9999"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {milestones.map((m, i) => (
            <TimelineCard key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
