import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useMonochromeManager } from '@organism/MonochromeManager/MonochromeManager.hooks'

describe('useMonochromeManager hook', () => {
  it('ハート数の変更が正しく反映されること', () => {
    const { result } = renderHook(() => useMonochromeManager())

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

  it('ハート数の計算が正しく行われること', () => {
    const { result } = renderHook(() => useMonochromeManager())

    expect(result.current.requiredBladeHeartCount).toBe(0)

    act(() => {
      result.current.handleChangeMemberHeartCount(8)
    })
    act(() => {
      result.current.handleRequiredLiveHeartCount(10)
    })

    expect(result.current.requiredBladeHeartCount).toBe(2)
  })

  it('リセットが正常に機能すること', () => {
    const { result } = renderHook(() => useMonochromeManager())

    act(() => {
      result.current.handleChangeMemberHeartCount(5)
    })
    act(() => {
      result.current.handleRequiredLiveHeartCount(10)
    })

    act(() => {
      result.current.handleResetHeart()
    })
    expect(result.current.memberHeartCount).toBe(0)
    expect(result.current.requiredLiveHeartCount).toBe(0)
  })
})
