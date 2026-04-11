// src/utils/estimator.js
export function calculateWall(length, height) {
  const area = length * height
  const bricks = Math.ceil(area * 50)
  const cement = Math.ceil(bricks / 150)
  const sand = Math.ceil(area * 0.02 * 100) / 100
  return { area, bricks, cement, sand }
}
