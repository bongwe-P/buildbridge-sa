// src/components/shop/FilterSidebar.jsx
import { categories } from '../../data/products'

export default function FilterSidebar({ selected, onChange }) {
  const toggle = (cat) => {
    onChange(selected.includes(cat) ? selected.filter(c => c !== cat) : [...selected, cat])
  }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
      <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-4">Filter by category</h3>
      <div className="flex flex-col gap-3">
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggle(cat)}
              className="w-4 h-4 accent-orange-500 cursor-pointer"
            />
            <span className="font-body text-sm text-slate-700 dark:text-slate-300 capitalize group-hover:text-orange-500 transition-colors duration-150">
              {cat}
            </span>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="mt-4 text-xs text-orange-500 font-body hover:text-orange-600 cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
