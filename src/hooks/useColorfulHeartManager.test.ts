import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useColorfulHeartManager } from './useColorfulHeartManager'

describe('useColorfulHeartManager hook', () => {
  it('初期状態が正しく設定されること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    expect(result.current.requiredLiveHeartCount).toBe(0)
    expect(result.current.memberHeartCount).toBe(0)
    expect(result.current.canSucceedLive).toBe(false)
  })

  it('ライブハートのインクリメントが正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHeartCount).toBe(1)
  })

  it('ライブハートのデクリメントが正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    // まずインクリメント（別々のactで実行）
    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHeartCount).toBe(2)

    // デクリメント
    act(() => {
      result.current.handleDecrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHeartCount).toBe(1)
  })

  it('メンバーハートのインクリメントが正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    act(() => {
      result.current.handleIncrementMemberHeart('pink')
    })

    expect(result.current.memberHeartCount).toBe(1)
  })

  it('全てのハートカウントがリセットされること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    // ハートを追加
    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
      result.current.handleIncrementMemberHeart('green')
    })

    expect(result.current.requiredLiveHeartCount).toBe(1)
    expect(result.current.memberHeartCount).toBe(1)

    // リセット
    act(() => {
      result.current.handleResetAllHeartCounts()
    })

    expect(result.current.requiredLiveHeartCount).toBe(0)
    expect(result.current.memberHeartCount).toBe(0)
  })

  it('ライブ成功判定が正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    // ライブに必要: pink=2（別々のactで実行）
    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    expect(result.current.canSucceedLive).toBe(false)

    // メンバー: pink=3（十分、別々のactで実行）
    act(() => {
      result.current.handleIncrementMemberHeart('pink')
    })

    act(() => {
      result.current.handleIncrementMemberHeart('pink')
    })

    act(() => {
      result.current.handleIncrementMemberHeart('pink')
    })

    expect(result.current.canSucceedLive).toBe(true)
  })

  it('表示色リストの更新が正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    // 初期状態では全色表示
    expect(result.current.memberHeartColorList).toContain('pink')
    expect(result.current.memberHeartColorList).toContain('green')

    // 表示色を変更
    act(() => {
      result.current.handleChangeMemberHeartVisibility(['pink', 'blue'])
    })

    expect(result.current.memberHeartColorList).toContain('pink')
    expect(result.current.memberHeartColorList).toContain('blue')
    expect(result.current.memberHeartColorList).not.toContain('green')
  })
})
