import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import {
  getObjectKeys,
  incrementHeartCount,
  decrementHeartCount,
  resetHeartCounts,
  updateHeartVisibility,
  useMemberHeartState,
  calculateMemberOverHeartCounts,
  getRequiredLiveHeartColorList,
  getMemberHeartColorList,
  calculateRequiredLiveHeartCount,
  calculateMemberHeartCount,
  calculateRequiredBladeHeartForColor,
  calculateRequiredBladeHeart,
  RequiredLiveHeartState,
  calculateRequiredGreyBladeHeart,
  MemberHeartState,
} from './ColorfulHeartManager.hooks'
import { MemberHeartColor } from '@constants/hearts'

describe('getObjectKeys', () => {
  it('空のオブジェクトのキーを正しく取得できるか確認', () => {
    const emptyObj = {}
    const keys = getObjectKeys(emptyObj)
    expect(keys).toEqual([])
  })

  it('valueがプリミティブなオブジェクトのキーを正しく取得できるか確認', () => {
    const testObj = {
      a: 1,
      b: 'test',
      c: true,
    }
    const keys = getObjectKeys(testObj)
    expect(keys).toEqual(['a', 'b', 'c'])
  })

  it('valueがオブジェクトのキーを正しく取得できるか確認', () => {
    const heartState = {
      pink: { count: 1, isVisible: true },
      blue: { count: 2, isVisible: false },
    }
    const keys = getObjectKeys(heartState)
    expect(keys).toEqual(['pink', 'blue'])
  })
})

describe('incrementHeartCount', () => {
  it('指定した色のハートカウントが1増えることを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 0, isVisible: true },
      green: { count: 5, isVisible: true },
      blue: { count: 0, isVisible: false },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 0, isVisible: true },
    }

    const result = incrementHeartCount(initialState, 'pink')

    expect(result.pink.count).toBe(initialState.pink.count + 1)
    // 他の色は変更されない
    expect(result.green.count).toBe(initialState.green.count)
    expect(result.blue.count).toBe(initialState.blue.count)
    expect(result.red.count).toBe(initialState.red.count)
    expect(result.yellow.count).toBe(initialState.yellow.count)
    expect(result.purple.count).toBe(initialState.purple.count)
    expect(result.gray.count).toBe(initialState.gray.count)
  })

  it('isVisibleは変更されないことを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 0, isVisible: true },
      green: { count: 5, isVisible: true },
      blue: { count: 0, isVisible: false },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 0, isVisible: true },
    }

    const result = incrementHeartCount(initialState, 'pink')

    expect(result.pink.isVisible).toBe(initialState.pink.isVisible)
    expect(result.green.isVisible).toBe(initialState.green.isVisible)
    expect(result.blue.isVisible).toBe(initialState.blue.isVisible)
    expect(result.red.isVisible).toBe(initialState.red.isVisible)
    expect(result.yellow.isVisible).toBe(initialState.yellow.isVisible)
    expect(result.purple.isVisible).toBe(initialState.purple.isVisible)
    expect(result.gray.isVisible).toBe(initialState.gray.isVisible)
  })
})

describe('decrementHeartCount', () => {
  it('指定した色のハートカウントが1減ることを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 5, isVisible: true },
      blue: { count: 0, isVisible: false },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 0, isVisible: true },
    }

    const result = decrementHeartCount(initialState, 'pink')

    expect(result.pink.count).toBe(initialState.pink.count - 1)

    // 他の色は変更されない
    expect(result.green.count).toBe(initialState.green.count)
    expect(result.blue.count).toBe(initialState.blue.count)
    expect(result.red.count).toBe(initialState.red.count)
    expect(result.yellow.count).toBe(initialState.yellow.count)
    expect(result.purple.count).toBe(initialState.purple.count)
    expect(result.gray.count).toBe(initialState.gray.count)

    // isVisibleは変更されない
    expect(result.pink.isVisible).toBe(initialState.pink.isVisible)
    expect(result.green.isVisible).toBe(initialState.green.isVisible)
    expect(result.blue.isVisible).toBe(initialState.blue.isVisible)
    expect(result.red.isVisible).toBe(initialState.red.isVisible)
    expect(result.yellow.isVisible).toBe(initialState.yellow.isVisible)
    expect(result.purple.isVisible).toBe(initialState.purple.isVisible)
    expect(result.gray.isVisible).toBe(initialState.gray.isVisible)
  })

  it('isVisibleは変更されないことを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 5, isVisible: true },
      blue: { count: 0, isVisible: false },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 0, isVisible: true },
    }

    const result = decrementHeartCount(initialState, 'pink')

    expect(result.pink.isVisible).toBe(initialState.pink.isVisible)
    expect(result.green.isVisible).toBe(initialState.green.isVisible)
    expect(result.blue.isVisible).toBe(initialState.blue.isVisible)
    expect(result.red.isVisible).toBe(initialState.red.isVisible)
    expect(result.yellow.isVisible).toBe(initialState.yellow.isVisible)
    expect(result.purple.isVisible).toBe(initialState.purple.isVisible)
    expect(result.gray.isVisible).toBe(initialState.gray.isVisible)
  })

  it('カウントが0でもマイナスにならないことを確認', () => {
    const initialState: MemberHeartState = {
      pink: { count: 0, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
    }

    const result = decrementHeartCount(initialState, 'pink')

    expect(result.pink.count).toBe(0)
  })
})

