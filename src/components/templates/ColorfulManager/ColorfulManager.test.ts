import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import {
  useColorfulManager,
  calculateHeartCount,
  calculateRequiredGreyBladeHeart,
  INITIAL_VALUE,
} from './ColorfulManager.hooks'

const requiredLiveHearts = {
  pink: {
    count: 1,
    isVisible: true,
  },
  green: {
    count: 2,
    isVisible: true,
  },
  blue: {
    count: 3,
    isVisible: true,
  },
  red: {
    count: 0,
    isVisible: true,
  },
  yellow: {
    count: 1,
    isVisible: true,
  },
  purple: {
    count: 1,
    isVisible: true,
  },
  gray: {
    count: 5,
    isVisible: true,
  },
}

const memberHearts = {
  pink: {
    count: 1,
    isVisible: true,
  },
  green: {
    count: 2,
    isVisible: true,
  },
  blue: {
    count: 2,
    isVisible: true,
  },
  red: {
    count: 0,
    isVisible: true,
  },
  yellow: {
    count: 2,
    isVisible: true,
  },
  purple: {
    count: 1,
    isVisible: true,
  },
}

describe('useColorfulManager hook', () => {
  it('ハート追加・減少した時、数が適切か確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    expect(result.current.requiredLiveHearts).toEqual(INITIAL_VALUE)
    expect(result.current.memberHearts).toEqual(INITIAL_VALUE)

    act(() => {
      result.current.handleIncrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHearts.pink.count).toBe(1)

    act(() => {
      result.current.handleDecrementRequiredLiveHeart('pink')
    })

    expect(result.current.requiredLiveHearts.pink.count).toBe(0)
  })

  it('メンバーの灰色のハートを増減しようとするとエラーが発生するか確認', () => {
    const { result } = renderHook(() => useColorfulManager())

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
    expect(calculated.requiredBladeHeart.gray.count).toBe(4)

    // 青色ハートが1個必要
    // 灰色ハートが4個必要(理由は上記)
    // 必要なブレードハート: 5個
    expect(calculated.requiredBladeHeartCount).toBe(5)
  })
})
