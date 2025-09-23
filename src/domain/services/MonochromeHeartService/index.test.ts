import { describe, it, expect } from 'vitest'
import { MonochromeHeartService } from '@domain/services/MonochromeHeartService'

describe('MonochromeHeartService', () => {
  describe('calculateSummary', () => {
    it('ブレードハートの必要数が正しく計算されること', () => {
      const state = { memberHeartCount: 5, requiredLiveHeartCount: 10 }
      const result = MonochromeHeartService.calculateSummary(state)

      expect(result.memberHeartCount).toBe(5)
      expect(result.requiredLiveHeartCount).toBe(10)
      expect(result.requiredBladeHeartCount).toBe(5) // 10 - 5 = 5
      expect(result.isLiveSuccess).toBe(false)
    })

    it('ライブ成功の場合、正しい結果が返されること', () => {
      const state = { memberHeartCount: 15, requiredLiveHeartCount: 10 }
      const result = MonochromeHeartService.calculateSummary(state)

      expect(result.memberHeartCount).toBe(15)
      expect(result.requiredLiveHeartCount).toBe(10)
      expect(result.requiredBladeHeartCount).toBe('ライブ成功')
      expect(result.isLiveSuccess).toBe(true)
    })

    it('同数の場合、ライブ成功となること', () => {
      const state = { memberHeartCount: 10, requiredLiveHeartCount: 10 }
      const result = MonochromeHeartService.calculateSummary(state)

      expect(result.requiredBladeHeartCount).toBe('ライブ成功')
      expect(result.isLiveSuccess).toBe(true)
    })
  })

  describe('createInitialState', () => {
    it('初期状態が正しく作成されること', () => {
      const state = MonochromeHeartService.createInitialState()

      expect(state.memberHeartCount).toBe(0)
      expect(state.requiredLiveHeartCount).toBe(0)
    })
  })
})
