// src/pages/ShopPage.jsx
import { useState, useEffect, useMemo } from 'react'
import { products } from '../data/products'
import { filterProducts } from '../utils/filterProducts'
import SearchBar from '../components/shop/SearchBar'
import FilterSidebar from '../components/shop/FilterSidebar'
import ProductCard from '../components/shop/ProductCard'
import SkeletonCard from '../components/shop/SkeletonCard'

export default function ShopPage() {
  const [query, setQuery] = useState('')
  const [selectedCats, setSelectedCats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () => filterProducts(products, { query, categories: selectedCats }),
    [query, selectedCats]
  )

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading font-black text-5xl text-slate-900 dark:text-white mb-2">
          Surplus <span className="text-orange-500">Marketplace</span>
        </h1>
        <p className="font-body text-slate-600 dark:text-slate-400 mb-10 text-lg">
          {products.length} listings available across Cape Town
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-60 flex-shrink-0">
            <FilterSidebar selected={selectedCats} onChange={setSelectedCats} />
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <SearchBar value={query} onChange={setQuery} />
            </div>
            {!loading && (
              <p className="font-body text-sm text-slate-500 dark:text-slate-400 mb-4">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filtered.map(p => <ProductCard key={p.id} product={p} />)
              }
            </div>
            {!loading && filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="font-heading font-bold text-2xl text-slate-400">No materials found</p>
                <p className="font-body text-slate-400 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