describe('resetHeartCounts', () => {
  it('全ての色のカウントが0にリセットされることを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 5, isVisible: false },
      blue: { count: 2, isVisible: true },
      red: { count: 1, isVisible: true },
      yellow: { count: 4, isVisible: false },
      purple: { count: 6, isVisible: true },
      gray: { count: 10, isVisible: true },
    }

    const result = resetHeartCounts(initialState)

    expect(result.pink.count).toBe(0)
    expect(result.green.count).toBe(0)
    expect(result.blue.count).toBe(0)
    expect(result.red.count).toBe(0)
    expect(result.yellow.count).toBe(0)
    expect(result.purple.count).toBe(0)
    expect(result.gray.count).toBe(0)
  })

  it('isVisibleは変更されないことを確認', () => {
    const initialState: MemberHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 5, isVisible: false },
      blue: { count: 2, isVisible: true },
      red: { count: 1, isVisible: false },
      yellow: { count: 4, isVisible: true },
      purple: { count: 6, isVisible: false },
    }

    const result = resetHeartCounts(initialState)

    expect(result.pink.isVisible).toBe(true)
    expect(result.green.isVisible).toBe(false)
    expect(result.blue.isVisible).toBe(true)
    expect(result.red.isVisible).toBe(false)
    expect(result.yellow.isVisible).toBe(true)
    expect(result.purple.isVisible).toBe(false)
  })
})

