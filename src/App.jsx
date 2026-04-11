// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import LiveActivityFeed from './components/layout/LiveActivityFeed'
import CartDrawer from './components/cart/CartDrawer'
import WishlistDrawer from './components/wishlist/WishlistDrawer'
import LandingPage from './pages/LandingPage'
import ShopPage from './pages/ShopPage'
import EstimatorPage from './pages/EstimatorPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <div className="font-body bg-white dark:bg-slate-950 min-h-screen">
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about"   element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <LiveActivityFeed />
    </div>
  )
}
