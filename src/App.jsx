// src/App.jsx
import { Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <div className="font-body bg-white dark:bg-slate-950 min-h-screen">
      <CustomCursor />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
      <LiveActivityFeed />
    </div>
  )
}
