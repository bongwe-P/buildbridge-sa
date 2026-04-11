# BuildBridge SA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium React eCommerce site for surplus construction materials with scroll animations, 3D effects, Smart Estimator, cart/wishlist, and checkout.

**Architecture:** Single-page React app (Vite) with React Router v6 for 4 routes. All state in React Context + useReducer. Mock product data in a static JS file. No backend.

**Tech Stack:** React 18, Vite, Tailwind CSS, shadcn/ui, React Router v6, Vitest (unit tests on logic only)

---

## File Map

```
src/
  data/products.js                  — 20 mock products array
  context/CartContext.jsx           — cart state + reducer
  context/WishlistContext.jsx       — wishlist state + reducer
  context/UIContext.jsx             — drawer open/close, dark mode
  hooks/useIntersectionObserver.js  — scroll-triggered class toggle
  hooks/useCountUp.js               — animated number counter
  hooks/useCustomCursor.js          — lerp cursor tracking
  hooks/useMagneticButton.js        — magnetic hover offset
  components/layout/Navbar.jsx      — floating navbar + progress bar
  components/layout/Footer.jsx      — dark footer
  components/layout/CustomCursor.jsx
  components/layout/LiveActivityFeed.jsx
  components/landing/HeroSplit.jsx
  components/landing/StatsRow.jsx
  components/landing/ProblemSolution.jsx
  components/landing/HorizontalCategories.jsx
  components/landing/FeaturedListings.jsx
  components/landing/HowItWorks.jsx
  components/landing/SupplierCTA.jsx
  components/shop/ProductCard.jsx
  components/shop/SkeletonCard.jsx
  components/shop/SearchBar.jsx
  components/shop/FilterSidebar.jsx
  components/cart/CartDrawer.jsx
  components/cart/CartItem.jsx
  components/wishlist/WishlistDrawer.jsx
  components/estimator/EstimatorForm.jsx
  components/estimator/ResultPanel.jsx
  components/estimator/WallDiagram.jsx
  components/estimator/RecommendedBundle.jsx
  components/checkout/CheckoutForm.jsx
  components/checkout/SuccessModal.jsx
  components/checkout/Confetti.jsx
  pages/LandingPage.jsx
  pages/ShopPage.jsx
  pages/EstimatorPage.jsx
  pages/CheckoutPage.jsx
  App.jsx
  main.jsx
  index.css
tests/
  cart.test.js
  estimator.test.js
  filter.test.js
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite + React**

```bash
cd /mnt/c/Users/MOTN/Documents/INF3014F/project
npm create vite@latest . -- --template react
npm install
```

Expected: `src/main.jsx`, `src/App.jsx`, `index.html` created.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer vitest @vitest/ui
npx tailwindcss init -p
```

- [ ] **Step 3: Install shadcn**

```bash
npx shadcn@latest init
```

When prompted: TypeScript → No, style → Default, base color → Slate, CSS variables → Yes.

Then add the components we need:

```bash
npx shadcn@latest add sheet dialog badge button
```

- [ ] **Step 4: Configure Tailwind**

