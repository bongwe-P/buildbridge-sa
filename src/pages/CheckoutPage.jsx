import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import Confetti from '../components/checkout/Confetti'

function genOrderId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function CheckoutPage() {
  const { items, subtotal, discount, platformFee, total, bundleDiscount, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [success, setSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [orderId] = useState(genOrderId)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfetti(true)
    setSuccess(true)
    clearCart()
  }

  const fields = [
    { id: 'name', label: 'Full name', type: 'text', placeholder: 'Sipho Ndlovu' },
    { id: 'phone', label: 'Phone number', type: 'tel', placeholder: '071 234 5678' },
    { id: 'address', label: 'Delivery address', type: 'text', placeholder: '12 Mandela Ave, Khayelitsha' },
  ]

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 dark:bg-slate-950">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading font-black text-4xl text-slate-900 dark:text-white mb-10">Checkout</h1>

        {items.length === 0 && !success ? (
          <div className="text-center py-24">
            <p className="font-heading font-bold text-2xl text-slate-400 mb-4">Your cart is empty</p>
            <Link to="/shop" className="text-orange-500 font-body font-semibold hover:text-orange-600 cursor-pointer">
              Browse materials →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 space-y-6 h-fit">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Delivery details</h2>
              {fields.map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="font-body font-semibold text-sm text-slate-700 dark:text-slate-300 block mb-2">
                    {label}
                  </label>
                  <input
                    id={id} type={type} required placeholder={placeholder}
                    value={form[id]}
                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-body text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-4 bg-orange-500 text-white font-heading font-bold text-xl rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
              >
                Complete Order
              </button>
            </form>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 space-y-4 h-fit">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Order summary</h2>
              {items.map(item => (
                <div key={item.id} className="flex justify-between font-body text-sm text-slate-600 dark:text-slate-400">
                  <span className="truncate mr-4">{item.name} × {item.quantity}</span>
                  <span className="flex-shrink-0">R{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
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
                <div className="flex justify-between font-heading font-black text-lg text-orange-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>Total</span><span>R{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm text-center border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading font-black text-2xl text-slate-900 dark:text-white">
              Order placed!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <p className="font-body text-slate-600 dark:text-slate-400">
              Order <span className="font-bold text-orange-500">#{orderId}</span> confirmed.
            </p>
            <p className="font-body text-sm text-slate-500 dark:text-slate-400">
              A local delivery will reach your site within 48 hours.
            </p>
          </div>
          <Link
            to="/"
            onClick={() => setSuccess(false)}
            className="block w-full py-3 bg-orange-500 text-white font-heading font-bold rounded-2xl hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Continue Shopping
          </Link>
        </DialogContent>
      </Dialog>
    </main>
  )
}
