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
