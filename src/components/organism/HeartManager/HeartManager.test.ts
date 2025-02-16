import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import {
  useHeartManager,
  calculateHeartCount,
  calculateRequiredGreyBladeHeart,
} from '@organism/HeartManager/HeartManager.hooks'

const requiredLiveHearts = {
  pink: 1,
  green: 2,
  blue: 3,
  red: 0,
  yellow: 1,
  purple: 1,
  gray: 5,
}

const memberHearts = {
  pink: 1,
  green: 2,
  blue: 2,
  red: 0,
  yellow: 2,
  purple: 1,
}

describe('useHeartManager hook', () => {
  it('ハート追加・減少した時、数が適切か確認', () => {
    const { result } = renderHook(() => useHeartManager())

    expect(result.current.requiredLiveHearts).toEqual({
      pink: 0,
      green: 0,
      blue: 0,
      red: 0,
      yellow: 0,
      purple: 0,
      gray: 0,
    })
    expect(result.current.memberHearts).toEqual({
      pink: 0,
      green: 0,
      blue: 0,
      red: 0,
      yellow: 0,
      purple: 0,
    })

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHearts.pink).toBe(1)

    act(() => {
      result.current.handleDecrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHearts.pink).toBe(0)
  })

  it('メンバーの灰色のハートを増減しようとするとエラーが発生するか確認', () => {
    const { result } = renderHook(() => useHeartManager())

    expect(() => {
      act(() => {
        result.current.handleIncrementMemberHeart('gray')
      })
    }).toThrowError('メンバーに灰色ハートはありません')

    expect(() => {
      act(() => {
        result.current.handleDecrementMemberHeart('gray')
      })
    }).toThrowError('メンバーに灰色ハートはありません')
  })
})

describe('calculateRequiredGreyBladeHeart function', () => {
  it('必要なグレーブレードハートの数を正しく計算できているか確認', () => {
    const calculated = calculateRequiredGreyBladeHeart({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: memberHearts,
    })

    // 必要な灰色ハート: 5個
    // ライブに必要な黄色ハート: 1個
    // メンバーの黄色ハート: 2個
    // 余剰: 1個(他の色は余剰がない)
    // 必要な灰色ハート: 5個 - 1個 = 4個
    expect(calculated).toBe(4)
  })
})

describe('calculateHeartCount function', () => {
  it('必要なブレードハートを正しく計算できているか確認', () => {
    const calculated = calculateHeartCount({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: memberHearts,
    })

    // 必要な灰色ハート: 5個
    // ライブに必要な黄色ハート: 1個
    // メンバーの黄色ハート: 2個
    // 余剰: 1個(他の色は余剰がない)
    // 必要な灰色ハート: 5個 - 1個 = 4個
    expect(calculated.requiredBladeHeart.gray).toBe(4)

    // 青色ハートが1個必要
    // 灰色ハートが4個必要(理由は上記)
    // 必要なブレードハート: 5個
    expect(calculated.requiredBladeHeartCount).toBe(5)
  })
})
