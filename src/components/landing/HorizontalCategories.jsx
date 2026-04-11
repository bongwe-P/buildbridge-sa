// src/components/landing/HorizontalCategories.jsx
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const cats = [
  { name: 'Bricks', count: '12,000+ units', bg: 'bg-orange-50', border: 'border-orange-200', icon: '🧱' },
  { name: 'Cement', count: '700+ bags', bg: 'bg-slate-50', border: 'border-slate-200', icon: '⚪' },
  { name: 'Timber', count: '520+ meters', bg: 'bg-amber-50', border: 'border-amber-200', icon: '🪵' },
  { name: 'Roofing', count: '135+ sheets', bg: 'bg-sky-50', border: 'border-sky-200', icon: '🏠' },
  { name: 'Scaffolding', count: '180+ pieces', bg: 'bg-green-50', border: 'border-green-200', icon: '🔩' },
]

export default function HorizontalCategories() {
  const ref = useIntersectionObserver()
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-black text-4xl text-slate-900 dark:text-white mb-3">
          Browse by category
        </h2>
        <p className="font-body text-slate-600 dark:text-slate-400 mb-10">Everything a builder needs, sourced from construction surplus.</p>
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto pb-4 opacity-0 translate-y-8 transition-all duration-700 scrollbar-hide"
        >
          {cats.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name.toLowerCase()}`}
              className={`flex-shrink-0 w-56 rounded-2xl border ${cat.bg} ${cat.border} dark:bg-slate-800 dark:border-slate-700 p-6 cursor-pointer hover:scale-105 hover:rotate-1 transition-transform duration-200 group`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-4xl mb-4 block">{cat.icon}</span>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{cat.name}</h3>
              <p className="font-body text-sm text-slate-500 dark:text-slate-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
