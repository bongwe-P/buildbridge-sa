import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { ShoppingCart, Heart, MapPin } from 'lucide-react'
import { useState, useRef } from 'react'

function MiniCard({ product }) {
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const [added, setAdded] = useState(false)
  const cardRef = useRef(null)
  const isWished = has(product.id)

  const onMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'none'
  }

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl group"
      style={{ transition: 'transform 0.15s ease, box-shadow 0.2s ease' }}
    >
      <div className="relative overflow-hidden h-44">
        <img src={product.imageUrl} alt={product.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {product.urgent && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg font-body animate-pulse">Urgent</span>
        )}
        <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-lg font-body">-{product.discount}%</span>
        <button onClick={() => toggle(product)}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart className={`w-4 h-4 ${isWished ? 'fill-orange-500 text-orange-500' : 'text-slate-400'}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 text-sky-500" />
          <span className="text-xs text-sky-600 font-body">{product.location}</span>
        </div>
        <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-3">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-heading font-black text-xl text-orange-500">R{product.price.toFixed(2)}</span>
          <button onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl font-body font-semibold text-xs cursor-pointer transition-colors duration-200 ${added ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
            {added ? '✓ Added' : <><ShoppingCart className="w-3 h-3" /> Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedListings() {
  const ref = useIntersectionObserver()
  const featured = products.slice(0, 6)
  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-heading font-black text-4xl text-slate-900 dark:text-white">Featured listings</h2>
            <p className="font-body text-slate-600 dark:text-slate-400 mt-2">Fresh surplus — just posted</p>
          </div>
          <Link to="/shop" className="font-body font-semibold text-orange-500 hover:text-orange-600 cursor-pointer">View all →</Link>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 translate-y-8 transition-all duration-700">
          {featured.map((product, i) => (
            <div key={product.id} style={{ transitionDelay: `${i * 80}ms` }}>
              <MiniCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
