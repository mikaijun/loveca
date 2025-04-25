import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import {
  useColorfulManager,
  calculateHeartCount,
  calculateRequiredGreyBladeHeart,
} from './ColorfulManager.hooks'
import {
  MemberHeartColor,
  memberHeartColors,
  requiredLiveHeartColors,
} from '@constants/hearts'

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

describe('useColorfulManager function', () => {
  it('ハート追加・減少した時、数が適切か確認', () => {
    const { result } = renderHook(() => useColorfulManager())

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

  it('カウントリセットすると、全てのハートが0になるか確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    act(() => {
      requiredLiveHeartColors.forEach((color) => {
        result.current.handleIncrementRequiredLiveHeart(color)
      })
      memberHeartColors.forEach((color) => {
        result.current.handleIncrementMemberHeart(color)
      })
    })

    act(() => {
      result.current.handleResetCount()
    })

    requiredLiveHeartColors.forEach((color) => {
      expect(result.current.requiredLiveHearts[color].count).toBe(0)
    })

    memberHeartColors.forEach((color) => {
      expect(result.current.memberHearts[color].count).toBe(0)
    })
  })

  it('表示/非表示が適切か確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    // NOTE: Liella!のライブに必要なハートの色を設定
    const requiredLiveHeartColors: MemberHeartColor[] = [
      'purple',
      'red',
      'yellow',
    ]
    // NOTE: 紫アグロデッキのメンバーのハートの色を設定(桜坂しずく採用を想定)
    const memberHeartColors: MemberHeartColor[] = [
      'purple',
      'red',
      'yellow',
      'blue',
    ]
    act(() => {
      result.current.handleChangeVisibilityRequiredLiveHeart(
        requiredLiveHeartColors
      )
      result.current.handleChangeVisibilityMemberHeart(memberHeartColors)
    })

    requiredLiveHeartColors.forEach((color) => {
      expect(result.current.requiredLiveHearts[color].isVisible).toBe(
        requiredLiveHeartColors.includes(color)
      )
    })
    memberHeartColors.forEach((color) => {
      expect(result.current.memberHearts[color].isVisible).toBe(
        memberHeartColors.includes(color)
      )
    })
  })

  it('表示/非表示を切り替えた後、カウントリセットしても表示/非表示状態は維持されているか確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    // NOTE: Liella!のライブに必要なハートの色を設定
    const requiredLiveHeartColors: MemberHeartColor[] = [
      'purple',
      'red',
      'yellow',
    ]
    // NOTE: 紫アグロデッキのメンバーのハートの色を設定(桜坂しずく採用を想定)
    const memberHeartColors: MemberHeartColor[] = [
      'purple',
      'red',
      'yellow',
      'blue',
    ]
    act(() => {
      result.current.handleChangeVisibilityRequiredLiveHeart(
        requiredLiveHeartColors
      )
      result.current.handleChangeVisibilityMemberHeart(memberHeartColors)
    })

    act(() => {
      result.current.handleResetCount()
    })

    requiredLiveHeartColors.forEach((color) => {
      expect(result.current.requiredLiveHearts[color].isVisible).toBe(
        requiredLiveHeartColors.includes(color)
      )
    })
    memberHeartColors.forEach((color) => {
      expect(result.current.memberHearts[color].isVisible).toBe(
        memberHeartColors.includes(color)
      )
    })
  })
})

describe('calculateRequiredGreyBladeHeart function', () => {
  it('必要な灰色ブレードハートの数を正しく計算できているか確認', () => {
    const calculated = calculateRequiredGreyBladeHeart({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: memberHearts,
    })

    // ライブに必要な灰色ハート: 5個
    // ライブに必要な黄色ハート: 1個
    // メンバーの黄色ハート: 2個
    // メンバーの余剰ハート: 1個(他の色は余剰がない)
    // 必要な灰色ハート: 5個 - 1個 = 4個
    expect(calculated).toBe(4)
  })

  it('余剰ハートがない場合、必要な灰色ハートを正しく計算できているか確認', () => {
    const noSurplusMemberHearts = {
      ...memberHearts,
      // NOTE: ライブに必要なハートの数と同じにする
      yellow: { count: 1, isVisible: true },
    }

    const calculated = calculateRequiredGreyBladeHeart({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: noSurplusMemberHearts,
    })

    // 必要な灰色ハート: 5個 (余剰ハートがないためそのまま)
    expect(calculated).toBe(5)
  })
})