Replace `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Rubik', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        orange: {
          500: '#F97316',
        },
        slate: {
          950: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Set up index.css**

Replace `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; font-family: 'Nunito Sans', sans-serif; }
  h1, h2, h3, h4, h5, h6 { font-family: 'Rubik', sans-serif; }
  * { cursor: none; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.clip-reveal {
  clip-path: inset(0 0% 0 0) !important;
}
```

- [ ] **Step 6: Set up Vitest config**

Add to `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Stub App.jsx**

```jsx
// src/App.jsx
export default function App() {
  return <div className="font-body">BuildBridge SA</div>
}
```

- [ ] **Step 8: Verify dev server runs**

```bash
npm run dev
```

Expected: localhost:5173 shows "BuildBridge SA" in Nunito Sans.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind + shadcn"
```

---

## Task 2: Mock Data

**Files:**
- Create: `src/data/products.js`

- [ ] **Step 1: Write products array**

```js
// src/data/products.js
export const products = [
  {
    id: 'p1',
    name: 'Facebrick — Red Clay',
    category: 'bricks',
    condition: 'New Surplus',
    price: 2.80,
    stockQuantity: 8500,
    unit: 'per brick',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    location: 'Bellville',
    urgent: true,
    discount: 55,
    supplierId: 's1',
  },
  {
    id: 'p2',
    name: 'Portland Cement 50kg',
    category: 'cement',
    condition: 'New Surplus',
    price: 89,
    stockQuantity: 200,
    unit: 'per bag',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    location: 'Parow',
    urgent: false,
    discount: 40,
    supplierId: 's1',
  },
  {
    id: 'p3',
    name: 'Pine Timber 38x114mm',
    category: 'timber',
    condition: 'Reclaimed',
    price: 45,
    stockQuantity: 320,
    unit: 'per meter',
    imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&q=80',
    location: 'Maitland',
    urgent: false,
    discount: 60,
    supplierId: 's2',
  },
  {
    id: 'p4',
    name: 'Corrugated Iron Sheet',
    category: 'roofing',
    condition: 'New Surplus',
    price: 180,
    stockQuantity: 90,
    unit: 'per sheet',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    location: 'Khayelitsha',
    urgent: true,
    discount: 45,
    supplierId: 's3',
  },
  {
    id: 'p5',
    name: 'Scaffolding Board 3m',
    category: 'scaffolding',
    condition: 'Reclaimed',
    price: 60,
    stockQuantity: 150,
    unit: 'per board',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    location: 'Mitchells Plain',
    urgent: false,
    discount: 50,
    supplierId: 's2',
  },
  {
    id: 'p6',
    name: 'Maxi Brick — Grey',
    category: 'bricks',
    condition: 'New Surplus',
    price: 3.20,
    stockQuantity: 12000,
    unit: 'per brick',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    location: 'Brackenfell',
    urgent: false,
    discount: 48,
    supplierId: 's4',
  },
  {
    id: 'p7',
    name: 'Rapid Set Cement 25kg',
    category: 'cement',
    condition: 'New Surplus',
    price: 65,
    stockQuantity: 80,
    unit: 'per bag',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    location: 'Goodwood',
    urgent: true,
    discount: 35,
    supplierId: 's4',
  },
  {
    id: 'p8',
    name: 'Meranti Timber 50x50mm',
    category: 'timber',
    condition: 'New Surplus',
    price: 55,
    stockQuantity: 200,
    unit: 'per meter',
    imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&q=80',
    location: 'Epping',
    urgent: false,
    discount: 52,
    supplierId: 's3',
  },
  {
    id: 'p9',
    name: 'Fibre Cement Roofing Sheet',
    category: 'roofing',
    condition: 'Reclaimed',
    price: 95,
    stockQuantity: 45,
    unit: 'per sheet',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    location: 'Strand',
    urgent: false,
    discount: 65,
    supplierId: 's1',
  },
  {
    id: 'p10',
    name: 'Steel Scaffold Frame',
    category: 'scaffolding',
    condition: 'Reclaimed',
    price: 220,
    stockQuantity: 30,
    unit: 'per frame',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    location: 'Bellville',
    urgent: true,
    discount: 70,
    supplierId: 's2',
  },
  {
    id: 'p11',
    name: 'Stock Brick — Cream',
    category: 'bricks',
    condition: 'Reclaimed',
    price: 1.90,
    stockQuantity: 5000,
    unit: 'per brick',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    location: 'Kuils River',
    urgent: false,
    discount: 42,
    supplierId: 's5',
  },
  {
    id: 'p12',
    name: 'OPC Cement 50kg Bulk',
    category: 'cement',
    condition: 'New Surplus',
    price: 79,
    stockQuantity: 500,
    unit: 'per bag',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    location: 'Parow',
    urgent: false,
    discount: 38,
    supplierId: 's5',
  },
]

export const categories = ['bricks', 'cement', 'timber', 'roofing', 'scaffolding']
```

- [ ] **Step 2: Commit**

```bash
git add src/data/products.js
git commit -m "feat: add mock product data"
```

---

## Task 3: Core Logic Tests + Utilities

**Files:**
- Create: `src/utils/estimator.js`, `src/utils/cartReducer.js`, `src/utils/filterProducts.js`
- Create: `tests/estimator.test.js`, `tests/cart.test.js`, `tests/filter.test.js`

- [ ] **Step 1: Write failing estimator test**

```js
// tests/estimator.test.js
import { calculateWall } from '../src/utils/estimator'

test('calculates bricks for 5x1.8 wall', () => {
  const result = calculateWall(5, 1.8)
  expect(result.bricks).toBe(450)
  expect(result.cement).toBe(3)
})

test('calculates cement ceiling', () => {
  const result = calculateWall(3, 2)
  expect(result.bricks).toBe(300)
  expect(result.cement).toBe(2)
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test
```

Expected: `Cannot find module '../src/utils/estimator'`

- [ ] **Step 3: Implement estimator**

```js
// src/utils/estimator.js
export function calculateWall(length, height) {
  const area = length * height
  const bricks = Math.ceil(area * 50)
  const cement = Math.ceil(bricks / 150)
  const sand = Math.ceil(area * 0.02)
  return { area, bricks, cement, sand }
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test
```

- [ ] **Step 5: Write failing cart reducer test**

```js
// tests/cart.test.js
import { cartReducer } from '../src/utils/cartReducer'

const product = { id: 'p1', name: 'Brick', price: 2.80, unit: 'per brick' }

test('adds item to empty cart', () => {
  const state = { items: [], bundleDiscount: false }
  const next = cartReducer(state, { type: 'ADD_ITEM', payload: { product, quantity: 10 } })
  expect(next.items).toHaveLength(1)
  expect(next.items[0].quantity).toBe(10)
})

test('increments quantity if item exists', () => {
  const state = { items: [{ ...product, quantity: 5 }], bundleDiscount: false }
  const next = cartReducer(state, { type: 'ADD_ITEM', payload: { product, quantity: 3 } })
  expect(next.items[0].quantity).toBe(8)
})

test('removes item by id', () => {
  const state = { items: [{ ...product, quantity: 5 }], bundleDiscount: false }
  const next = cartReducer(state, { type: 'REMOVE_ITEM', payload: 'p1' })
  expect(next.items).toHaveLength(0)
})

test('applies bundle discount', () => {
  const state = { items: [], bundleDiscount: false }
  const next = cartReducer(state, { type: 'APPLY_BUNDLE_DISCOUNT' })
  expect(next.bundleDiscount).toBe(true)
})

test('clears cart', () => {
  const state = { items: [{ ...product, quantity: 5 }], bundleDiscount: true }
  const next = cartReducer(state, { type: 'CLEAR_CART' })
  expect(next.items).toHaveLength(0)
  expect(next.bundleDiscount).toBe(false)
})
```

- [ ] **Step 6: Run — expect FAIL**

```bash
npm test
```

- [ ] **Step 7: Implement cart reducer**

```js
// src/utils/cartReducer.js
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existing = state.items.find(i => i.id === product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...product, quantity }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    case 'APPLY_BUNDLE_DISCOUNT':
      return { ...state, bundleDiscount: true }
    case 'CLEAR_CART':
      return { items: [], bundleDiscount: false }
    default:
      return state
  }
}
```

- [ ] **Step 8: Write failing filter test**

```js
// tests/filter.test.js
import { filterProducts } from '../src/utils/filterProducts'
import { products } from '../src/data/products'

test('filters by category', () => {
  const result = filterProducts(products, { query: '', categories: ['bricks'] })
  expect(result.every(p => p.category === 'bricks')).toBe(true)
})

test('filters by search query (case insensitive)', () => {
  const result = filterProducts(products, { query: 'cement', categories: [] })
  expect(result.length).toBeGreaterThan(0)
  expect(result.every(p => p.name.toLowerCase().includes('cement') || p.category === 'cement')).toBe(true)
})

test('returns all when no filters', () => {
  const result = filterProducts(products, { query: '', categories: [] })
  expect(result).toHaveLength(products.length)
})
```

- [ ] **Step 9: Run — expect FAIL**

```bash
npm test
```

- [ ] **Step 10: Implement filter utility**

```js
// src/utils/filterProducts.js
export function filterProducts(products, { query, categories }) {
  return products.filter(p => {
    const matchesQuery =
      query === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = categories.length === 0 || categories.includes(p.category)
    return matchesQuery && matchesCategory
  })
}
```

- [ ] **Step 11: Run all tests — expect PASS**

```bash
npm test
```

Expected: 9 tests pass.

- [ ] **Step 12: Commit**

```bash
git add src/utils/ tests/
git commit -m "feat: core logic utilities with passing tests"
```

---

## Task 4: Context Providers

**Files:**
- Create: `src/context/CartContext.jsx`, `src/context/WishlistContext.jsx`, `src/context/UIContext.jsx`

- [ ] **Step 1: CartContext**

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useMemo } from 'react'
import { cartReducer } from '../utils/cartReducer'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], bundleDiscount: false })

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const discount = state.bundleDiscount ? subtotal * 0.1 : 0
  const platformFee = (subtotal - discount) * 0.075
  const total = subtotal - discount + platformFee

  const value = useMemo(() => ({
    items: state.items,
    bundleDiscount: state.bundleDiscount,
    subtotal,
    discount,
    platformFee,
    total,
    addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateQty: (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
    applyBundleDiscount: () => dispatch({ type: 'APPLY_BUNDLE_DISCOUNT' }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  }), [state, subtotal, discount, platformFee, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
```

- [ ] **Step 2: WishlistContext**

```jsx
// src/context/WishlistContext.jsx
import { createContext, useContext, useReducer, useMemo } from 'react'

const WishlistContext = createContext(null)

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.some(i => i.id === action.payload.id)
        ? state.filter(i => i.id !== action.payload.id)
        : [...state, action.payload]
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload)
    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(wishlistReducer, [])

  const value = useMemo(() => ({
    items,
    toggle: (product) => dispatch({ type: 'TOGGLE', payload: product }),
    remove: (id) => dispatch({ type: 'REMOVE', payload: id }),
    has: (id) => items.some(i => i.id === id),
  }), [items])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
```

- [ ] **Step 3: UIContext**

```jsx
// src/context/UIContext.jsx
import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const value = useMemo(() => ({
    cartOpen, setCartOpen,
    wishlistOpen, setWishlistOpen,
    darkMode, toggleDarkMode: () => setDarkMode(d => !d),
  }), [cartOpen, wishlistOpen, darkMode])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => useContext(UIContext)
```

- [ ] **Step 4: Wire providers into main.jsx**

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { UIProvider } from './context/UIContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 5: Commit**

```bash
git add src/context/ src/main.jsx
git commit -m "feat: cart, wishlist, and UI context providers"
```

---

## Task 5: Custom Hooks

**Files:**
- Create: `src/hooks/useIntersectionObserver.js`, `src/hooks/useCountUp.js`, `src/hooks/useCustomCursor.js`, `src/hooks/useMagneticButton.js`

- [ ] **Step 1: useIntersectionObserver**

```js
// src/hooks/useIntersectionObserver.js
import { useEffect, useRef } from 'react'

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('animate-in')
        observer.unobserve(el)
      }
    }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

- [ ] **Step 2: useCountUp**

```js
// src/hooks/useCountUp.js
import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}
```

- [ ] **Step 3: useCustomCursor**

```js
// src/hooks/useCustomCursor.js
import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      requestAnimationFrame(animate)
    }

    const onEnter = () => ringRef.current?.classList.add('scale-150', 'opacity-50')
    const onLeave = () => ringRef.current?.classList.remove('scale-150', 'opacity-50')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    animate()

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return { dotRef, ringRef }
}
```

- [ ] **Step 4: useMagneticButton**

```js
// src/hooks/useMagneticButton.js
import { useRef } from 'react'

