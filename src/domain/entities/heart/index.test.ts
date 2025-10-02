import { describe, it, expect } from 'vitest'
import {
  getEffectiveCount,
  withIncrementedCount,
  withDecrementedCount,
} from './index'
import { Heart } from './index'
import { HeartColor } from '@domain/valueObjects/heartColor'

// テストヘルパー関数
const createTestHeart = (count: number, visibility: boolean): Heart => {
  const color: HeartColor = { value: 'pink' }
  return { color, count, visibility }
}

describe('getEffectiveCount', () => {
  it('visibilityがtrueの場合、countが返されること', () => {
    const heart = createTestHeart(5, true)
    const result = getEffectiveCount(heart)
    expect(result).toBe(5)
  })

  it('visibilityがfalseの場合、0が返されること', () => {
    const heart = createTestHeart(5, false)
    const result = getEffectiveCount(heart)
    expect(result).toBe(0)
  })

  it('countが0でvisibilityがtrueの場合、0が返されること', () => {
    const heart = createTestHeart(0, true)
    const result = getEffectiveCount(heart)
    expect(result).toBe(0)
  })
})

describe('withIncrementedCount', () => {
  it('最大値（40）に達したときそれ以上増えないことを確認', () => {
    let heart = createTestHeart(39, true)

    // 39 → 40
    heart = withIncrementedCount(heart)
    expect(heart.count).toBe(40)

    // 40 → 40（増えない）
    heart = withIncrementedCount(heart)
    expect(heart.count).toBe(40)
  })
})

describe('withDecrementedCount', () => {
  it('最小値（0）に達したときそれ以下にならないことを確認', () => {
    let heart = createTestHeart(1, true)

    // 1 → 0
    heart = withDecrementedCount(heart)
    expect(heart.count).toBe(0)

    // 0 → 0（減らない）
    heart = withDecrementedCount(heart)
    expect(heart.count).toBe(0)
  })
})
