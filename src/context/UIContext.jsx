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
