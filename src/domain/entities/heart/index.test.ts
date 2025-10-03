import { describe, it, expect } from 'vitest'
import {
  getDisplayCount,
  getEffectiveCount,
  isMemberHeart,
  isRequiredLiveHeart,
  withDecrementedCount,
  withIncrementedCount,
  type Heart,
} from '@domain/entities/heart'

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

describe('isMemberHeart', () => {
  it('gray以外の色の場合、trueが返されること', () => {
    const heart: Heart = { color: 'pink', count: 1, visibility: true }
    const actual = isMemberHeart(heart)

    expect(actual).toBe(true)
  })

  it('grayの場合、falseが返されること', () => {
    const heart: Heart = { color: 'gray', count: 1, visibility: true }
    const actual = isMemberHeart(heart)

    expect(actual).toBe(false)
  })

  it('allの場合、trueが返されること', () => {
    const heart: Heart = { color: 'all', count: 1, visibility: true }
    const actual = isMemberHeart(heart)

    expect(actual).toBe(true)
  })
})

describe('isRequiredLiveHeart', () => {
  it('all以外の色の場合、trueが返されること', () => {
    const heart: Heart = { color: 'pink', count: 1, visibility: true }
    const actual = isRequiredLiveHeart(heart)

    expect(actual).toBe(true)
  })

  it('allの場合、falseが返されること', () => {
    const heart: Heart = { color: 'all', count: 1, visibility: true }
    const actual = isRequiredLiveHeart(heart)

    expect(actual).toBe(false)
  })

  it('grayの場合、trueが返されること', () => {
    const heart: Heart = { color: 'gray', count: 1, visibility: true }
    const actual = isRequiredLiveHeart(heart)

    expect(actual).toBe(true)
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
