import { useEffect, useRef } from 'react'

const words = ['Building', 'a', 'Better', 'South', 'Africa']

export default function AboutHero() {
  const lineRef = useRef(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.style.width = '280px'
    })
  }, [])

  return (
    <section className="relative bg-slate-900 py-40 px-6 overflow-hidden">
      {/* Grain overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" aria-hidden="true">
        <filter id="about-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#about-grain)" />
      </svg>

      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="font-heading font-black text-5xl md:text-7xl text-white leading-tight mb-6">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-4"
              style={{
                opacity: 0,
                animation: `wordReveal 0.6s ease forwards`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Animated orange underline */}
        <div className="flex justify-center mb-8">
          <div
            ref={lineRef}
            className="h-1 bg-orange-500 rounded-full"
            style={{ width: 0, maxWidth: '280px', transition: 'width 1s ease-out 0.4s' }}
          />
        </div>

        <p className="font-body text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Turning construction surplus into community opportunity, one brick at a time.
        </p>
      </div>

      <style>{`
        @keyframes wordReveal {
          from { clip-path: inset(0 100% 0 0); opacity: 1; }
          to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
      `}</style>
    </section>
  )
}