describe('updateHeartVisibility', () => {
  it('指定した色のハートが表示されることを確認', () => {
    const initialState: MemberHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 3, isVisible: true },
      red: { count: 4, isVisible: true },
      yellow: { count: 5, isVisible: false },
      purple: { count: 6, isVisible: true },
    }

    const result = updateHeartVisibility(initialState, ['pink', 'blue'], false)

    expect(result.pink.isVisible).toBe(true)
    expect(result.green.isVisible).toBe(false)
    expect(result.blue.isVisible).toBe(true)
    expect(result.red.isVisible).toBe(false)
    expect(result.yellow.isVisible).toBe(false)
    expect(result.purple.isVisible).toBe(false)
  })

  it('forceGrayVisibleがtrueの場合、grayが強制表示されることを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 3, isVisible: true },
      red: { count: 4, isVisible: true },
      yellow: { count: 5, isVisible: false },
      purple: { count: 6, isVisible: true },
      gray: { count: 7, isVisible: false },
    }

    const result = updateHeartVisibility(initialState, ['pink'], true)

    expect(result.pink.isVisible).toBe(true)
    expect(result.green.isVisible).toBe(false)
    expect(result.blue.isVisible).toBe(false)
    expect(result.red.isVisible).toBe(false)
    expect(result.yellow.isVisible).toBe(false)
    expect(result.purple.isVisible).toBe(false)
    // 強制表示
    expect(result.gray.isVisible).toBe(true)
  })

  it('forceGrayVisibleがfalseの場合、grayは指定した色リストに従うことを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 3, isVisible: true },
      red: { count: 4, isVisible: true },
      yellow: { count: 5, isVisible: false },
      purple: { count: 6, isVisible: true },
      gray: { count: 7, isVisible: true },
    }

    // grayは指定していない
    const result1 = updateHeartVisibility(initialState, ['pink'], false)
    expect(result1.gray.isVisible).toBe(false)

    // grayを指定した場合（実際にはMemberHeartColorにgrayは含まれないが、テスト用に）
    const result2 = updateHeartVisibility(
      initialState,
      ['pink', 'gray' as MemberHeartColor],
      false
    )
    expect(result2.gray.isVisible).toBe(true)
  })

  it('countは変更されないことを確認', () => {
    const initialState: MemberHeartState = {
      pink: { count: 10, isVisible: false },
      green: { count: 20, isVisible: true },
      blue: { count: 30, isVisible: false },
      red: { count: 40, isVisible: true },
      yellow: { count: 50, isVisible: false },
      purple: { count: 60, isVisible: true },
    }

    const result = updateHeartVisibility(initialState, ['pink', 'blue'], false)

    expect(result.pink.count).toBe(initialState.pink.count)
    expect(result.green.count).toBe(initialState.green.count)
    expect(result.blue.count).toBe(initialState.blue.count)
    expect(result.red.count).toBe(initialState.red.count)
    expect(result.yellow.count).toBe(initialState.yellow.count)
    expect(result.purple.count).toBe(initialState.purple.count)
  })

  it('空の配列を渡した場合、全て非表示になることを確認', () => {
    const initialState: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 3, isVisible: true },
      red: { count: 4, isVisible: true },
      yellow: { count: 5, isVisible: true },
      purple: { count: 6, isVisible: true },
    }

    const result = updateHeartVisibility(initialState, [], false)

    expect(result.pink.isVisible).toBe(false)
    expect(result.green.isVisible).toBe(false)
    expect(result.blue.isVisible).toBe(false)
    expect(result.red.isVisible).toBe(false)
    expect(result.yellow.isVisible).toBe(false)
    expect(result.purple.isVisible).toBe(false)
  })

  it('空の配列でもforceGrayVisibleがtrueならgrayは表示されることを確認', () => {
    const initialState: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 3, isVisible: true },
      red: { count: 4, isVisible: true },
      yellow: { count: 5, isVisible: true },
      purple: { count: 6, isVisible: true },
      gray: { count: 7, isVisible: false },
    }

    const result = updateHeartVisibility(initialState, [], true)

    expect(result.pink.isVisible).toBe(false)
    expect(result.green.isVisible).toBe(false)
    expect(result.blue.isVisible).toBe(false)
    expect(result.red.isVisible).toBe(false)
    expect(result.yellow.isVisible).toBe(false)
    expect(result.purple.isVisible).toBe(false)
    // grayのみ表示
    expect(result.gray.isVisible).toBe(true)
  })
})

describe('useMemberHeartState', () => {
  it('grayを指定するとエラーが発生することを確認', () => {
    const { result } = renderHook(() => useMemberHeartState())

    expect(() => {
      act(() => {
        result.current.handleIncrementMemberHeart('gray')
      })
    }).toThrowError('メンバーに灰色ハートはありません')
  })
})

describe('calculateMemberOverHeartCounts', () => {
  it('メンバーの余剰ハートを正しく計算できているか確認', () => {
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

    const calculated = calculateMemberOverHeartCounts({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: memberHearts,
    })

    expect(calculated).toEqual([
      Math.max(memberHearts.pink.count - requiredLiveHearts.pink.count, 0),
      Math.max(memberHearts.green.count - requiredLiveHearts.green.count, 0),
      Math.max(memberHearts.blue.count - requiredLiveHearts.blue.count, 0),
      Math.max(memberHearts.red.count - requiredLiveHearts.red.count, 0),
      Math.max(memberHearts.yellow.count - requiredLiveHearts.yellow.count, 0),
      Math.max(memberHearts.purple.count - requiredLiveHearts.purple.count, 0),
    ])
  })

  it('非表示のハートが計算に含まれないことを確認', () => {
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

    const invisibleMemberHearts = {
      pink: { count: 5, isVisible: false },
      green: { count: 2, isVisible: true },
      blue: { count: 2, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 2, isVisible: true },
      purple: { count: 1, isVisible: true },
    }

    const calculated = calculateMemberOverHeartCounts({
      requiredLiveHearts: requiredLiveHearts,
      memberHearts: invisibleMemberHearts,
    })

    expect(calculated).toEqual([
      // 非表示の余剰ハートは0になる
      0,
      Math.max(
        invisibleMemberHearts.green.count - requiredLiveHearts.green.count,
        0
      ),
      Math.max(
        invisibleMemberHearts.blue.count - requiredLiveHearts.blue.count,
        0
      ),
      Math.max(
        invisibleMemberHearts.red.count - requiredLiveHearts.red.count,
        0
      ),
      Math.max(
        invisibleMemberHearts.yellow.count - requiredLiveHearts.yellow.count,
        0
      ),
      Math.max(
        invisibleMemberHearts.purple.count - requiredLiveHearts.purple.count,
        0
      ),
    ])
  })
})

