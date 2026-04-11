// src/components/landing/HowItWorks.jsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const steps = [
  { n: '01', title: 'Browse surplus', desc: 'Search materials by category, location, or use the Smart Estimator to calculate exactly what you need.' },
  { n: '02', title: 'Add to cart', desc: 'Select quantities, apply bundle discounts, and review pricing before checkout.' },
  { n: '03', title: 'Confirm & deliver', desc: 'Complete your order. A local bakkie driver delivers to your site within 48 hours.' },
]

export default function HowItWorks() {
  const ref = useIntersectionObserver()
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-black text-4xl text-slate-900 dark:text-white mb-16 text-center">How it works</h2>
        <div
          ref={ref}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-orange-200 dark:bg-orange-900" />
          {steps.map((step, i) => (
            <div key={step.n} className="relative text-center" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-16 h-16 bg-orange-500 text-white font-heading font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                {step.n}
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">{step.title}</h3>
              <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
