// src/components/landing/ProblemSolution.jsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function ProblemSolution() {
  const ref = useIntersectionObserver()
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-3xl p-10">
            <span className="text-xs font-semibold text-red-500 uppercase tracking-widest font-body">The Problem</span>
            <h3 className="font-heading font-black text-3xl text-slate-900 dark:text-white mt-3 mb-4">
              Contractors pay to dump. Builders can't afford to build.
            </h3>
            <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed">
              Construction sites generate thousands of tonnes of usable surplus materials annually — all destined for landfill at a cost. Meanwhile, township builders and community members lack access to affordable, quality materials.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-3xl p-10">
            <span className="text-xs font-semibold text-green-600 uppercase tracking-widest font-body">The Solution</span>
            <h3 className="font-heading font-black text-3xl text-slate-900 dark:text-white mt-3 mb-4">
              BuildBridge connects surplus with community need.
            </h3>
            <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed">
              Our platform creates a direct link: contractors list surplus materials for free, community builders purchase at 50–80% below retail. Zero waste. Zero dump fees. Maximum social impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
