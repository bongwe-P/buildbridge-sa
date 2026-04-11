import { ShoppingCart } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'

export default function RecommendedBundle({ bricks, cement }) {
  const { addItem, applyBundleDiscount } = useCart()
  const [bundleAdded, setBundleAdded] = useState(false)

  const matchedBricks = products.find(p => p.category === 'bricks' && p.stockQuantity >= bricks)
  const matchedCement = products.find(p => p.category === 'cement' && p.stockQuantity >= cement)

  const handleAddBundle = () => {
    if (matchedBricks) addItem(matchedBricks, bricks)
    if (matchedCement) addItem(matchedCement, cement)
    applyBundleDiscount()
    setBundleAdded(true)
    setTimeout(() => setBundleAdded(false), 2000)
  }

  if (!matchedBricks && !matchedCement) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 text-center">
        <p className="font-body text-red-600 dark:text-red-400">No matching surplus stock. Check back soon.</p>
      </div>
    )
  }

  const subtotal =
    (matchedBricks ? matchedBricks.price * bricks : 0) +
    (matchedCement ? matchedCement.price * cement : 0)

  return (
    <div className="rounded-2xl border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/20 p-6 space-y-4">
      <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">Recommended Bundle</h3>
      <div className="space-y-3">
        {matchedBricks && (
          <div className="flex justify-between font-body text-sm text-slate-700 dark:text-slate-300">
            <span>{matchedBricks.name} × {bricks.toLocaleString()}</span>
            <span className="font-semibold">R{(matchedBricks.price * bricks).toFixed(2)}</span>
          </div>
        )}
        {matchedCement && (
          <div className="flex justify-between font-body text-sm text-slate-700 dark:text-slate-300">
            <span>{matchedCement.name} × {cement}</span>
            <span className="font-semibold">R{(matchedCement.price * cement).toFixed(2)}</span>
          </div>
        )}
        <div className="pt-3 border-t border-orange-200 dark:border-orange-800 flex justify-between font-body font-bold text-slate-900 dark:text-white">
          <span>After 10% bundle discount:</span>
          <span className="text-orange-500">R{(subtotal * 0.9).toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleAddBundle}
        className={`w-full flex items-center justify-center gap-2 py-4 font-heading font-bold text-lg rounded-2xl transition-colors duration-200 cursor-pointer ${
          bundleAdded ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {bundleAdded ? '✓ Bundle Added to Cart!' : 'Add Bundle to Cart (10% Off)'}
      </button>
    </div>
  )
}
