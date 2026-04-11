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
