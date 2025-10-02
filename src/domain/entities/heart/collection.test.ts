import { describe, it, expect } from 'vitest'

import {
  HeartCollection,
  calculateMemberHeartSurplus,
  calculateTotalMemberHeartSurplus,
  getHeartStateByColor,
  getTotalEffectiveCount,
  getVisibleColorNames,
  withDecrementedHeartCount,
  withIncrementedHeartCount,
  withResetAllHeartCounts,
  withUpdatedVisibilities,
} from '@domain/entities/heart/collection'
import { Heart } from '@domain/entities/heart'
import { HeartColor, MemberHeartColor } from '@domain/valueObjects/heartColor'

const createTestHeartCollection = (
  heartCounts: Record<string, number>
): HeartCollection => {
  const states = Object.entries(heartCounts).map(([colorValue, count]) => {
    const color: HeartColor = colorValue as HeartColor
    const heart: Heart = {
      color,
      count,
      visibility: true,
    }
    return heart
  })

  return states
}

const createTestHeartColor = (value: string): HeartColor => {
  return value as HeartColor
}

describe('calculateMemberHeartSurplus', () => {
  it('メンバーハートが必要数を上回る場合、余剰数が正しく計算されること', () => {
    const requiredLiveHearts = createTestHeartCollection({
      pink: 2,
      green: 1,
      blue: 0,
      red: 3,
      yellow: 0,
      purple: 1,
    })

    const memberHearts = createTestHeartCollection({
      pink: 5, // 3余剰
      green: 1, // 0余剰
      blue: 2, // 2余剰
      red: 1, // 0余剰（不足）
      yellow: 3, // 3余剰
      purple: 4, // 3余剰
    })

    const surplus = calculateMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    // 各色の余剰数を確認（getAllMemberHeartColorsの順序: pink, green, blue, red, yellow, purple）
    expect(surplus).toEqual([3, 0, 2, 0, 3, 3])
  })

  it('メンバーハートが必要数に満たない場合、余剰数は0になること', () => {
    const requiredLiveHearts = createTestHeartCollection({
      pink: 5,
      green: 3,
      blue: 2,
      red: 4,
      yellow: 1,
      purple: 2,
    })

    const memberHearts = createTestHeartCollection({
      pink: 2, // 不足
      green: 3, // 同じ
      blue: 1, // 不足
      red: 0, // 不足
      yellow: 1, // 同じ
      purple: 0, // 不足
    })

    const surplus = calculateMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    // 余剰がない場合は全て0
    expect(surplus).toEqual([0, 0, 0, 0, 0, 0])
  })

  it('必要ライブハートに存在しない色のメンバーハートは余剰として計算されること', () => {
    const requiredLiveHearts = createTestHeartCollection({
      pink: 2,
      // その他の色は存在しない（0と同じ扱い）
    })

    const memberHearts = createTestHeartCollection({
      pink: 3, // 1余剰
      green: 2, // 2余剰（必要数0なので）
      blue: 1, // 1余剰（必要数0なので）
      red: 0, // 0余剰
      yellow: 4, // 4余剰（必要数0なので）
      purple: 0, // 0余剰
    })

    const surplus = calculateMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    expect(surplus).toEqual([1, 2, 1, 0, 4, 0])
  })
})

describe('calculateTotalMemberHeartSurplus', () => {
  it('メンバーハートの余剰数の合計が正しく計算されること', () => {
    const requiredLiveHearts = createTestHeartCollection({
      pink: 2,
      green: 1,
      blue: 0,
      red: 3,
      yellow: 0,
      purple: 1,
    })

    const memberHearts = createTestHeartCollection({
      pink: 5, // 3余剰
      green: 1, // 0余剰
      blue: 2, // 2余剰
      red: 1, // 0余剰（不足）
      yellow: 3, // 3余剰
      purple: 4, // 3余剰
    })

    const total = calculateTotalMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    // 3 + 0 + 2 + 0 + 3 + 3 = 11
    expect(total).toBe(11)
  })

  it('余剰がない場合、合計は0になること', () => {
    const requiredLiveHearts = createTestHeartCollection({
      pink: 5,
      green: 3,
      blue: 2,
      red: 4,
      yellow: 1,
      purple: 2,
    })

    const memberHearts = createTestHeartCollection({
      pink: 2, // 不足
      green: 3, // 同じ
      blue: 1, // 不足
      red: 0, // 不足
      yellow: 1, // 同じ
      purple: 0, // 不足
    })

    const total = calculateTotalMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    expect(total).toBe(0)
  })

  it('全てのメンバーハートが余剰の場合、正しい合計が返されること', () => {
    const requiredLiveHearts = createTestHeartCollection({
      // 全て0（必要数なし）
    })

    const memberHearts = createTestHeartCollection({
      pink: 2,
      green: 3,
      blue: 1,
      red: 4,
      yellow: 2,
      purple: 1,
    })

    const total = calculateTotalMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    // 2 + 3 + 1 + 4 + 2 + 1 = 13
    expect(total).toBe(13)
  })
})

