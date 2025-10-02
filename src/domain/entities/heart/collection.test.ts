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
  createMemberHeartCollection,
  createRequiredLiveHeartCollection,
} from '@domain/entities/heart/collection'

describe('calculateMemberHeartSurplus', () => {
  it('メンバーハートが必要数を上回る場合、余剰数が正しく計算されること', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: true },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: true },
      { color: 'yellow', count: 5, visibility: true },
      { color: 'purple', count: 6, visibility: true },
    ]

    const requiredLiveHearts = heartCollection

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 6, visibility: true },
      { color: 'green', count: 3, visibility: true },
      ...heartCollection,
    ]

    const actual = calculateMemberHeartSurplus(requiredLiveHearts, memberHearts)

    // 各色の余剰数を確認（getAllMemberHeartColorsの順序: pink, green, blue, red, yellow, purple）
    const expected = [6 - 1, 3 - 2, 0, 0, 0, 0]
    expect(actual).toEqual(expected)
  })

  it('メンバーハートが必要数に満たない場合、余剰数は0になること', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: true },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: true },
      { color: 'yellow', count: 5, visibility: true },
      { color: 'purple', count: 6, visibility: true },
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 0, visibility: true },
      { color: 'green', count: 1, visibility: true },
      { color: 'blue', count: 2, visibility: true },
      { color: 'red', count: 3, visibility: true },
      { color: 'yellow', count: 4, visibility: true },
      { color: 'purple', count: 5, visibility: true },
    ]

    const actual = calculateMemberHeartSurplus(requiredLiveHearts, memberHearts)

    // 余剰がない場合は全て0
    expect(actual).toEqual([0, 0, 0, 0, 0, 0])
  })
})

describe('calculateTotalMemberHeartSurplus', () => {
  it('メンバーハートの余剰数の合計が正しく計算されること', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: true },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: true },
      { color: 'yellow', count: 5, visibility: true },
      { color: 'purple', count: 6, visibility: true },
    ]

    const requiredLiveHearts = heartCollection
    const memberHearts: HeartCollection = [
      { color: 'pink', count: 6, visibility: true },
      { color: 'green', count: 3, visibility: true },
      ...requiredLiveHearts,
    ]

    const actual = calculateTotalMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    const expected = 6 - 1 + (3 - 2)
    expect(actual).toBe(expected)
  })
})

describe('createMemberHeartCollection', () => {
  it('初期化されたメンバーハートの配列が正しく生成されること', () => {
    const actual = [
      { color: 'pink', count: 0, visibility: true },
      { color: 'green', count: 0, visibility: true },
      { color: 'blue', count: 0, visibility: true },
      { color: 'red', count: 0, visibility: true },
      { color: 'yellow', count: 0, visibility: true },
      { color: 'purple', count: 0, visibility: true },
    ]

    const expected = createMemberHeartCollection()
    expect(actual).toMatchObject(expected)
  })
})

describe('createRequiredLiveHeartCollection', () => {
  it('初期化されたライブに必要なハートの配列が正しく生成されること', () => {
    const actual = [
      { color: 'pink', count: 0, visibility: true },
      { color: 'green', count: 0, visibility: true },
      { color: 'blue', count: 0, visibility: true },
      { color: 'red', count: 0, visibility: true },
      { color: 'yellow', count: 0, visibility: true },
      { color: 'purple', count: 0, visibility: true },
      { color: 'gray', count: 0, visibility: true },
    ]

    const expected = createRequiredLiveHeartCollection()
    expect(actual).toMatchObject(expected)
  })
})

describe('getHeartStateByColor', () => {
  it('指定した色のハート状態が取得できることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: true },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: true },
      { color: 'yellow', count: 5, visibility: true },
      { color: 'purple', count: 6, visibility: true },
    ]
    const actual = getHeartStateByColor(heartCollection, 'red')

    const expected = { color: 'red', count: 4, visibility: true }
    expect(actual).toMatchObject(expected)
  })

  it('存在しない色を指定した場合、undefinedが返されること', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: true },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: true },
      { color: 'yellow', count: 5, visibility: true },
      { color: 'purple', count: 6, visibility: true },
    ]
    const actual = getHeartStateByColor(heartCollection, 'gray')
    expect(actual).toBeUndefined()
  })
})

describe('getTotalEffectiveCount', () => {
  it('有効なハートの総数が正しく計算されることを確認', () => {
    const collection: HeartCollection = [
      { color: 'red', count: 3, visibility: true },
      { color: 'blue', count: 2, visibility: true },
    ]

    const actual = getTotalEffectiveCount(collection)

    const expected = 3 + 2
    expect(actual).toBe(expected)
  })
})

describe('getVisibleColorNames', () => {
  it('visibleな色のみが返されることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = getVisibleColorNames(heartCollection)

    const expected = ['pink', 'blue']
    expect(actual).toMatchObject(expected)
  })

  it('grayはvisibleでも結果に含まれないことを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
      { color: 'gray', count: 7, visibility: true },
    ]

    const visibleColorNames = getVisibleColorNames(heartCollection)

    const expected = ['pink']
    expect(visibleColorNames).toMatchObject(expected)
  })
})

describe('withDecrementedHeartCount', () => {
  it('指定した色のハートカウントが1減ることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = withDecrementedHeartCount(heartCollection, 'pink')

    const expected = [
      { color: 'pink', count: 1 - 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]
    expect(actual).toEqual(expected)
  })

  it('最小値（0）に達したときそれ以下にならないことを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 0, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = withDecrementedHeartCount(heartCollection, 'pink')

    const expected = [
      { color: 'pink', count: 0, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]
    expect(actual).toEqual(expected)
  })
})

describe('withIncrementedHeartCount', () => {
  it('指定した色のハートカウントが1増えることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = withIncrementedHeartCount(heartCollection, 'pink')

    const expected = [
      { color: 'pink', count: 1 + 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]
    expect(actual).toEqual(expected)
  })
})

describe('withResetAllHeartCounts', () => {
  it('全ての色のハートカウントが0にリセットされることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = withResetAllHeartCounts(heartCollection)

    const expected = [
      { color: 'pink', count: 0, visibility: true },
      { color: 'green', count: 0, visibility: false },
      { color: 'blue', count: 0, visibility: false },
      { color: 'red', count: 0, visibility: false },
      { color: 'yellow', count: 0, visibility: false },
      { color: 'purple', count: 0, visibility: false },
    ]
    expect(actual).toEqual(expected)
  })
})

describe('withUpdatedVisibilities', () => {
  it('指定された色のvisibilityが更新されることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = withUpdatedVisibilities(
      heartCollection,
      ['pink', 'blue'],
      false
    )

    const expected = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]
    expect(actual).toEqual(expected)
  })

  it('forceGrayVisibleがtrueの場合、grayは強制的にvisibleになることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
      { color: 'gray', count: 7, visibility: false },
    ]

    const actual = withUpdatedVisibilities(
      heartCollection,
      ['pink', 'blue'],
      true
    )

    const expected = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: true },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
      { color: 'gray', count: 7, visibility: true },
    ]
    expect(actual).toEqual(expected)
  })
})
