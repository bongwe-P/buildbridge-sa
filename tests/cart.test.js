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