describe('getRequiredLiveHeartColorList', () => {
  it('表示中のライブ必要ハート色リストを正しく取得できるか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: false },
      blue: { count: 3, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: false },
      purple: { count: 1, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const result = getRequiredLiveHeartColorList(testRequiredLiveHearts)

    // 表示中かつgray以外の色のみ含まれる
    expect(result).toEqual(['pink', 'blue', 'red', 'purple'])
  })

  it('全て非表示の場合、空の配列を返すか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 3, isVisible: false },
      red: { count: 0, isVisible: false },
      yellow: { count: 1, isVisible: false },
      purple: { count: 1, isVisible: false },
      gray: { count: 5, isVisible: false },
    }

    const result = getRequiredLiveHeartColorList(testRequiredLiveHearts)
    expect(result).toEqual([])
  })

  it('grayのみ表示の場合、空の配列を返すか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 3, isVisible: false },
      red: { count: 0, isVisible: false },
      yellow: { count: 1, isVisible: false },
      purple: { count: 1, isVisible: false },
      gray: { count: 5, isVisible: true },
    }

    const result = getRequiredLiveHeartColorList(testRequiredLiveHearts)
    expect(result).toEqual([])
  })
})

describe('getMemberHeartColorList', () => {
  it('表示中のメンバーハート色リストを正しく取得できるか確認', () => {
    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: false },
      blue: { count: 2, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 2, isVisible: false },
      purple: { count: 1, isVisible: true },
    }

    const result = getMemberHeartColorList(testMemberHearts)

    // 表示中の色のみ含まれる
    expect(result).toEqual(['pink', 'blue', 'red', 'purple'])
  })

  it('全て非表示の場合、空の配列を返すか確認', () => {
    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 2, isVisible: false },
      red: { count: 0, isVisible: false },
      yellow: { count: 2, isVisible: false },
      purple: { count: 1, isVisible: false },
    }

    const result = getMemberHeartColorList(testMemberHearts)
    expect(result).toEqual([])
  })
})

describe('calculateRequiredLiveHeartCount', () => {
  it('表示中のライブに必要なハートの合計数を正しく計算できるか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 2, isVisible: true },
      green: { count: 3, isVisible: false },
      blue: { count: 1, isVisible: true },
      red: { count: 4, isVisible: true },
      yellow: { count: 2, isVisible: false },
      purple: { count: 1, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const result = calculateRequiredLiveHeartCount(testRequiredLiveHearts)

    // 非表示の緑色と黄色のハートは計算に含まれない
    const expected =
      testRequiredLiveHearts.pink.count +
      testRequiredLiveHearts.blue.count +
      testRequiredLiveHearts.red.count +
      testRequiredLiveHearts.purple.count +
      testRequiredLiveHearts.gray.count

    expect(result).toBe(expected)
  })

  it('全て非表示の場合、0を返すか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 2, isVisible: false },
      green: { count: 3, isVisible: false },
      blue: { count: 1, isVisible: false },
      red: { count: 4, isVisible: false },
      yellow: { count: 2, isVisible: false },
      purple: { count: 1, isVisible: false },
      gray: { count: 5, isVisible: false },
    }

    const result = calculateRequiredLiveHeartCount(testRequiredLiveHearts)
    expect(result).toBe(0)
  })

  it('全て表示かつcountが0の場合、0を返すか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 0, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 0, isVisible: true },
    }

    const result = calculateRequiredLiveHeartCount(testRequiredLiveHearts)
    expect(result).toBe(0)
  })
})

