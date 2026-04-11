import { calculateWall } from '../../utils/estimator'

export default function EstimatorForm({ length, height, setLength, setHeight, onResult }) {
  const handleChange = (newLength, newHeight) => {
    const result = calculateWall(Number(newLength), Number(newHeight))
    onResult({ length: Number(newLength), height: Number(newHeight), ...result })
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="font-body font-semibold text-slate-700 dark:text-slate-300 text-sm block mb-3">
          Wall Length: <span className="text-orange-500 font-bold">{length}m</span>
        </label>
        <input
          type="range" min="1" max="20" step="0.5" value={length}
          onChange={e => { setLength(e.target.value); handleChange(e.target.value, height) }}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 font-body mt-1"><span>1m</span><span>20m</span></div>
      </div>

      <div>
        <label className="font-body font-semibold text-slate-700 dark:text-slate-300 text-sm block mb-3">
          Wall Height: <span className="text-orange-500 font-bold">{height}m</span>
        </label>
        <input
          type="range" min="0.5" max="5" step="0.1" value={height}
          onChange={e => { setHeight(e.target.value); handleChange(length, e.target.value) }}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 font-body mt-1"><span>0.5m</span><span>5m</span></div>
      </div>
    </div>
  )
}