describe('calculateHeartCount function', () => {
  it('必要なブレードハートを正しく計算できているか確認', () => {
    const calculated = calculateHeartCount({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: memberHearts,
    })

    // ライブに必要な灰色ハート: 5個
    // ライブに必要な黄色ハート: 1個
    // メンバーの黄色ハート: 2個
    // メンバーの余剰ハート: 1個(他の色は余剰がない)
    // 必要な灰色ハート: 5個 - 1個 = 4個
    expect(calculated.requiredBladeHeart.gray.count).toBe(4)

    // 青色ハートが1個必要
    // 灰色ハートが4個必要(理由は上記)
    // 必要なブレードハート: 5個
    expect(calculated.requiredBladeHeartCount).toBe(5)
  })

  it('全ての色のハートが不足している場合、正しく計算できているか確認', () => {
    const insufficientMemberHearts = {
      pink: { count: 0, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
    }

    const calculated = calculateHeartCount({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: insufficientMemberHearts,
    })

    // 全ての必要なハートが不足している場合
    expect(calculated.requiredBladeHeart.pink.count).toBe(1)
    expect(calculated.requiredBladeHeart.green.count).toBe(2)
    expect(calculated.requiredBladeHeart.blue.count).toBe(3)
    expect(calculated.requiredBladeHeart.red.count).toBe(0)
    expect(calculated.requiredBladeHeart.yellow.count).toBe(1)
    expect(calculated.requiredBladeHeart.purple.count).toBe(1)
    expect(calculated.requiredBladeHeart.gray.count).toBe(5)

    // 必要なブレードハートの合計
    expect(calculated.requiredBladeHeartCount).toBe(13)
  })
})

describe('表示/非表示を切り替え', () => {
  it('ライブに必要なハート色の表示/非表示を切り替えた後、ライブに必要なハート色が適切か確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    // NOTE: Sing！Shine！Smile！のライブに必要なハートの色を設定
    act(() => {
      Array(3)
        .fill('purple')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('purple')
        })
      Array(3)
        .fill('red')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('red')
        })
      Array(3)
        .fill('yellow')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('yellow')
        })
      Array(5)
        .fill('gray')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('gray')
        })
    })

    // NOTE: 15コスト嵐 千砂都のメンバーのハートの色を設定
    act(() => {
      Array(3)
        .fill('purple')
        .forEach(() => {
          result.current.handleIncrementMemberHeart('purple')
        })
      Array(3)
        .fill('red')
        .forEach(() => {
          result.current.handleIncrementMemberHeart('red')
        })
    })

    // NOTE: ライブに必要なハートの色を赤と黄色にだけにする
    act(() => {
      result.current.handleChangeVisibilityRequiredLiveHeart(['red', 'yellow'])
    })

    // NOTE: stateのハート個数は変わらないことを確認
    expect(result.current.requiredLiveHearts.purple.count).toBe(3)
    expect(result.current.requiredLiveHearts.red.count).toBe(3)
    expect(result.current.requiredLiveHearts.yellow.count).toBe(3)
    expect(result.current.requiredLiveHearts.gray.count).toBe(5)

    const calculateHeart = calculateHeartCount({
      requiredLiveHearts: result.current.requiredLiveHearts,
      memberHearts: result.current.memberHearts,
    })

    // NOTE: 非表示になった紫色ハートが計算に含まれていないことを確認
    expect(calculateHeart.requiredBladeHeart.purple.count).toBe(0)

    // NOTE: Sing！Shine！Smile！のライブの内、紫色以外のハートの合計数: 11
    const updatedRequiredLiveHeartCount = 3 + 3 + 5
    // 紫非表示後の必要なブレードハート数: 5
    // Sing！Shine！Smile！ハート数 - 15コスト嵐 千砂都のハート数
    const requiredBladeHeartCount = updatedRequiredLiveHeartCount - 6

    expect(calculateHeart.requiredLiveHeartCount).toBe(
      updatedRequiredLiveHeartCount
    )
    expect(calculateHeart.requiredBladeHeartCount).toBe(requiredBladeHeartCount)

    // NOTE: 必要な灰色ハートは非表示になった紫色ハートを除いた値になることを確認
    expect(calculateHeart.requiredBladeHeart.gray.count).toBe(
      requiredBladeHeartCount - 3 - 0
    )

    // NOTE: 紫色以外は計算結果が変わらないことを確認
    expect(calculateHeart.requiredBladeHeart.red.count).toBe(3 - 3)
    expect(calculateHeart.requiredBladeHeart.yellow.count).toBe(3 - 0)
  })

  it('メンバーのハート色の表示/非表示を切り替えた後、一部のメンバーのハートが表示されている場合の計算結果を確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    // NOTE: Sing！Shine！Smile！のライブに必要なハートの色を設定
    act(() => {
      Array(3)
        .fill('purple')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('purple')
        })
      Array(3)
        .fill('red')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('red')
        })
      Array(3)
        .fill('yellow')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('yellow')
        })
      Array(5)
        .fill('gray')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('gray')
        })
    })

    // NOTE: 15コスト嵐 千砂都のメンバーのハートの色を設定
    act(() => {
      Array(3)
        .fill('purple')
        .forEach(() => {
          result.current.handleIncrementMemberHeart('purple')
        })
      Array(3)
        .fill('red')
        .forEach(() => {
          result.current.handleIncrementMemberHeart('red')
        })
    })

    // NOTE: メンバーのハートの色を赤と黄色にだけにする
    act(() => {
      result.current.handleChangeVisibilityMemberHeart(['red', 'yellow'])
    })

    // NOTE: stateのハート個数は変わらないことを確認
    expect(result.current.memberHearts.purple.count).toBe(3)
    expect(result.current.memberHearts.red.count).toBe(3)
    expect(result.current.memberHearts.yellow.count).toBe(0)

    const calculateHeart = calculateHeartCount({
      requiredLiveHearts: result.current.requiredLiveHearts,
      memberHearts: result.current.memberHearts,
    })

    // NOTE: メンバーハート合計数。15コスト嵐 千砂都のハート数から紫色ハートを除いた値
    const visibleMemberHeartCount = 6 - 3
    // NOTE: 非表示になった紫色ハート3個が計算に含まれていないことを確認
    expect(calculateHeart.memberHeartCount).toBe(visibleMemberHeartCount)

    // NOTE: メンバーの紫色非表示後の必要なブレードハート数
    // Sing！Shine！Smile！ハート14個 - 紫非表示後の15コスト嵐 千砂都のハート3個 = 11個
    const remainingRequiredBladeHeartCount = 14 - visibleMemberHeartCount

    // NOTE: Sing！Shine！Smile！に必要なハート数は変わらないことを確認
    expect(calculateHeart.requiredLiveHeartCount).toBe(14)

    expect(calculateHeart.requiredBladeHeartCount).toBe(
      remainingRequiredBladeHeartCount
    )

    // NOTE: 必要な灰色ブレードハートは5個のまま
    expect(calculateHeart.requiredBladeHeart.gray.count).toBe(5)
    // NOTE: 必要な赤色ブレードハートは15コスト嵐 千砂都で足りているから0個
    expect(calculateHeart.requiredBladeHeart.red.count).toBe(3 - 3)

    // NOTE: 必要なブレードハートの内、紫と黄色に関しては計算結果が変わらないことを確認
    expect(calculateHeart.requiredBladeHeart.purple.count).toBe(3)
    expect(calculateHeart.requiredBladeHeart.yellow.count).toBe(3)
  })

  it('メンバーのハート色の表示/非表示を切り替えた後、メンバーのハートが全て非表示の場合の計算結果を確認', () => {
    const { result } = renderHook(() => useColorfulManager())

    // NOTE: Sing！Shine！Smile！のライブに必要なハートの色を設定
    act(() => {
      Array(3)
        .fill('purple')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('purple')
        })
      Array(3)
        .fill('red')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('red')
        })
      Array(3)
        .fill('yellow')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('yellow')
        })
      Array(5)
        .fill('gray')
        .forEach(() => {
          result.current.handleIncrementRequiredLiveHeart('gray')
        })
    })

    // NOTE: 15コスト嵐 千砂都のメンバーのハートの色を設定
    act(() => {
      Array(3)
        .fill('purple')
        .forEach(() => {
          result.current.handleIncrementMemberHeart('purple')
        })
      Array(3)
        .fill('red')
        .forEach(() => {
          result.current.handleIncrementMemberHeart('red')
        })
    })

    // NOTE: メンバーのハートの色を黄色にだけにする
    act(() => {
      result.current.handleChangeVisibilityMemberHeart(['yellow'])
    })

    // NOTE: stateのハート個数は変わらないことを確認
    expect(result.current.memberHearts.purple.count).toBe(3)
    expect(result.current.memberHearts.red.count).toBe(3)
    expect(result.current.memberHearts.yellow.count).toBe(0)

    const calculateHeart = calculateHeartCount({
      requiredLiveHearts: result.current.requiredLiveHearts,
      memberHearts: result.current.memberHearts,
    })

    // NOTE: 15コスト嵐 千砂都に黄色ハートが存在しないのでメンバーハートは0個となることを確認
    expect(calculateHeart.memberHeartCount).toBe(0)

    // NOTE: Sing！Shine！Smile！に必要なハート数は変わらないことを確認
    expect(calculateHeart.requiredLiveHeartCount).toBe(14)

    // Sing！Shine！Smile！に必要なブレードハート数は14個であることを確認
    expect(calculateHeart.requiredBladeHeartCount).toBe(14)

    // NOTE: 必要なブレードハート色は全ての色が必要なため、全ての色が計算結果に含まれることを確認
    expect(calculateHeart.requiredBladeHeart.gray.count).toBe(5)
    expect(calculateHeart.requiredBladeHeart.red.count).toBe(3)
    expect(calculateHeart.requiredBladeHeart.purple.count).toBe(3)
    expect(calculateHeart.requiredBladeHeart.yellow.count).toBe(3)
  })
})
