import { describe, it, expect } from 'vitest'
import {
  getEffectiveCount,
  withIncrementedCount,
  withDecrementedCount,
  createHeart,
  getDisplayCount,
} from './index'
import { Heart } from './index'

describe('createHeart', () => {
  it('正しくHeartオブジェクトが作成されること', () => {
    const actual = createHeart('pink')

    const expected: Heart = { color: 'pink', count: 0, visibility: true }
    expect(actual).toMatchObject(expected)
  })
})

describe('getDisplayCount', () => {
  it('正しくcountが返されること', () => {
    const heart: Heart = { color: 'pink', count: 5, visibility: true }
    const actual = getDisplayCount(heart)

    const expected = heart.count
    expect(actual).toBe(expected)
  })
})

describe('getEffectiveCount', () => {
  it('visibilityがtrueの場合、countが返されること', () => {
    const heart: Heart = { color: 'pink', count: 5, visibility: true }
    const actual = getEffectiveCount(heart)

    const expected = heart.count
    expect(actual).toBe(expected)
  })

  it('visibilityがfalseの場合、0が返されること', () => {
    const heart: Heart = { color: 'pink', count: 5, visibility: false }
    const actual = getEffectiveCount(heart)

    const expected = 0
    expect(actual).toBe(expected)
  })
})

describe('withDecrementedCount', () => {
  it('正しくcountが1減ること', () => {
    const heart: Heart = { color: 'pink', count: 5, visibility: true }
    const actual = withDecrementedCount(heart)

    const expected = { ...heart, count: heart.count - 1 }
    expect(actual).toMatchObject(expected)
  })

  it('countが0の場合、countが0のままであること', () => {
    const heart: Heart = { color: 'pink', count: 0, visibility: true }
    const actual = withDecrementedCount(heart)

    const expected = heart
    expect(actual).toMatchObject(expected)
  })
})

describe('withIncrementedCount', () => {
  it('正しくcountが1増えること', () => {
    const heart: Heart = { color: 'pink', count: 5, visibility: true }
    const actual = withIncrementedCount(heart)

    const expected = { ...heart, count: heart.count + 1 }
    expect(actual).toMatchObject(expected)
  })
})
