export default function ContactHero() {
  return (
    <section className="relative bg-slate-900 py-32 px-6 overflow-hidden">
      {/* Blueprint grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{ animation: 'driftUp 20s linear infinite' }}
      >
        <defs>
          <pattern id="contact-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F97316" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="200%" fill="url(#contact-grid)" />
      </svg>

      {/* Grain overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" aria-hidden="true">
        <filter id="contact-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#contact-grain)" />
      </svg>

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="font-body text-orange-500 text-sm uppercase tracking-widest font-semibold mb-4">Get In Touch</p>
        <h1
          className="font-heading font-black text-5xl md:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'heroReveal 0.8s ease 0.1s both' }}
        >
          Let's Build Together
        </h1>
        <p className="font-body text-slate-400 text-lg max-w-xl mx-auto">
          Whether you're a supplier, builder, or just curious, we want to hear from you.
        </p>
      </div>

      <style>{`
        @keyframes heroReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes driftUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  )
}
