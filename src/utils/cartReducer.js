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
