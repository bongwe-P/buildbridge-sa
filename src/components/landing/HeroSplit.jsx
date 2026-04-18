import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMagneticButton } from '../../hooks/useMagneticButton'

function MagneticLink({ to, children, className }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticButton(0.25)
  return (
    <Link
      ref={ref}
      to={to}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  )
}

const words = ['Bridging', 'the', 'gap', 'between', 'surplus', '&', 'community.']

export default function HeroSplit() {
  const [active, setActive] = useState(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex overflow-hidden pt-24">
      {/* Blueprint grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.5"/>
          </pattern>
          <style>{`
            @keyframes driftUp { from { transform: translateY(0); } to { transform: translateY(-40px); } }
            #gridRect { animation: driftUp 8s linear infinite; }
          `}</style>
        </defs>
        <rect id="gridRect" width="100%" height="calc(100% + 40px)" fill="url(#grid)"/>
      </svg>

      {/* Grain overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"/>
      </svg>

      {/* Buyer panel */}
      <div
        className={`relative flex-1 flex flex-col justify-center px-8 lg:px-16 py-20 bg-slate-50 dark:bg-slate-950 transition-all duration-500 cursor-pointer ${
          active === 'supplier' ? 'flex-[0.4]' : active === 'buyer' ? 'flex-[0.6]' : 'flex-[0.5]'
        }`}
        onMouseEnter={() => setActive('buyer')}
        onMouseLeave={() => setActive(null)}
      >
        <div className="max-w-lg">
          <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full font-body mb-6 uppercase tracking-widest">
            For Builders
          </span>
          <h1 className="font-heading font-black text-4xl lg:text-6xl text-slate-900 dark:text-white leading-[1.05] mb-6">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-2 lg:mr-3">
                <span
                  className="inline-block transition-all duration-700"
                  style={{
                    clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-300 text-base lg:text-lg mb-8 leading-relaxed">
            Access high-quality surplus construction materials at 50 to 80% below retail. Build more, spend less.
          </p>
          <MagneticLink
            to="/shop"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-orange-500 text-white font-heading font-bold text-base lg:text-lg rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
          >
            Browse Materials →
          </MagneticLink>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-slate-200 dark:bg-slate-700 self-stretch my-12" />

      {/* Supplier panel */}
      <div
        className={`relative flex-1 flex flex-col justify-center px-8 lg:px-16 py-20 bg-slate-900 dark:bg-slate-950 transition-all duration-500 cursor-pointer ${
          active === 'buyer' ? 'flex-[0.4]' : active === 'supplier' ? 'flex-[0.6]' : 'flex-[0.5]'
        }`}
        onMouseEnter={() => setActive('supplier')}
        onMouseLeave={() => setActive(null)}
      >
        <div className="max-w-lg">
          <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full font-body mb-6 uppercase tracking-widest">
            For Contractors
          </span>
          <h2 className="font-heading font-black text-4xl lg:text-6xl text-white leading-[1.05] mb-6">
            Clear surplus. <span className="text-orange-500">Zero</span> dump fees.
          </h2>
          <p className="font-body text-slate-400 text-base lg:text-lg mb-8 leading-relaxed">
            List your site's surplus materials in minutes. Earn ESG credits, avoid landfill costs, and support communities.
          </p>
          <MagneticLink
            to="/shop"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 border-2 border-orange-500 text-orange-500 font-heading font-bold text-base lg:text-lg rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
          >
            List Materials →
          </MagneticLink>
        </div>
      </div>
    </section>
  )
}
