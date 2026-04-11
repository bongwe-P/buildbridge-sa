import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Heart, Sun, Moon, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useUI } from '../../context/UIContext'

export default function Navbar() {
  const { items: cartItems } = useCart()
  const { items: wishItems } = useWishlist()
  const { setCartOpen, setWishlistOpen, darkMode, toggleDarkMode } = useUI()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const el = progressRef.current
      if (el) {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        el.style.transform = `scaleX(${Math.min(pct, 1)})`
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/estimator', label: 'Smart Estimator' },
  ]

  return (
    <>
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-0.5 bg-orange-500 z-[60] origin-left scale-x-0"
      />
      <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      } px-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-sm border border-white/20`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-heading font-black text-xl text-slate-900 dark:text-white cursor-pointer">
            Build<span className="text-orange-500">Bridge</span> SA
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-body font-medium text-sm transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <Sun className="w-5 h-5 text-slate-300" />
                : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <button
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
              aria-label="Open wishlist"
            >
              <Heart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              {wishItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-body font-semibold text-sm hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartItems.length > 0 && (
                <span className="w-5 h-5 bg-white text-orange-500 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-3">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="font-body font-medium text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