describe('calculateMemberHeartCount', () => {
  it('表示中のメンバーハートの合計数を正しく計算できるか確認', () => {
    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: false },
      blue: { count: 2, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 3, isVisible: false },
      purple: { count: 1, isVisible: true },
    }

    const result = calculateMemberHeartCount(testMemberHearts)

    // 非表示の緑色と黄色のハートは計算に含まれない
    const expected =
      testMemberHearts.pink.count +
      testMemberHearts.blue.count +
      testMemberHearts.red.count +
      testMemberHearts.purple.count

    expect(result).toBe(expected)
  })

  it('全て非表示の場合、0を返すか確認', () => {
    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: false },
      green: { count: 2, isVisible: false },
      blue: { count: 2, isVisible: false },
      red: { count: 0, isVisible: false },
      yellow: { count: 3, isVisible: false },
      purple: { count: 1, isVisible: false },
    }

    const result = calculateMemberHeartCount(testMemberHearts)
    expect(result).toBe(0)
  })

  it('全て表示かつcountが0の場合、0を返すか確認', () => {
    const testMemberHearts: MemberHeartState = {
      pink: { count: 0, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
    }

    const result = calculateMemberHeartCount(testMemberHearts)
    expect(result).toBe(0)
  })
})

describe('calculateRequiredGreyBladeHeart', () => {
  it('必要な灰色ブレードハート数を正しく計算できるか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 3, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 4, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
    }

    const result = calculateRequiredGreyBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    // gary5個のうち、blue1個が余剰なので4個必要
    expect(result).toBe(4)
  })

  it('必要な灰色ブレードハート数が0未満の場合、0を返すか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 1, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 4, isVisible: true },
      purple: { count: 2, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 3, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 4, isVisible: true },
      purple: { count: 5, isVisible: true },
    }

    const result = calculateRequiredGreyBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    expect(result).toBe(0)
  })
})

describe('calculateRequiredBladeHeartForColor', () => {
  it('必要なブレードハート数を正しく計算できるか確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 1, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 4, isVisible: true },
      purple: { count: 2, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 3, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 5, isVisible: true },
    }

    // pink: max(3-1, 0) = 2
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'pink',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(2)

    // green: max(2-2, 0) = 0
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'green',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(0)

    // blue: max(1-3, 0) = 0 (マイナスは0になる)
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'blue',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(0)

    // red: max(0-0, 0) = 0
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'red',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(0)

    // yellow: max(4-1, 0) = 3
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'yellow',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(3)

    // purple: max(2-5, 0) = 0 (マイナスは0になる)
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'purple',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(0)
  })

  it('非表示のハートが計算に含まれないことを確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 5, isVisible: false },
      green: { count: 3, isVisible: true },
      blue: { count: 2, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 2, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 10, isVisible: false },
      green: { count: 1, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 2, isVisible: true },
      purple: { count: 1, isVisible: true },
    }

    // pink: max(0-0, 0) = 0 (両方とも非表示なので0として計算)
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'pink',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(0)
  })

  it('一方だけが非表示の場合の計算を確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 5, isVisible: false },
      green: { count: 3, isVisible: true },
      blue: { count: 2, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 2, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 2, isVisible: true },
      green: { count: 1, isVisible: false },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 2, isVisible: true },
      purple: { count: 1, isVisible: true },
    }

    // pink: max(0-2, 0) = 0 (ライブ側が非表示)
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'pink',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(0)

    // green: max(3-0, 0) = 3 (メンバー側が非表示)
    expect(
      calculateRequiredBladeHeartForColor({
        color: 'green',
        requiredLiveHearts: testRequiredLiveHearts,
        memberHearts: testMemberHearts,
      })
    ).toBe(3)
  })
})

