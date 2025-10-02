import { describe, it, expect } from 'vitest'
import { colorfulHeartService } from '@domain/services/colorfulHeartService'

describe('createInitialState', () => {
  it('初期状態が正しく作成されること', () => {
    const state = colorfulHeartService.createInitialState()
    const summary = colorfulHeartService.calculateSummary(state)

    expect(summary.requiredLiveHeartCount).toBe(0)
    expect(summary.memberHeartCount).toBe(0)
    expect(summary.totalRequiredBladeHearts).toBe(0)
  })
})

describe('incrementRequiredLiveHeart', () => {
  it('ライブハートのインクリメントが正しく動作すること', () => {
    let state = colorfulHeartService.createInitialState()

    state = colorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
    const summary = colorfulHeartService.calculateSummary(state)

    expect(summary.requiredLiveHeartCount).toBe(1)
  })
})

describe('decrementRequiredLiveHeart', () => {
  it('ライブハートのデクリメントが正しく動作すること', () => {
    let state = colorfulHeartService.createInitialState()

    // 先にインクリメント
    state = colorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
    state = colorfulHeartService.incrementRequiredLiveHeart(state, 'pink')

    // デクリメント
    state = colorfulHeartService.decrementRequiredLiveHeart(state, 'pink')
    const summary = colorfulHeartService.calculateSummary(state)

    expect(summary.requiredLiveHeartCount).toBe(1)
  })
})

describe('incrementMemberHeart', () => {
  it('メンバーハートのインクリメントが正しく動作すること', () => {
    let state = colorfulHeartService.createInitialState()

    state = colorfulHeartService.incrementMemberHeart(state, 'pink')
    const summary = colorfulHeartService.calculateSummary(state)

    expect(summary.memberHeartCount).toBe(1)
  })
})

describe('resetAllHeartCounts', () => {
  it('全てのハートカウントがリセットされること', () => {
    let state = colorfulHeartService.createInitialState()

    // ハートを追加
    state = colorfulHeartService.incrementRequiredLiveHeart(state, 'pink')
    state = colorfulHeartService.incrementMemberHeart(state, 'blue')

    // リセット
    state = colorfulHeartService.resetAllHeartCounts(state)
    const summary = colorfulHeartService.calculateSummary(state)

    expect(summary.requiredLiveHeartCount).toBe(0)
    expect(summary.memberHeartCount).toBe(0)
  })
})

describe('calculateSummary', () => {
  it('表示色リストの更新が正しく動作すること', () => {
    let state = colorfulHeartService.createInitialState()

    state = colorfulHeartService.incrementMemberHeart(state, 'pink')
    state = colorfulHeartService.incrementMemberHeart(state, 'blue')

    const summary = colorfulHeartService.calculateSummary(state)
    expect(summary.memberHeartColors).toContain('pink')
    expect(summary.memberHeartColors).toContain('blue')
  })
})
