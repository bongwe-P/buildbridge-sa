import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { useCart } from '../../context/CartContext'
import { useUI } from '../../context/UIContext'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem'

export default function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI()
  const { items, subtotal, discount, platformFee, total, bundleDiscount } = useCart()
  const navigate = useNavigate()

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <SheetHeader>
          <SheetTitle className="font-heading font-black text-xl text-slate-900 dark:text-white">
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <p className="font-heading font-bold text-2xl text-slate-300">Your cart is empty</p>
            <button
              onClick={() => { setCartOpen(false); navigate('/shop') }}
              className="text-orange-500 font-body font-semibold cursor-pointer hover:text-orange-600"
            >
              Browse materials →
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mt-4">
              {items.map(item => <CartItem key={item.id} item={item} />)}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2 mt-4">
              <div className="flex justify-between font-body text-sm text-slate-600 dark:text-slate-400">
                <span>Subtotal</span><span>R{subtotal.toFixed(2)}</span>
              </div>
              {bundleDiscount && (
                <div className="flex justify-between font-body text-sm text-green-600">
                  <span>Bundle Discount (10%)</span><span>-R{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-body text-sm text-slate-600 dark:text-slate-400">
                <span>Platform fee (7.5%)</span><span>R{platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-heading font-black text-lg text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-700">
                <span>Total</span><span className="text-orange-500">R{total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { setCartOpen(false); navigate('/checkout') }}
                className="w-full mt-4 py-4 bg-orange-500 text-white font-heading font-bold text-lg rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
