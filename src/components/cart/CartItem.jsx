import { Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-sm text-slate-900 dark:text-white truncate">{item.name}</p>
        <p className="font-body text-xs text-slate-500">R{item.price.toFixed(2)} {item.unit}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeItem(item.id)}
          className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-heading font-bold text-slate-700 dark:text-slate-300 hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer"
          aria-label="Decrease quantity"
        >−</button>
        <span className="font-body font-semibold text-sm w-6 text-center text-slate-900 dark:text-white">{item.quantity}</span>
        <button
          onClick={() => updateQty(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-heading font-bold text-slate-700 dark:text-slate-300 hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer"
          aria-label="Increase quantity"
        >+</button>
      </div>
      <p className="font-heading font-bold text-sm text-orange-500 w-20 text-right">
        R{(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => removeItem(item.id)}
        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
