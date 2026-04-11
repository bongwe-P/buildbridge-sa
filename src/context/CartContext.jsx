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
