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