export function useMagneticButton(strength = 0.3) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return { ref, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/
git commit -m "feat: custom animation and cursor hooks"
```

---

## Task 6: Global Layout — Navbar + CustomCursor + LiveActivityFeed

**Files:**
- Create: `src/components/layout/CustomCursor.jsx`, `src/components/layout/Navbar.jsx`, `src/components/layout/LiveActivityFeed.jsx`

- [ ] **Step 1: CustomCursor component**

```jsx
// src/components/layout/CustomCursor.jsx
import { useCustomCursor } from '../../hooks/useCustomCursor'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCustomCursor()
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-none"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-orange-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />
    </>
  )
}
```

- [ ] **Step 2: Navbar**

```jsx
// src/components/layout/Navbar.jsx
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
        el.style.transform = `scaleX(${pct})`
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
      {/* Scroll progress bar */}
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

          {/* Desktop nav */}
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
              {darkMode ? <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
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

        {/* Mobile menu */}
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
```

- [ ] **Step 3: Install lucide-react**

```bash
npm install lucide-react
```

- [ ] **Step 4: LiveActivityFeed**

```jsx
// src/components/layout/LiveActivityFeed.jsx
import { useState, useEffect } from 'react'

const messages = [
  "Sipho in Khayelitsha just saved R1,240 on facebrick",
  "3 pallets of cement listed in Bellville — 2 hours ago",
  "Thabo in Mitchells Plain completed an order of timber",
  "New roofing sheets available in Maitland — R180/sheet",
  "Sarah listed 8,500 surplus bricks from Brackenfell site",
  "Zanele used the Smart Estimator to plan her boundary wall",
]

export default function LiveActivityFeed() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % messages.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-40 max-w-xs bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-green-600 font-body">Live Activity</span>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-200 font-body leading-snug">{messages[index]}</p>
    </div>
  )
}
```

- [ ] **Step 5: Footer**

```jsx
// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading font-black text-2xl mb-3">
            Build<span className="text-orange-500">Bridge</span> SA
          </h3>
          <p className="text-slate-400 font-body text-sm leading-relaxed">
            Connecting construction surplus with community builders across South Africa.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-500 mb-4">Navigate</h4>
          <div className="flex flex-col gap-2">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/estimator', 'Smart Estimator']].map(([to, label]) => (
              <Link key={to} to={to} className="text-slate-400 hover:text-orange-500 transition-colors duration-200 text-sm font-body cursor-pointer">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-500 mb-4">Impact</h4>
          <p className="text-3xl font-heading font-black text-orange-500">2,400+</p>
          <p className="text-slate-400 text-sm font-body">Tonnes diverted from landfill</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-600 text-xs font-body">
        © 2026 BuildBridge SA. Built for INF3014F.
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/
git commit -m "feat: navbar with scroll progress, custom cursor, activity feed, footer"
```

---

## Task 7: Landing Page — Hero Split

**Files:**
- Create: `src/components/landing/HeroSplit.jsx`

- [ ] **Step 1: HeroSplit component**

```jsx
// src/components/landing/HeroSplit.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMagneticButton } from '../../hooks/useMagneticButton'

