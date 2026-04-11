import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { useWishlist } from '../../context/WishlistContext'
import { useUI } from '../../context/UIContext'
import { useCart } from '../../context/CartContext'
import { Trash2 } from 'lucide-react'

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen } = useUI()
  const { items, remove } = useWishlist()
  const { addItem } = useCart()

  return (
    <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent className="w-full sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <SheetHeader>
          <SheetTitle className="font-heading font-black text-xl text-orange-500">
            Wishlist ({items.length})
          </SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <p className="font-heading font-bold text-2xl text-slate-300">Nothing saved yet</p>
            <p className="font-body text-sm text-slate-400">Tap the heart on any listing</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-slate-900 dark:text-white truncate">{item.name}</p>
                  <p className="font-heading font-bold text-orange-500 text-sm">R{item.price.toFixed(2)} <span className="font-normal text-slate-400 text-xs">{item.unit}</span></p>
                </div>
                <button
                  onClick={() => addItem(item, 1)}
                  className="px-3 py-2 bg-orange-500 text-white text-xs font-semibold rounded-xl hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Add
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
