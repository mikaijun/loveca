import { describe, it, expect } from 'vitest'
import { monochromeHeartService } from '@domain/services/monochromeHeartService'

describe('calculateSummary', () => {
  it('ブレードハートの必要数が正しく計算されること', () => {
    const state = { memberHeartCount: 5, requiredLiveHeartCount: 10 }
    const result = monochromeHeartService.calculateSummary(state)

    expect(result.memberHeartCount).toBe(5)
    expect(result.requiredLiveHeartCount).toBe(10)
    expect(result.requiredBladeHeartCount).toBe(5) // 10 - 5 = 5
    expect(result.isLiveSuccess).toBe(false)
  })

  it('ライブ成功の場合、正しい結果が返されること', () => {
    const state = { memberHeartCount: 15, requiredLiveHeartCount: 10 }
    const result = monochromeHeartService.calculateSummary(state)

    expect(result.memberHeartCount).toBe(15)
    expect(result.requiredLiveHeartCount).toBe(10)
    expect(result.requiredBladeHeartCount).toBe('ライブ成功')
    expect(result.isLiveSuccess).toBe(true)
  })

  it('同数の場合、ライブ成功となること', () => {
    const state = { memberHeartCount: 10, requiredLiveHeartCount: 10 }
    const result = monochromeHeartService.calculateSummary(state)

    expect(result.requiredBladeHeartCount).toBe('ライブ成功')
    expect(result.isLiveSuccess).toBe(true)
  })

  it('必要ハート数が0の場合、ライブ失敗となること', () => {
    const state = { memberHeartCount: 10, requiredLiveHeartCount: 0 }
    const result = monochromeHeartService.calculateSummary(state)

    expect(result.memberHeartCount).toBe(10)
    expect(result.requiredLiveHeartCount).toBe(0)
    expect(result.requiredBladeHeartCount).toBe(0) // Math.max(0 - 10, 0) = 0
    expect(result.isLiveSuccess).toBe(false) // requiredCount > 0 && diffCount <= 0 → false
  })

  it('負の不足数の場合、0が返されることを確認', () => {
    const state = { memberHeartCount: 15, requiredLiveHeartCount: 5 }
    const result = monochromeHeartService.calculateSummary(state)

    expect(result.requiredBladeHeartCount).toBe('ライブ成功')
    expect(result.isLiveSuccess).toBe(true)
  })
})

describe('createInitialState', () => {
  it('初期状態が正しく作成されること', () => {
    const state = monochromeHeartService.createInitialState()

    expect(state.memberHeartCount).toBe(0)
    expect(state.requiredLiveHeartCount).toBe(0)
  })
})
