import { useState } from 'react'
import EstimatorForm from '../components/estimator/EstimatorForm'
import WallDiagram from '../components/estimator/WallDiagram'
import RecommendedBundle from '../components/estimator/RecommendedBundle'
import { calculateWall } from '../utils/estimator'

export default function EstimatorPage() {
  const [length, setLength] = useState(5)
  const [height, setHeight] = useState(1.8)
  const [result, setResult] = useState(() => ({ length: 5, height: 1.8, ...calculateWall(5, 1.8) }))

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full font-body mb-4 uppercase tracking-widest">
            Custom Feature
          </span>
          <h1 className="font-heading font-black text-5xl text-slate-900 dark:text-white mb-3">
            Smart Project <span className="text-orange-500">Estimator</span>
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Enter your wall dimensions. We calculate exactly what you need and match it to available surplus stock, no guessing and no overbuying.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">Project dimensions</h2>
              <EstimatorForm
                length={length} height={height}
                setLength={setLength} setHeight={setHeight}
                onResult={setResult}
              />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center">
              <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4 self-start">Wall preview</h2>
              <WallDiagram length={Number(length)} height={Number(height)} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">Materials Required</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Bricks', value: result.bricks?.toLocaleString() ?? '—', unit: 'units' },
                  { label: 'Cement', value: result.cement ?? '—', unit: 'bags (50kg)' },
                  { label: 'Sand', value: result.sand?.toFixed(2) ?? '—', unit: 'm³ (local)' },
                ].map(({ label, value, unit }) => (
                  <div key={label} className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
                    <p className="font-heading font-black text-3xl text-orange-500">{value}</p>
                    <p className="font-body text-xs text-slate-500 dark:text-slate-400 mt-1">{unit}</p>
                    <p className="font-body text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-slate-400 mt-4">
                Based on standard SA brick size (222×106×73mm), 10mm mortar joints
              </p>
            </div>

            {result.bricks && result.bricks > 0 && (
              <RecommendedBundle bricks={result.bricks} cement={result.cement} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