function MagneticLink({ to, children, className }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticButton(0.25)
  return (
    <Link
      ref={ref}
      to={to}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  )
}

const words = ['Bridging', 'the', 'gap', 'between', 'surplus', '&', 'community.']

export default function HeroSplit() {
  const [active, setActive] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const grainRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex overflow-hidden pt-24">
      {/* Blueprint grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.5"/>
          </pattern>
          <style>{`
            @keyframes driftUp { from { transform: translateY(0); } to { transform: translateY(-40px); } }
            #gridRect { animation: driftUp 8s linear infinite; }
          `}</style>
        </defs>
        <rect id="gridRect" width="100%" height="calc(100% + 40px)" fill="url(#grid)"/>
      </svg>

      {/* Grain overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"/>
      </svg>

      {/* Split panels */}
      <div
        className={`relative flex-1 flex flex-col justify-center px-12 py-20 transition-all duration-500 cursor-pointer group ${
          active === 'supplier' ? 'flex-[0.4]' : active === 'buyer' ? 'flex-[0.6]' : 'flex-[0.5]'
        }`}
        onMouseEnter={() => setActive('buyer')}
        onMouseLeave={() => setActive(null)}
      >
        <div className="max-w-lg">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full font-body mb-6">
            For Builders
          </span>
          <h1 className="font-heading font-black text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.05] mb-6">
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-3"
              >
                <span
                  className="inline-block transition-all duration-700"
                  style={{
                    clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
            Access high-quality surplus construction materials at 50–80% below retail. Build more, spend less.
          </p>
          <MagneticLink
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-heading font-bold text-lg rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
          >
            Browse Materials
          </MagneticLink>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-slate-200 dark:bg-slate-700 self-stretch my-12" />

      <div
        className={`relative flex-1 flex flex-col justify-center px-12 py-20 bg-slate-900 dark:bg-slate-950 transition-all duration-500 cursor-pointer ${
          active === 'buyer' ? 'flex-[0.4]' : active === 'supplier' ? 'flex-[0.6]' : 'flex-[0.5]'
        }`}
        onMouseEnter={() => setActive('supplier')}
        onMouseLeave={() => setActive(null)}
      >
        <div className="max-w-lg">
          <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full font-body mb-6">
            For Contractors
          </span>
          <h2 className="font-heading font-black text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
            Clear surplus. <span className="text-orange-500">Zero</span> dump fees.
          </h2>
          <p className="font-body text-slate-400 text-lg mb-8 leading-relaxed">
            List your site's surplus materials in minutes. Earn ESG credits, avoid landfill costs, and support communities.
          </p>
          <MagneticLink
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-orange-500 text-orange-500 font-heading font-bold text-lg rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
          >
            List Materials
          </MagneticLink>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/HeroSplit.jsx
git commit -m "feat: split hero with clip-path reveal, blueprint grid, magnetic buttons"
```

---

## Task 8: Landing Page — Stats, Problem/Solution, Categories, Listings, How It Works, Supplier CTA

**Files:**
- Create: `src/components/landing/StatsRow.jsx`, `src/components/landing/ProblemSolution.jsx`, `src/components/landing/HorizontalCategories.jsx`, `src/components/landing/FeaturedListings.jsx`, `src/components/landing/HowItWorks.jsx`, `src/components/landing/SupplierCTA.jsx`

- [ ] **Step 1: StatsRow**

```jsx
// src/components/landing/StatsRow.jsx
import { useCountUp } from '../../hooks/useCountUp'

function Stat({ target, suffix, label }) {
  const { count, ref } = useCountUp(target)
  return (
    <div ref={ref} className="relative text-center">
      <div className="absolute inset-0 flex items-center justify-center font-heading font-black text-[10vw] text-slate-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none leading-none">
        {count.toLocaleString()}
      </div>
      <p className="font-heading font-black text-5xl text-orange-500 relative">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="font-body text-slate-600 dark:text-slate-400 mt-2 text-sm">{label}</p>
    </div>
  )
}

export default function StatsRow() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <Stat target={2400} suffix="+" label="Tonnes diverted from landfill" />
        <Stat target={1200000} suffix="" label="Rands saved by community builders" />
        <Stat target={340} suffix="+" label="Community builders served" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: ProblemSolution**

```jsx
// src/components/landing/ProblemSolution.jsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function ProblemSolution() {
  const ref = useIntersectionObserver()
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-3xl p-10">
            <span className="text-xs font-semibold text-red-500 uppercase tracking-widest font-body">The Problem</span>
            <h3 className="font-heading font-black text-3xl text-slate-900 dark:text-white mt-3 mb-4">
              Contractors pay to dump. Builders can't afford to build.
            </h3>
            <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed">
              Construction sites generate thousands of tonnes of usable surplus materials annually — all destined for landfill at a cost. Meanwhile, township builders and community members lack access to affordable, quality materials.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-3xl p-10">
            <span className="text-xs font-semibold text-green-600 uppercase tracking-widest font-body">The Solution</span>
            <h3 className="font-heading font-black text-3xl text-slate-900 dark:text-white mt-3 mb-4">
              BuildBridge connects surplus with community need.
            </h3>
            <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed">
              Our platform creates a direct link: contractors list surplus materials for free, community builders purchase at 50–80% below retail. Zero waste. Zero dump fees. Maximum social impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: HorizontalCategories**

```jsx
// src/components/landing/HorizontalCategories.jsx
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const cats = [
  { name: 'Bricks', count: '12,000+ units', bg: 'bg-orange-50', border: 'border-orange-200', icon: '🧱' },
  { name: 'Cement', count: '700+ bags', bg: 'bg-slate-50', border: 'border-slate-200', icon: '⚪' },
  { name: 'Timber', count: '520+ meters', bg: 'bg-amber-50', border: 'border-amber-200', icon: '🪵' },
  { name: 'Roofing', count: '135+ sheets', bg: 'bg-sky-50', border: 'border-sky-200', icon: '🏠' },
  { name: 'Scaffolding', count: '180+ pieces', bg: 'bg-green-50', border: 'border-green-200', icon: '🔩' },
]

export default function HorizontalCategories() {
  const ref = useIntersectionObserver()
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-black text-4xl text-slate-900 dark:text-white mb-3">
          Browse by category
        </h2>
        <p className="font-body text-slate-600 dark:text-slate-400 mb-10">Everything a builder needs, sourced from construction surplus.</p>
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto pb-4 opacity-0 translate-y-8 transition-all duration-700 scrollbar-hide"
        >
          {cats.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name.toLowerCase()}`}
              className={`flex-shrink-0 w-56 rounded-2xl border ${cat.bg} ${cat.border} dark:bg-slate-800 dark:border-slate-700 p-6 cursor-pointer hover:scale-105 hover:rotate-1 transition-transform duration-200 group`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-4xl mb-4 block">{cat.icon}</span>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{cat.name}</h3>
              <p className="font-body text-sm text-slate-500 dark:text-slate-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: FeaturedListings**

```jsx
// src/components/landing/FeaturedListings.jsx
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../shop/ProductCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

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
          <Link to="/shop" className="font-body font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer">
            View all →
          </Link>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 translate-y-8 transition-all duration-700"
        >
          {featured.map((product, i) => (
            <div key={product.id} style={{ transitionDelay: `${i * 80}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: HowItWorks**

```jsx
// src/components/landing/HowItWorks.jsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const steps = [
  { n: '01', title: 'Browse surplus', desc: 'Search materials by category, location, or use the Smart Estimator to calculate exactly what you need.' },
  { n: '02', title: 'Add to cart', desc: 'Select quantities, apply bundle discounts, and review pricing before checkout.' },
  { n: '03', title: 'Confirm & deliver', desc: 'Complete your order. A local bakkie driver delivers to your site within 48 hours.' },
]

export default function HowItWorks() {
  const ref = useIntersectionObserver()
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-black text-4xl text-slate-900 dark:text-white mb-16 text-center">How it works</h2>
        <div
          ref={ref}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-orange-200 dark:bg-orange-900" />
          {steps.map((step, i) => (
            <div key={step.n} className="relative text-center" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-16 h-16 bg-orange-500 text-white font-heading font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                {step.n}
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">{step.title}</h3>
              <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: SupplierCTA**

```jsx
// src/components/landing/SupplierCTA.jsx
export default function SupplierCTA() {
  return (
    <section className="py-24 px-6 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full font-body mb-6 uppercase tracking-widest">
          For Contractors
        </span>
        <h2 className="font-heading font-black text-5xl text-white leading-tight mb-6">
          Got surplus materials sitting on site?
        </h2>
        <p className="font-body text-slate-400 text-lg mb-10 leading-relaxed">
          List them on BuildBridge SA for free. Avoid dump fees, earn ESG compliance points, and directly support township communities in the Western Cape.
        </p>
        <button
          onClick={() => alert('Supplier onboarding coming soon! Contact us at suppliers@buildbridgesa.co.za')}
          className="px-10 py-5 bg-orange-500 text-white font-heading font-bold text-xl rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
        >
          List Your Surplus — It's Free
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/
git commit -m "feat: landing page sections — stats, problem/solution, categories, listings, how it works, CTA"
```

---

## Task 9: ProductCard + SkeletonCard

**Files:**
- Create: `src/components/shop/ProductCard.jsx`, `src/components/shop/SkeletonCard.jsx`

- [ ] **Step 1: ProductCard**

```jsx
// src/components/shop/ProductCard.jsx
import { useRef, useState } from 'react'
import { Heart, ShoppingCart, MapPin } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product }) {
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
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)'
  }

  const handleAddToCart = (e) => {
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
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 transition-shadow duration-200 hover:shadow-xl group"
      style={{ transition: 'transform 0.15s ease, box-shadow 0.2s ease' }}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.urgent && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg font-body animate-pulse">
            Urgent Clearance
          </span>
        )}
        <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-lg font-body">
          -{product.discount}% off retail
        </span>
        <button
          onClick={() => toggle(product)}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-md transition-transform duration-150 hover:scale-110 cursor-pointer"
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${isWished ? 'fill-orange-500 text-orange-500' : 'text-slate-400'}`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 text-sky-500" />
          <span className="text-xs text-sky-600 font-body">{product.location}</span>
          <span className="ml-auto text-xs text-slate-400 font-body bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
            {product.condition}
          </span>
        </div>
        <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base leading-tight mb-3">
          {product.name}
        </h3>
        <div className="flex items-end justify-between">
          <div>
            <span className="font-heading font-black text-2xl text-orange-500">R{product.price.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-body ml-1">{product.unit}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-semibold text-sm transition-all duration-200 cursor-pointer ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {added ? (
              '✓ Added'
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: SkeletonCard**

```jsx
// src/components/shop/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="h-48 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
      </div>
    </div>
  )
}
```

Add to `tailwind.config.js` theme.extend:
```js
keyframes: {
  shimmer: { '100%': { transform: 'translateX(100%)' } },
},
```

- [ ] **Step 3: Commit**

```bash
git add src/components/shop/ProductCard.jsx src/components/shop/SkeletonCard.jsx tailwind.config.js
git commit -m "feat: 3D tilt product card with wishlist heart and skeleton loader"
```

---

## Task 10: Shop Page

**Files:**
- Create: `src/components/shop/SearchBar.jsx`, `src/components/shop/FilterSidebar.jsx`, `src/pages/ShopPage.jsx`

- [ ] **Step 1: SearchBar**

```jsx
// src/components/shop/SearchBar.jsx
import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search materials, locations..."
        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-body text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
      />
    </div>
  )
}
```

- [ ] **Step 2: FilterSidebar**

```jsx
// src/components/shop/FilterSidebar.jsx
import { categories } from '../../data/products'

export default function FilterSidebar({ selected, onChange }) {
  const toggle = (cat) => {
    onChange(selected.includes(cat) ? selected.filter(c => c !== cat) : [...selected, cat])
  }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
      <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-4">Filter by category</h3>
      <div className="flex flex-col gap-3">
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggle(cat)}
              className="w-4 h-4 accent-orange-500 cursor-pointer"
            />
            <span className="font-body text-sm text-slate-700 dark:text-slate-300 capitalize group-hover:text-orange-500 transition-colors duration-150">
              {cat}
            </span>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="mt-4 text-xs text-orange-500 font-body hover:text-orange-600 cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: ShopPage**

```jsx
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
```

- [ ] **Step 4: Commit**

```bash
git add src/components/shop/SearchBar.jsx src/components/shop/FilterSidebar.jsx src/pages/ShopPage.jsx
git commit -m "feat: shop page with live search, category filters, skeleton loader"
```

---

## Task 11: Smart Estimator Page

**Files:**
- Create: `src/components/estimator/EstimatorForm.jsx`, `src/components/estimator/WallDiagram.jsx`, `src/components/estimator/ResultPanel.jsx`, `src/components/estimator/RecommendedBundle.jsx`, `src/pages/EstimatorPage.jsx`

- [ ] **Step 1: WallDiagram**

```jsx
// src/components/estimator/WallDiagram.jsx
export default function WallDiagram({ length, height }) {
  const maxW = 300
  const maxH = 180
  const scale = Math.min(maxW / Math.max(length, 1), maxH / Math.max(height, 1))
  const w = Math.max(length * scale, 20)
  const h = Math.max(height * scale, 20)
  const rows = Math.max(Math.round(height * 5), 1)
  const cols = Math.max(Math.round(length * 4), 1)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={maxW + 40} height={maxH + 40} className="transition-all duration-300">
        <g transform={`translate(20, ${maxH - h + 20})`}>
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * (w / cols) + 1}
                y={r * (h / rows) + 1}
                width={w / cols - 2}
                height={h / rows - 2}
                rx="1"
                fill="#FB923C"
                opacity="0.7"
                className="transition-all duration-300"
              />
            ))
          )}
          <rect x={0} y={0} width={w} height={h} fill="none" stroke="#F97316" strokeWidth="2" rx="2" />
          <line x1={0} y1={h + 8} x2={w} y2={h + 8} stroke="#64748B" strokeWidth="1" markerEnd="url(#arrow)" />
          <text x={w / 2} y={h + 20} textAnchor="middle" className="font-body" fontSize="10" fill="#64748B">{length}m</text>
          <line x1={w + 8} y1={0} x2={w + 8} y2={h} stroke="#64748B" strokeWidth="1" />
          <text x={w + 20} y={h / 2} textAnchor="middle" fontSize="10" fill="#64748B" transform={`rotate(90, ${w + 20}, ${h / 2})`}>{height}m</text>
        </g>
      </svg>
      <p className="font-body text-xs text-slate-500">Live wall preview</p>
    </div>
  )
}
```

- [ ] **Step 2: EstimatorForm**

```jsx
// src/components/estimator/EstimatorForm.jsx
import { useState } from 'react'
import { calculateWall } from '../../utils/estimator'

export default function EstimatorForm({ onResult }) {
  const [length, setLength] = useState(5)
  const [height, setHeight] = useState(1.8)

  const handleCalc = () => {
    const result = calculateWall(Number(length), Number(height))
    onResult({ length: Number(length), height: Number(height), ...result })
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="font-body font-semibold text-slate-700 dark:text-slate-300 text-sm block mb-3">
          Wall Length: <span className="text-orange-500 font-bold">{length}m</span>
        </label>
        <input
          type="range" min="1" max="20" step="0.5" value={length}
          onChange={e => { setLength(e.target.value); handleCalc() }}
          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 font-body mt-1"><span>1m</span><span>20m</span></div>
      </div>

      <div>
        <label className="font-body font-semibold text-slate-700 dark:text-slate-300 text-sm block mb-3">
          Wall Height: <span className="text-orange-500 font-bold">{height}m</span>
        </label>
        <input
          type="range" min="0.5" max="5" step="0.1" value={height}
          onChange={e => { setHeight(e.target.value); handleCalc() }}
          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 font-body mt-1"><span>0.5m</span><span>5m</span></div>
      </div>

      <button
        onClick={handleCalc}
        className="w-full py-4 bg-orange-500 text-white font-heading font-bold text-lg rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
      >
        Calculate Materials
      </button>
    </div>
  )
}
```

- [ ] **Step 3: RecommendedBundle**

```jsx
// src/components/estimator/RecommendedBundle.jsx
import { ShoppingCart } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function RecommendedBundle({ bricks, cement }) {
  const { addItem, applyBundleDiscount } = useCart()

  const matchedBricks = products.find(p => p.category === 'bricks' && p.stockQuantity >= bricks)
  const matchedCement = products.find(p => p.category === 'cement' && p.stockQuantity >= cement)

  const handleAddBundle = () => {
    if (matchedBricks) addItem(matchedBricks, bricks)
    if (matchedCement) addItem(matchedCement, cement)
    applyBundleDiscount()
  }

  if (!matchedBricks && !matchedCement) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 text-center">
        <p className="font-body text-red-600">No matching surplus stock found. Check back soon.</p>
      </div>
    )
  }

  const subtotal = (matchedBricks ? matchedBricks.price * bricks : 0) + (matchedCement ? matchedCement.price * cement : 0)

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
        className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-white font-heading font-bold text-lg rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
      >
        <ShoppingCart className="w-5 h-5" />
        Add Bundle to Cart (10% Off)
      </button>
    </div>
  )
}
```

- [ ] **Step 4: EstimatorPage**

```jsx
// src/pages/EstimatorPage.jsx
import { useState } from 'react'
import EstimatorForm from '../components/estimator/EstimatorForm'
import WallDiagram from '../components/estimator/WallDiagram'
import RecommendedBundle from '../components/estimator/RecommendedBundle'

export default function EstimatorPage() {
  const [result, setResult] = useState({ length: 5, height: 1.8, bricks: 450, cement: 3, sand: 0.18 })

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full font-body mb-4 uppercase tracking-widest">
            Custom Feature
          </span>
          <h1 className="font-heading font-black text-5xl text-slate-900 dark:text-white mb-3">
            Smart Project <span className="text-orange-500">Estimator</span>
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Enter your wall dimensions. We calculate exactly what you need and match it to available surplus stock — no guessing, no overbuying.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: form + diagram */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8">
              <EstimatorForm onResult={setResult} />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center">
              <WallDiagram length={result.length} height={result.height} />
            </div>
          </div>

          {/* Right: results */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">Materials Required</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Bricks', value: result.bricks?.toLocaleString(), unit: 'units' },
                  { label: 'Cement', value: result.cement, unit: 'bags' },
                  { label: 'Sand', value: result.sand?.toFixed(2), unit: 'm³ (source locally)' },
                ].map(({ label, value, unit }) => (
                  <div key={label} className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
                    <p className="font-heading font-black text-3xl text-orange-500">{value}</p>
                    <p className="font-body text-xs text-slate-500 dark:text-slate-400 mt-1">{unit}</p>
                    <p className="font-body text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {result.bricks && (
              <RecommendedBundle bricks={result.bricks} cement={result.cement} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/estimator/ src/pages/EstimatorPage.jsx
git commit -m "feat: smart estimator with live SVG wall diagram and bundle matching"
```

---

## Task 12: Cart Drawer + Wishlist Drawer

**Files:**
- Create: `src/components/cart/CartItem.jsx`, `src/components/cart/CartDrawer.jsx`, `src/components/wishlist/WishlistDrawer.jsx`

- [ ] **Step 1: CartItem**

```jsx
// src/components/cart/CartItem.jsx
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
```

- [ ] **Step 2: CartDrawer**

```jsx
// src/components/cart/CartDrawer.jsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
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
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-white dark:bg-slate-900">
        <SheetHeader>
          <SheetTitle className="font-heading font-black text-xl text-slate-900 dark:text-white">
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <p className="font-heading font-bold text-2xl text-slate-300">Your cart is empty</p>
            <button onClick={() => { setCartOpen(false); navigate('/shop') }} className="text-orange-500 font-body font-semibold cursor-pointer">Browse materials →</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mt-4">
              {items.map(item => <CartItem key={item.id} item={item} />)}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2">
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
```

- [ ] **Step 3: WishlistDrawer**

```jsx
// src/components/wishlist/WishlistDrawer.jsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
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
      <SheetContent className="w-full sm:max-w-md bg-white dark:bg-slate-900">
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
                <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-xl object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-slate-900 dark:text-white truncate">{item.name}</p>
                  <p className="font-heading font-bold text-orange-500 text-sm">R{item.price.toFixed(2)} {item.unit}</p>
                </div>
                <button onClick={() => addItem(item, 1)} className="px-3 py-2 bg-orange-500 text-white text-xs font-semibold rounded-xl hover:bg-orange-600 transition-colors cursor-pointer">Add</button>
                <button onClick={() => remove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/cart/ src/components/wishlist/
git commit -m "feat: cart drawer with quantity controls and wishlist drawer"
```

---

## Task 13: Checkout Page + Confetti + Success Modal

**Files:**
- Create: `src/components/checkout/Confetti.jsx`, `src/components/checkout/SuccessModal.jsx`, `src/pages/CheckoutPage.jsx`

- [ ] **Step 1: Confetti**

```jsx
// src/components/checkout/Confetti.jsx
import { useEffect } from 'react'

const COLORS = ['#F97316', '#0EA5E9', '#22C55E', '#EAB308', '#EC4899']

export default function Confetti() {
  useEffect(() => {
    const container = document.getElementById('confetti-container')
    if (!container) return

    const pieces = Array.from({ length: 60 }).map(() => {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        left: ${Math.random() * 100}vw;
        top: -20px;
        z-index: 9999;
        pointer-events: none;
        animation: fall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards;
      `
      container.appendChild(el)
      return el
    })

    const style = document.createElement('style')
    style.textContent = `
      @keyframes fall {
        to { transform: translateY(105vh) rotate(${720 + Math.random() * 360}deg); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    const cleanup = setTimeout(() => {
      pieces.forEach(el => el.remove())
      style.remove()
    }, 3500)

    return () => {
      clearTimeout(cleanup)
      pieces.forEach(el => el.remove())
    }
  }, [])

  return <div id="confetti-container" className="fixed inset-0 pointer-events-none z-[9999]" />
}
```

- [ ] **Step 2: CheckoutPage**

```jsx
// src/pages/CheckoutPage.jsx
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Confetti from '../components/checkout/Confetti'
import { Link } from 'react-router-dom'

function genOrderId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function CheckoutPage() {
  const { items, subtotal, discount, platformFee, total, bundleDiscount, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [success, setSuccess] = useState(false)
  const [orderId] = useState(genOrderId)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfetti(true)
    setSuccess(true)
    clearCart()
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 dark:bg-slate-950">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading font-black text-4xl text-slate-900 dark:text-white mb-10">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 space-y-6">
            <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Delivery details</h2>
            {[
              { id: 'name', label: 'Full name', type: 'text', placeholder: 'Sipho Ndlovu' },
              { id: 'phone', label: 'Phone number', type: 'tel', placeholder: '071 234 5678' },
              { id: 'address', label: 'Delivery address', type: 'text', placeholder: '12 Mandela Ave, Khayelitsha' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="font-body font-semibold text-sm text-slate-700 dark:text-slate-300 block mb-2">{label}</label>
                <input
                  id={id} type={type} required placeholder={placeholder}
                  value={form[id]}
                  onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            ))}
            <button type="submit" className="w-full py-4 bg-orange-500 text-white font-heading font-bold text-xl rounded-2xl hover:bg-orange-600 transition-colors duration-200 cursor-pointer">
              Complete Order
            </button>
          </form>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 h-fit space-y-4">
            <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Order summary</h2>
            {items.map(item => (
              <div key={item.id} className="flex justify-between font-body text-sm text-slate-600 dark:text-slate-400">
                <span>{item.name} × {item.quantity}</span>
                <span>R{(item.price * item.quantity).toFixed(2)}</span>
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
      </div>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="bg-white dark:bg-slate-800 rounded-3xl text-center max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading font-black text-2xl text-slate-900 dark:text-white">Order placed!</DialogTitle>
          </DialogHeader>
          <p className="font-body text-slate-600 dark:text-slate-400 mt-2">
            Your order <span className="font-bold text-orange-500">#{orderId}</span> is confirmed. A local delivery will reach you within 48 hours.
          </p>
          <Link
            to="/"
            onClick={() => setSuccess(false)}
            className="mt-6 inline-block w-full py-3 bg-orange-500 text-white font-heading font-bold rounded-2xl hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Continue Shopping
          </Link>
        </DialogContent>
      </Dialog>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/checkout/ src/pages/CheckoutPage.jsx
git commit -m "feat: checkout page with confetti burst and success modal"
```

---

## Task 14: Wire App Together + LandingPage

**Files:**
- Create: `src/pages/LandingPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: LandingPage**

```jsx
// src/pages/LandingPage.jsx
import HeroSplit from '../components/landing/HeroSplit'
import StatsRow from '../components/landing/StatsRow'
import ProblemSolution from '../components/landing/ProblemSolution'
import HorizontalCategories from '../components/landing/HorizontalCategories'
import FeaturedListings from '../components/landing/FeaturedListings'
import HowItWorks from '../components/landing/HowItWorks'
import SupplierCTA from '../components/landing/SupplierCTA'

export default function LandingPage() {
  return (
    <>
      <HeroSplit />
      <StatsRow />
      <ProblemSolution />
      <HorizontalCategories />
      <FeaturedListings />
      <HowItWorks />
      <SupplierCTA />
    </>
  )
}
```

- [ ] **Step 2: App.jsx**

```jsx
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
    <div className="font-body bg-slate-50 dark:bg-slate-950 min-h-screen">
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
```

- [ ] **Step 3: Run dev server and verify all routes work**

```bash
npm run dev
```

Check: `/` loads hero, `/shop` loads product grid, `/estimator` loads form, `/checkout` loads checkout.

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all 9 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/pages/LandingPage.jsx src/App.jsx
git commit -m "feat: wire all routes and components into complete app"
```

---

## Task 15: Final Polish

**Files:**
- Modify: `src/index.css`, `tailwind.config.js`

- [ ] **Step 1: Add scrollbar-hide utility**

Add to `tailwind.config.js` plugins:
```js
plugins: [
  function({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      },
    })
  },
],
```

- [ ] **Step 2: Test at all breakpoints**

Open dev tools, test at 375px (mobile), 768px (tablet), 1024px, 1440px.

Fix any overflow or layout issues found.

- [ ] **Step 3: Verify accessibility**

- All images have `alt` text
- All icon-only buttons have `aria-label`
- Tab through the page — focus rings should be visible
- Cart and wishlist counts update in navbar

- [ ] **Step 4: Build for production**

```bash
npm run build
npm run preview
```

Expected: build succeeds, preview runs on localhost:4173.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: BuildBridge SA complete — production build verified"
```

---

## Self-Review

**Spec coverage check:**
- [x] Landing page with hero, stats, problem/solution, categories, listings, how it works, CTA
- [x] Shop with search, category filter, skeleton loader, product cards
- [x] Smart Estimator with wall diagram, bundle match, 10% discount
- [x] Cart drawer with quantity controls, bundle discount, platform fee
- [x] Wishlist slide-out
- [x] Checkout with form, confetti, success modal
- [x] Dark mode via `class="dark"` on `<html>`
- [x] Custom cursor (desktop only)
- [x] Magnetic buttons on hero CTAs
- [x] Scroll progress bar
- [x] Live activity feed
- [x] 3D card tilt
- [x] Number count-up on scroll
- [x] Clip-path hero text reveal
- [x] Blueprint SVG grid + grain overlay
- [x] `prefers-reduced-motion` respected
- [x] All animations use `transform`/`opacity` only

**Type consistency:** `cartReducer` uses `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `APPLY_BUNDLE_DISCOUNT`, `CLEAR_CART` — all consistent across context and tests.

**Placeholders:** None found.
