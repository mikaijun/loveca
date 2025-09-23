import { describe, it, expect } from 'vitest'
import { ColorfulHeartService } from '@domain/services/ColorfulHeartService'

describe('ColorfulHeartService', () => {
  describe('createInitialState', () => {
    it('初期状態が正しく作成されること', () => {
      const state = ColorfulHeartService.createInitialState()
      const summary = ColorfulHeartService.calculateSummary(state)

      expect(summary.requiredLiveHeartCount).toBe(0)
      expect(summary.memberHeartCount).toBe(0)
      expect(summary.totalRequiredBladeHearts).toBe(0)
      expect(summary.canSucceedLive).toBe(false)
    })
  })

  describe('incrementRequiredLiveHeart', () => {
    it('ライブハートのインクリメントが正しく動作すること', () => {
      let state = ColorfulHeartService.createInitialState()

      state = ColorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
      const summary = ColorfulHeartService.calculateSummary(state)

      expect(summary.requiredLiveHeartCount).toBe(1)
    })
  })

  describe('decrementRequiredLiveHeart', () => {
    it('ライブハートのデクリメントが正しく動作すること', () => {
      let state = ColorfulHeartService.createInitialState()

      // 先にインクリメント
      state = ColorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
      state = ColorfulHeartService.incrementRequiredLiveHeart(state, 'pink')

      // デクリメント
      state = ColorfulHeartService.decrementRequiredLiveHeart(state, 'pink')
      const summary = ColorfulHeartService.calculateSummary(state)

      expect(summary.requiredLiveHeartCount).toBe(1)
    })
  })

  describe('incrementMemberHeart', () => {
    it('メンバーハートのインクリメントが正しく動作すること', () => {
      let state = ColorfulHeartService.createInitialState()

      state = ColorfulHeartService.incrementMemberHeart(state, 'pink')
      const summary = ColorfulHeartService.calculateSummary(state)

      expect(summary.memberHeartCount).toBe(1)
    })
  })

  describe('resetAllHeartCounts', () => {
    it('全てのハートカウントがリセットされること', () => {
      let state = ColorfulHeartService.createInitialState()

      // ハートを追加
      state = ColorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
      state = ColorfulHeartService.incrementMemberHeart(state, 'blue')

      // リセット
      state = ColorfulHeartService.resetAllHeartCounts(state)
      const summary = ColorfulHeartService.calculateSummary(state)

      expect(summary.requiredLiveHeartCount).toBe(0)
      expect(summary.memberHeartCount).toBe(0)
    })
  })

  describe('calculateSummary', () => {
    it('ライブ成功判定が正しく動作すること', () => {
      let state = ColorfulHeartService.createInitialState()

      // ライブに必要なハートを設定
      state = ColorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
      state = ColorfulHeartService.incrementRequiredLiveHeart(state, 'pink')

      // メンバーハートを必要数以上追加してライブ成功にする
      for (let i = 0; i < 5; i++) {
        state = ColorfulHeartService.incrementMemberHeart(state, 'pink')
      }

      const summary = ColorfulHeartService.calculateSummary(state)
      expect(summary.canSucceedLive).toBe(true)
    })

    it('表示色リストの更新が正しく動作すること', () => {
      let state = ColorfulHeartService.createInitialState()

      state = ColorfulHeartService.incrementMemberHeart(state, 'pink')
      state = ColorfulHeartService.incrementMemberHeart(state, 'blue')

      const summary = ColorfulHeartService.calculateSummary(state)
      expect(summary.memberHeartColors).toContain('pink')
      expect(summary.memberHeartColors).toContain('blue')
    })
  })
})
