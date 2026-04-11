import { filterProducts } from '../src/utils/filterProducts'

const products = [
  { id: '1', name: 'Red Brick', category: 'bricks', location: 'Bellville' },
  { id: '2', name: 'Portland Cement', category: 'cement', location: 'Parow' },
  { id: '3', name: 'Pine Timber', category: 'timber', location: 'Maitland' },
]

test('filters by category', () => {
  const result = filterProducts(products, { query: '', categories: ['bricks'] })
  expect(result.every(p => p.category === 'bricks')).toBe(true)
})

test('filters by search query (case insensitive)', () => {
  const result = filterProducts(products, { query: 'cement', categories: [] })
  expect(result.length).toBeGreaterThan(0)
  expect(result[0].category).toBe('cement')
})

test('returns all when no filters', () => {
  const result = filterProducts(products, { query: '', categories: [] })
  expect(result).toHaveLength(3)
})