describe('createMemberHeartCollection', () => {
  it('メンバーハートコレクションが正しく生成されることを確認', () => {
    const collection = createTestHeartCollection({
      pink: 0,
      green: 0,
      blue: 0,
      red: 0,
      yellow: 0,
      purple: 0,
    })
    const expectedColors = ['pink', 'green', 'blue', 'red', 'yellow', 'purple']

    expect(collection.length).toBe(expectedColors.length)

    expectedColors.forEach((colorValue) => {
      const color = createTestHeartColor(colorValue)
      const state = getHeartStateByColor(collection, color)
      expect(state).toBeDefined()
      expect(state?.count).toBe(0)
      expect(state?.visibility).toBe(true)
    })
  })
})

describe('createRequiredLiveHeartCollection', () => {
  it('ライブに必要なハートコレクションが正しく生成されることを確認', () => {
    const collection = createTestHeartCollection({
      pink: 0,
      green: 0,
      blue: 0,
      red: 0,
      yellow: 0,
      purple: 0,
      gray: 0,
    })
    const expectedColors = [
      'pink',
      'green',
      'blue',
      'red',
      'yellow',
      'purple',
      'gray',
    ]

    expect(collection.length).toBe(expectedColors.length)

    expectedColors.forEach((colorValue) => {
      const color = createTestHeartColor(colorValue)
      const state = getHeartStateByColor(collection, color)
      expect(state).toBeDefined()
      expect(state?.count).toBe(0)
      expect(state?.visibility).toBe(true)
    })
  })
})

describe('getHeartStateByColor', () => {
  it('指定した色のハート状態が取得できることを確認', () => {
    const collection = createTestHeartCollection({ red: 0 })
    const color = createTestHeartColor('red')

    const state = getHeartStateByColor(collection, color)
    expect(state).toBeDefined()
    expect(state?.color).toBe('red')
    expect(state?.count).toBe(0)
    expect(state?.visibility).toBe(true)
  })

  it('存在しない色を指定した場合、undefinedが返されることを確認', () => {
    const collection = createTestHeartCollection({ red: 5, blue: 3 }) // grayは含まない
    const color = createTestHeartColor('gray')

    const state = getHeartStateByColor(collection, color)
    expect(state).toBeUndefined()
  })
})

describe('getTotalEffectiveCount', () => {
  it('有効なハートの総数が正しく計算されることを確認', () => {
    const collection = createTestHeartCollection({
      red: 3,
      blue: 2,
    })

    const total = getTotalEffectiveCount(collection)
    expect(total).toBe(5)
  })
})

describe('getVisibleColorNames', () => {
  it('visibleな色のみが返されることを確認', () => {
    const collection = createTestHeartCollection({
      pink: 5,
      green: 3,
      blue: 2,
      gray: 1,
    })

    // pinkとblueのみvisibleに設定
    const visibleColors: MemberHeartColor[] = ['pink', 'blue']
    const updatedCollection = withUpdatedVisibilities(
      collection,
      visibleColors,
      false
    )

    const visibleColorNames = getVisibleColorNames(updatedCollection)

    expect(visibleColorNames).toContain('pink')
    expect(visibleColorNames).toContain('blue')
    expect(visibleColorNames).not.toContain('green')
    expect(visibleColorNames).not.toContain('gray') // grayは除外される
  })

  it('grayはvisibleでも結果に含まれないことを確認', () => {
    const collection = createTestHeartCollection({
      pink: 5,
      gray: 1,
    })

    const visibleColors: MemberHeartColor[] = ['pink']
    const updatedCollection = withUpdatedVisibilities(
      collection,
      visibleColors,
      true // grayを強制表示
    )

    const visibleColorNames = getVisibleColorNames(updatedCollection)

    expect(visibleColorNames).toContain('pink')
    expect(visibleColorNames).not.toContain('gray') // visibleでもgrayは除外
  })
})

