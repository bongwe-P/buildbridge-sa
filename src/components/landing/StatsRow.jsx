// src/components/landing/StatsRow.jsx
import { useCountUp } from '../../hooks/useCountUp'

function Stat({ target, suffix, label }) {
  const { count, ref } = useCountUp(target)
  return (
    <div ref={ref} className="relative text-center">
      <div className="absolute inset-0 flex items-center justify-center font-heading font-black text-[10vw] text-slate-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none leading-none">
        {count.toLocaleString()}
      </div>
      <p className="font-heading font-black text-5xl text-orange-500 relative">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="font-body text-slate-600 dark:text-slate-400 mt-2 text-sm">{label}</p>
    </div>
  )
}

export default function StatsRow() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <Stat target={2400} suffix="+" label="Tonnes diverted from landfill" />
        <Stat target={1200000} suffix="" label="Rands saved by community builders" />
        <Stat target={340} suffix="+" label="Community builders served" />
      </div>
    </section>
  )
}
