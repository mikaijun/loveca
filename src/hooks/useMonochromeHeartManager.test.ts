import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useMonochromeHeartManager } from './useMonochromeHeartManager'

describe('useMonochromeHeartManager hook', () => {
  it('ハート数の変更が正しく反映されること', () => {
    const { result } = renderHook(() => useMonochromeHeartManager())

    expect(result.current.memberHeartCount).toBe(0)
    expect(result.current.requiredLiveHeartCount).toBe(0)

    act(() => {
      result.current.handleChangeMemberHeartCount(5)
    })

    expect(result.current.memberHeartCount).toBe(5)

    act(() => {
      result.current.handleRequiredLiveHeartCount(10)
    })

    expect(result.current.requiredLiveHeartCount).toBe(10)
  })

  it('ブレードハートの必要数が正しく計算されること', () => {
    const { result } = renderHook(() => useMonochromeHeartManager())

    // 初期状態: 必要ブレードハート数は0
    expect(result.current.requiredBladeHeartCount).toBe(0)

    act(() => {
      result.current.handleChangeMemberHeartCount(5)
      result.current.handleRequiredLiveHeartCount(10)
    })

    // 10 - 5 = 5個のブレードハートが必要
    expect(result.current.requiredBladeHeartCount).toBe(5)
    expect(result.current.isLiveSuccess).toBe(false)

    act(() => {
      result.current.handleChangeMemberHeartCount(15)
    })

    // 15 >= 10 なのでライブ成功
    expect(result.current.requiredBladeHeartCount).toBe('ライブ成功')
    expect(result.current.isLiveSuccess).toBe(true)
  })

  it('リセット機能が正しく動作すること', () => {
    const { result } = renderHook(() => useMonochromeHeartManager())

    act(() => {
      result.current.handleChangeMemberHeartCount(10)
      result.current.handleRequiredLiveHeartCount(15)
    })

    expect(result.current.memberHeartCount).toBe(10)
    expect(result.current.requiredLiveHeartCount).toBe(15)

    act(() => {
      result.current.handleResetHeart()
    })

    expect(result.current.memberHeartCount).toBe(0)
    expect(result.current.requiredLiveHeartCount).toBe(0)
  })
})
