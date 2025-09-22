import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useColorfulHeartManager } from './useColorfulHeartManager'

describe('useColorfulHeartManager hook', () => {
  it('初期状態が正しく設定されること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    expect(result.current.requiredLiveHeartCount).toBe(0)
    expect(result.current.memberHeartCount).toBe(0)
    expect(result.current.canSucceedLive).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('ライブハートのインクリメントが正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHeartCount).toBe(1)
    expect(result.current.error).toBeNull()
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
    expect(result.current.error).toBeNull()
  })

  it('メンバーハートのインクリメントが正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    act(() => {
      result.current.handleIncrementMemberHeart('pink')
    })

    expect(result.current.memberHeartCount).toBe(1)
    expect(result.current.error).toBeNull()
  })

  it('メンバーハートに灰色を指定するとエラーが発生すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    act(() => {
      result.current.handleIncrementMemberHeart('gray')
    })

    expect(result.current.error).toBe('メンバーハートに灰色は使用できません')
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

  it('エラークリアが正しく動作すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    // エラーを発生させる
    act(() => {
      result.current.handleIncrementMemberHeart('gray')
    })

    expect(result.current.error).not.toBeNull()

    // エラークリア
    act(() => {
      result.current.clearError()
    })

    expect(result.current.error).toBeNull()
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

  it('無効な色を指定するとエラーが発生すること', () => {
    const { result } = renderHook(() => useColorfulHeartManager())

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('invalid-color')
    })

    expect(result.current.error).toContain('無効')
  })
})
