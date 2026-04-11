# About & Contact Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visually striking About page (`/about`) and Contact page (`/contact`) to BuildBridge SA, wiring them into the existing navbar, footer, and router.

**Architecture:** Each page is composed of focused single-responsibility components. About uses a SVG stroke-dashoffset timeline draw animation + count-up stats. Contact uses floating-label inputs with underline-only styling and an inline success state on submit. Both reuse existing hooks (`useIntersectionObserver`, `useCountUp`, `useMagneticButton`) and the existing design system (Rubik/Nunito Sans, orange-500, slate palette, dark mode, rounded-2xl cards).

**Tech Stack:** React 18, Tailwind CSS, lucide-react icons, existing custom hooks, React Router v6

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/about/AboutHero.jsx` | Dark hero band with staggered word reveal |
| Create | `src/components/about/MissionQuote.jsx` | Pull-quote with clip-path slide-in |
| Create | `src/components/about/BlueprintTimeline.jsx` | SVG stroke-dashoffset draw timeline |
| Create | `src/components/about/ValuesGrid.jsx` | 3 value cards with 3D tilt |
| Create | `src/pages/AboutPage.jsx` | Compose all about sections + impact stats band |
| Create | `src/components/contact/ContactHero.jsx` | Compact dark hero with blueprint grid |
| Create | `src/components/contact/ContactInfo.jsx` | Left panel: email/phone/location cards |
| Create | `src/components/contact/ContactForm.jsx` | Right panel: floating label form + submit state |
| Create | `src/pages/ContactPage.jsx` | Compose contact sections |
| Modify | `src/App.jsx` | Add `/about` and `/contact` routes |
| Modify | `src/components/layout/Navbar.jsx` | Add About and Contact to navLinks array |
| Modify | `src/components/layout/Footer.jsx` | Add About and Contact to footer nav links |

---

### Task 1: About Hero + Mission Quote

**Files:**
- Create: `src/components/about/AboutHero.jsx`
- Create: `src/components/about/MissionQuote.jsx`

- [ ] **Step 1: Create AboutHero.jsx**

```jsx
// src/components/about/AboutHero.jsx
import { useEffect, useRef } from 'react'

const words = ['Building', 'a', 'Better', 'South', 'Africa']