describe('calculateRequiredBladeHeart', () => {
  it('requiredLiveHeartsのgrayが表示されている場合、calculateRequiredGreyBladeHeartの結果を使用することを確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 0, isVisible: true },
      gray: { count: 5, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 2, isVisible: true },
      purple: { count: 0, isVisible: true },
    }

    const result = calculateRequiredBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    const expected = calculateRequiredGreyBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    expect(result.gray.count).toBe(expected)
  })

  it('gray以外の色はcalculateRequiredBladeHeartForColorの結果を使用することを確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 3, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 1, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 4, isVisible: true },
      purple: { count: 2, isVisible: true },
      gray: { count: 0, isVisible: false },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 2, isVisible: true },
      blue: { count: 3, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 5, isVisible: true },
    }

    const result = calculateRequiredBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    const expected = calculateRequiredBladeHeartForColor({
      color: 'pink',
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })
    const expectedGreen = calculateRequiredBladeHeartForColor({
      color: 'green',
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })
    const expectedBlue = calculateRequiredBladeHeartForColor({
      color: 'blue',
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })
    const expectedRed = calculateRequiredBladeHeartForColor({
      color: 'red',
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })
    const expectedYellow = calculateRequiredBladeHeartForColor({
      color: 'yellow',
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })
    const expectedPurple = calculateRequiredBladeHeartForColor({
      color: 'purple',
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    expect(result.pink.count).toBe(expected)
    expect(result.green.count).toBe(expectedGreen)
    expect(result.blue.count).toBe(expectedBlue)
    expect(result.red.count).toBe(expectedRed)
    expect(result.yellow.count).toBe(expectedYellow)
    expect(result.purple.count).toBe(expectedPurple)
  })

  it('非表示のハートはcount=0になることを確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 5, isVisible: false }, // 非表示
      green: { count: 3, isVisible: true },
      blue: { count: 2, isVisible: false }, // 非表示
      red: { count: 1, isVisible: true },
      yellow: { count: 4, isVisible: true },
      purple: { count: 2, isVisible: false }, // 非表示
      gray: { count: 10, isVisible: false }, // 非表示
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 1, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 1, isVisible: true },
    }

    const result = calculateRequiredBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    // 非表示のハートはcount=0になる
    expect(result.pink.count).toBe(0)
    expect(result.blue.count).toBe(0)
    expect(result.purple.count).toBe(0)
    expect(result.gray.count).toBe(0)

    // 表示のハートは通常通り計算される
    expect(result.green.count).toBe(2) // max(3-1, 0) = 2
    expect(result.red.count).toBe(1) // max(1-0, 0) = 1
    expect(result.yellow.count).toBe(3) // max(4-1, 0) = 3

    // isVisibleは元の値が保持される
    expect(result.pink.isVisible).toBe(false)
    expect(result.green.isVisible).toBe(true)
    expect(result.blue.isVisible).toBe(false)
    expect(result.red.isVisible).toBe(true)
    expect(result.yellow.isVisible).toBe(true)
    expect(result.purple.isVisible).toBe(false)
    expect(result.gray.isVisible).toBe(false)
  })

  it('全ての色が含まれた完全なオブジェクトが返されることを確認', () => {
    const testRequiredLiveHearts: RequiredLiveHeartState = {
      pink: { count: 1, isVisible: true },
      green: { count: 1, isVisible: true },
      blue: { count: 1, isVisible: true },
      red: { count: 1, isVisible: true },
      yellow: { count: 1, isVisible: true },
      purple: { count: 1, isVisible: true },
      gray: { count: 1, isVisible: true },
    }

    const testMemberHearts: MemberHeartState = {
      pink: { count: 0, isVisible: true },
      green: { count: 0, isVisible: true },
      blue: { count: 0, isVisible: true },
      red: { count: 0, isVisible: true },
      yellow: { count: 0, isVisible: true },
      purple: { count: 0, isVisible: true },
    }

    const result = calculateRequiredBladeHeart({
      requiredLiveHearts: testRequiredLiveHearts,
      memberHearts: testMemberHearts,
    })

    // 全ての色のプロパティが存在することを確認
    expect(result).toHaveProperty('pink')
    expect(result).toHaveProperty('green')
    expect(result).toHaveProperty('blue')
    expect(result).toHaveProperty('red')
    expect(result).toHaveProperty('yellow')
    expect(result).toHaveProperty('purple')
    expect(result).toHaveProperty('gray')

    // 各プロパティにcountとisVisibleが存在することを確認
    Object.values(result).forEach((heartState) => {
      expect(heartState).toHaveProperty('count')
      expect(heartState).toHaveProperty('isVisible')
      expect(typeof heartState.count).toBe('number')
      expect(typeof heartState.isVisible).toBe('boolean')
    })
  })
})