describe('withDecrementedHeartCount', () => {
  it('指定した色のハートカウントが1減ることを確認', () => {
    const collection = createTestHeartCollection({ red: 5 })
    const color = createTestHeartColor('red')

    const decrementedCollection = withDecrementedHeartCount(collection, color)
    const decrementedState = getHeartStateByColor(decrementedCollection, color)
    expect(decrementedState?.count).toBe(4)
  })

  it('最小値（0）に達したときそれ以下にならないことを確認', () => {
    const collection = createTestHeartCollection({ red: 0 })
    const color = createTestHeartColor('red')

    const decrementedCollection = withDecrementedHeartCount(collection, color)
    const finalState = getHeartStateByColor(decrementedCollection, color)
    expect(finalState?.count).toBe(0)
  })
})

describe('withIncrementedHeartCount', () => {
  it('指定した色のハートカウントが1増えることを確認', () => {
    const collection = createTestHeartCollection({ red: 0 })
    const color = createTestHeartColor('red')

    const originalState = getHeartStateByColor(collection, color)
    expect(originalState?.count).toBe(0)

    const incrementedCollection = withIncrementedHeartCount(collection, color)
    const incrementedState = getHeartStateByColor(incrementedCollection, color)
    expect(incrementedState?.count).toBe(1)
  })

  it('最大値（40）に達したときそれ以上増えないことを確認', () => {
    let collection = createTestHeartCollection({ red: 0 })
    const color = createTestHeartColor('red')

    // 40回インクリメント
    for (let i = 0; i < 42; i++) {
      collection = withIncrementedHeartCount(collection, color)
    }

    const finalState = getHeartStateByColor(collection, color)
    expect(finalState?.count).toBe(40)
  })
})

describe('withResetAllHeartCounts', () => {
  it('全ての色のハートカウントが0にリセットされることを確認', () => {
    const collection = createTestHeartCollection({
      red: 5,
      blue: 3,
      green: 7,
      pink: 2,
    })

    const resetCollection = withResetAllHeartCounts(collection)

    // 各色が0にリセットされることを確認
    const redState = getHeartStateByColor(
      resetCollection,
      createTestHeartColor('red')
    )
    const blueState = getHeartStateByColor(
      resetCollection,
      createTestHeartColor('blue')
    )
    const greenState = getHeartStateByColor(
      resetCollection,
      createTestHeartColor('green')
    )
    const pinkState = getHeartStateByColor(
      resetCollection,
      createTestHeartColor('pink')
    )

    expect(redState?.count).toBe(0)
    expect(blueState?.count).toBe(0)
    expect(greenState?.count).toBe(0)
    expect(pinkState?.count).toBe(0)
  })
})

describe('withUpdatedVisibilities', () => {
  it('指定された色のvisibilityが更新されることを確認', () => {
    const collection = createTestHeartCollection({
      pink: 5,
      green: 3,
      blue: 2,
      gray: 1,
    })

    const visibleColors: MemberHeartColor[] = ['pink', 'blue']
    const updatedCollection = withUpdatedVisibilities(
      collection,
      visibleColors,
      false
    )

    // pink, blueはvisible
    const pinkState = getHeartStateByColor(
      updatedCollection,
      createTestHeartColor('pink')
    )
    const blueState = getHeartStateByColor(
      updatedCollection,
      createTestHeartColor('blue')
    )
    expect(pinkState?.visibility).toBe(true)
    expect(blueState?.visibility).toBe(true)

    // green, grayはinvisible
    const greenState = getHeartStateByColor(
      updatedCollection,
      createTestHeartColor('green')
    )
    const grayState = getHeartStateByColor(
      updatedCollection,
      createTestHeartColor('gray')
    )
    expect(greenState?.visibility).toBe(false)
    expect(grayState?.visibility).toBe(false)
  })

  it('forceGrayVisibleがtrueの場合、grayは強制的にvisibleになることを確認', () => {
    const collection = createTestHeartCollection({
      pink: 5,
      gray: 1,
    })

    const visibleColors: MemberHeartColor[] = ['pink']
    const updatedCollection = withUpdatedVisibilities(
      collection,
      visibleColors,
      true // grayを強制表示
    )

    const pinkState = getHeartStateByColor(
      updatedCollection,
      createTestHeartColor('pink')
    )
    const grayState = getHeartStateByColor(
      updatedCollection,
      createTestHeartColor('gray')
    )

    expect(pinkState?.visibility).toBe(true)
    expect(grayState?.visibility).toBe(true) // forceGrayVisibleにより強制表示
  })
})