export default function AboutHero() {
  const lineRef = useRef(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.style.width = '100%'
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
              className="inline-block mr-4 opacity-0"
              style={{
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
            className="h-1 bg-orange-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: 0, maxWidth: '280px' }}
          />
        </div>

        <p className="font-body text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Turning construction surplus into community opportunity — one brick at a time.
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
```

- [ ] **Step 2: Create MissionQuote.jsx**

```jsx
// src/components/about/MissionQuote.jsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function MissionQuote() {
  const [ref, visible] = useIntersectionObserver()

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`border-l-4 border-orange-500 pl-8 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <blockquote className="font-heading font-bold italic text-2xl md:text-4xl text-slate-900 dark:text-white leading-tight mb-6">
            "Every tonne of surplus concrete diverted is a foundation laid for someone's future."
          </blockquote>
          <p className="font-body text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest">
            — BuildBridge SA Mission Statement
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify useIntersectionObserver returns [ref, visible]**

Read `src/hooks/useIntersectionObserver.js` to confirm the hook signature. It should return `[ref, isVisible]` — if it only adds a class instead, adjust MissionQuote to use the class-based pattern:

```jsx
// Class-based fallback if hook only returns ref:
const ref = useIntersectionObserver()
// then use: ref.current?.classList.contains('animate-in')
```

The existing hook in this codebase returns a `ref` and adds the `animate-in` class. Adjust MissionQuote to match:

```jsx
// src/components/about/MissionQuote.jsx (class-based version)
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
          className={`border-l-4 border-orange-500 pl-8 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <blockquote className="font-heading font-bold italic text-2xl md:text-4xl text-slate-900 dark:text-white leading-tight mb-6">
            "Every tonne of surplus concrete diverted is a foundation laid for someone's future."
          </blockquote>
          <p className="font-body text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest">
            — BuildBridge SA Mission Statement
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/about/AboutHero.jsx src/components/about/MissionQuote.jsx
git commit -m "feat: about hero with staggered word reveal and mission pull-quote"
```

---

### Task 2: Blueprint Timeline

**Files:**
- Create: `src/components/about/BlueprintTimeline.jsx`

- [ ] **Step 1: Create BlueprintTimeline.jsx**

```jsx
// src/components/about/BlueprintTimeline.jsx
import { useRef, useEffect, useState } from 'react'

const milestones = [
  { year: '2022', title: 'BuildBridge SA Founded', body: 'Started in Cape Town with a mission to connect construction surplus with community builders across the Western Cape.', side: 'left' },
  { year: '2023', title: '100+ Active Surplus Suppliers', body: 'Civil contractors, developers, and demolition firms joined our growing supplier network.', side: 'right' },
  { year: '2024', title: '1,200 Community Builders Served', body: 'Township builders and DIY home improvers across the Cape Flats gained access to quality materials at 50–80% below retail.', side: 'left' },
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
    <div className={`relative flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-16`}>
      {/* Card */}
      <div
        ref={ref}
        className={`w-full md:w-5/12 transition-all duration-700 ease-out`}
        style={{
          transitionDelay: `${index * 120}ms`,
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

      {/* Centre dot — hidden on mobile, shown on md+ */}
      <div className="hidden md:flex w-2/12 justify-center">
        <div className={`w-4 h-4 rounded-full border-2 border-orange-500 bg-white dark:bg-slate-950 z-10 transition-all duration-500 ${visible ? 'scale-100 bg-orange-500' : 'scale-0'}`} style={{ transitionDelay: `${index * 120 + 200}ms` }} />
      </div>

      {/* Empty spacer for alternating layout */}
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
    const totalLength = line.getTotalLength()
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
          {/* SVG line — absolutely positioned behind cards, desktop only */}
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:block"
            width="4"
            height="100%"
            style={{ height: '100%' }}
            aria-hidden="true"
          >
            <path
              ref={lineRef}
              d="M 2 0 L 2 9999"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/BlueprintTimeline.jsx
git commit -m "feat: animated blueprint timeline with SVG stroke-dashoffset draw"
```

---

### Task 3: Values Grid + AboutPage Assembly

**Files:**
- Create: `src/components/about/ValuesGrid.jsx`
- Create: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Create ValuesGrid.jsx**

```jsx
// src/components/about/ValuesGrid.jsx
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
    body: 'Township builders, informal settlement residents, and DIY home improvers come first. Affordable quality materials shouldn\'t be a luxury.',
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
    body: 'Every price, condition grade, and stock quantity is honest. No hidden fees — just the 7.5% platform fee shown clearly at checkout.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-orange-500">
        <rect x="10" y="6" width="28" height="36" rx="3" />
        <line x1="16" y1="16" x2="32" y2="16" />
        <line x1="16" y1="22" x2="32" y2="22" />
        <line x1="16" y1="28" x2="26" y2="28" />
        <circle cx="34" cy="36" r="6" fill="none" />
        <line x1="38.2" y1="40.2" x2="42" y2="44" />
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
      className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-transparent hover:border-orange-500 p-8 transition-colors duration-300 cursor-default"
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.2s ease, border-color 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'perspective(1000px) rotateY(0) rotateX(0)' : 'translateY(32px)',
        transitionDelay: `${index * 120}ms`,
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
```

- [ ] **Step 2: Create AboutPage.jsx**

```jsx
// src/pages/AboutPage.jsx
import AboutHero from '../components/about/AboutHero'
import MissionQuote from '../components/about/MissionQuote'
import BlueprintTimeline from '../components/about/BlueprintTimeline'
import ValuesGrid from '../components/about/ValuesGrid'
import StatsRow from '../components/landing/StatsRow'

export default function AboutPage() {
  return (
    <>
      <div className="pt-24">
        <AboutHero />
        <MissionQuote />
        <BlueprintTimeline />
        {/* Reuse existing StatsRow — impact numbers with count-up animation */}
        <div className="bg-slate-900">
          <StatsRow />
        </div>
        <ValuesGrid />
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/about/ValuesGrid.jsx src/pages/AboutPage.jsx
git commit -m "feat: values grid with 3D tilt and AboutPage composition"
```

---

### Task 4: Contact Hero + Contact Info Panel

**Files:**
- Create: `src/components/contact/ContactHero.jsx`
- Create: `src/components/contact/ContactInfo.jsx`

- [ ] **Step 1: Create ContactHero.jsx**

```jsx
// src/components/contact/ContactHero.jsx
export default function ContactHero() {
  return (
    <section className="relative bg-slate-900 py-32 px-6 overflow-hidden">
      {/* Blueprint grid background — same SVG pattern as HeroSplit */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        style={{ animation: 'driftUp 20s linear infinite' }}
        aria-hidden="true"
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
        <h1 className="font-heading font-black text-5xl md:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'wordReveal 0.8s ease forwards', clipPath: 'inset(0 100% 0 0)' }}
          ref={el => { if (el) setTimeout(() => { el.style.clipPath = 'inset(0 0% 0 0)' }, 50) }}
        >
          Let's Build Together
        </h1>
        <p className="font-body text-slate-400 text-lg max-w-xl mx-auto">
          Whether you're a supplier, builder, or just curious — we want to hear from you.
        </p>
      </div>

      <style>{`
        @keyframes driftUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Create ContactInfo.jsx**

```jsx
// src/components/contact/ContactInfo.jsx
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const contacts = [
  { icon: Mail,   label: 'Email',     value: 'hello@buildbridgesa.co.za' },
  { icon: Phone,  label: 'WhatsApp',  value: '+27 21 000 0000' },
  { icon: MapPin, label: 'Location',  value: 'Cape Town, Western Cape, South Africa' },
]

export default function ContactInfo() {
  return (
    <div className="relative bg-slate-900 p-8 md:p-12 h-full overflow-hidden">
      {/* Orange gradient blob */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <p className="font-body text-orange-500 text-xs uppercase tracking-widest font-semibold mb-8">Reach Us</p>

      <div className="space-y-4 mb-10">
        {contacts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-body text-xs text-slate-500 uppercase tracking-wide mb-0.5">{label}</p>
              <p className="font-body text-white text-sm font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <p className="font-body text-xs text-slate-500 uppercase tracking-wide mb-1">Office Hours</p>
          <p className="font-body text-white text-sm">Mon – Fri: 08:00 – 17:00 SAST</p>
          <p className="font-body text-slate-400 text-xs mt-0.5">We respond within 24 hours</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactHero.jsx src/components/contact/ContactInfo.jsx
git commit -m "feat: contact hero with blueprint grid and contact info panel"
```

---

### Task 5: Contact Form + ContactPage Assembly

**Files:**
- Create: `src/components/contact/ContactForm.jsx`
- Create: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Create ContactForm.jsx with floating labels**

```jsx
// src/components/contact/ContactForm.jsx
import { useState, useRef } from 'react'
import { useMagneticButton } from '../../hooks/useMagneticButton'
import { Send, CheckCircle } from 'lucide-react'

const subjects = [
  'General Enquiry',
  'Supplier Onboarding',
  'Bulk Order',
  'Technical Support',
]

function FloatingInput({ id, label, type = 'text', value, onChange, required }) {
  const filled = value.length > 0
  return (
    <div className="relative pt-5">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent py-3 text-slate-900 dark:text-white font-body text-base outline-none transition-colors duration-200 focus:border-orange-500"
      />
      <label
        htmlFor={id}
        className={`absolute left-0 font-body text-sm transition-all duration-200 pointer-events-none ${
          filled
            ? '-top-0 text-xs text-orange-500'
            : 'top-8 text-slate-400 peer-focus:-top-0 peer-focus:text-xs peer-focus:text-orange-500'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ id, label, value, onChange, required }) {
  const filled = value.length > 0
  return (
    <div className="relative pt-5">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        placeholder=" "
        className="peer w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent py-3 text-slate-900 dark:text-white font-body text-base outline-none resize-none transition-colors duration-200 focus:border-orange-500"
      />
      <label
        htmlFor={id}
        className={`absolute left-0 font-body text-sm transition-all duration-200 pointer-events-none ${
          filled
            ? '-top-0 text-xs text-orange-500'
            : 'top-8 text-slate-400 peer-focus:-top-0 peer-focus:text-xs peer-focus:text-orange-500'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { ref: btnRef, onMouseMove, onMouseLeave } = useMagneticButton(0.3)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-8 md:p-12 h-full">
      <p className="font-body text-orange-500 text-xs uppercase tracking-widest font-semibold mb-8">Send a Message</p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">Message Sent!</h3>
          <p className="font-body text-slate-500 dark:text-slate-400">We'll respond within 24 hours.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-sm text-orange-500 font-body hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <FloatingInput id="name"    label="Full Name"      value={form.name}    onChange={set('name')}    required />
          <FloatingInput id="email"   label="Email Address"  type="email" value={form.email}   onChange={set('email')}   required />

          {/* Subject select */}
          <div className="relative pt-5">
            <select
              id="subject"
              value={form.subject}
              onChange={set('subject')}
              required
              className="w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent py-3 text-slate-900 dark:text-white font-body text-base outline-none appearance-none transition-colors duration-200 focus:border-orange-500 cursor-pointer"
            >
              <option value="" disabled />
              {subjects.map(s => <option key={s} value={s} className="bg-white dark:bg-slate-800">{s}</option>)}
            </select>
            <label
              htmlFor="subject"
              className={`absolute left-0 font-body text-sm transition-all duration-200 pointer-events-none ${
                form.subject ? '-top-0 text-xs text-orange-500' : 'top-8 text-slate-400'
              }`}
            >
              Subject
            </label>
          </div>

          <FloatingTextarea id="message" label="Your Message" value={form.message} onChange={set('message')} required />

          <button
            ref={btnRef}
            type="submit"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="w-full flex items-center justify-center gap-3 py-4 bg-orange-500 text-white font-heading font-bold text-lg rounded-2xl hover:bg-orange-600 hover:ring-4 hover:ring-orange-500/30 transition-all duration-200 cursor-pointer"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify useMagneticButton signature**

Read `src/hooks/useMagneticButton.js`. If it returns `{ style, onMouseMove, onMouseLeave }`, the above code is correct. If it returns only a style object via a different API, adjust ContactForm to match the actual hook signature. The hook was written to provide `{ x, y }` translate values — wrap usage accordingly.

- [ ] **Step 3: Create ContactPage.jsx**

```jsx
// src/pages/ContactPage.jsx
import ContactHero from '../components/contact/ContactHero'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'

export default function ContactPage() {
  return (
    <>
      <div className="pt-24">
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/contact/ContactForm.jsx src/pages/ContactPage.jsx
git commit -m "feat: contact form with floating labels and ContactPage layout"
```

---

### Task 6: Wire Routes, Navbar, Footer

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Update App.jsx — add /about and /contact routes**

In `src/App.jsx`, add the two imports and routes:

```jsx
// Add these two imports alongside the existing page imports:
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

// Inside <Routes>, add after the /checkout route:
<Route path="/about"    element={<AboutPage />} />
<Route path="/contact"  element={<ContactPage />} />
```

Full updated Routes block:
```jsx
<Routes>
  <Route path="/"          element={<LandingPage />} />
  <Route path="/shop"      element={<ShopPage />} />
  <Route path="/estimator" element={<EstimatorPage />} />
  <Route path="/checkout"  element={<CheckoutPage />} />
  <Route path="/about"     element={<AboutPage />} />
  <Route path="/contact"   element={<ContactPage />} />
</Routes>
```

- [ ] **Step 2: Update Navbar.jsx — add About and Contact to navLinks**

In `src/components/layout/Navbar.jsx`, find the `navLinks` array and add two entries:

```jsx
const navLinks = [
  { to: '/',          label: 'Home' },
  { to: '/shop',      label: 'Shop' },
  { to: '/estimator', label: 'Smart Estimator' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
]
```

- [ ] **Step 3: Update Footer.jsx — add About and Contact to nav links**

In `src/components/layout/Footer.jsx`, find the nav links array and extend it:

```jsx
{[
  ['/', 'Home'],
  ['/shop', 'Shop'],
  ['/estimator', 'Smart Estimator'],
  ['/about', 'About'],
  ['/contact', 'Contact Us'],
].map(([to, label]) => (
  <Link key={to} to={to} className="text-slate-400 hover:text-orange-500 transition-colors duration-200 text-sm font-body cursor-pointer">
    {label}
  </Link>
))}
```

- [ ] **Step 4: Run build to verify zero errors**

```bash
npm run build
```

Expected output: `✓ built in Xs` with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/components/layout/Navbar.jsx src/components/layout/Footer.jsx
git commit -m "feat: wire /about and /contact routes into app, navbar, and footer"
```
