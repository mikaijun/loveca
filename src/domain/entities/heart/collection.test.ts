import { describe, it, expect } from 'vitest'

import {
  HeartCollection,
  calculateMemberHeartSurplus,
  calculateTotalMemberHeartSurplus,
  calculateRequiredGrayBladeHeart,
  calculateRequiredBladeHeartByColor,
  getHeartStateByColor,
  getTotalEffectiveCount,
  getVisibleColorNames,
  withDecrementedHeartCount,
  withIncrementedHeartCount,
  withResetHeartCounts,
  withUpdatedVisibilities,
  createMemberHeartCollection,
  createRequiredLiveHeartCollection,
  calculateTotalRequiredBladeHearts,
  calculateRequiredBladeHearts,
} from '@domain/entities/heart/collection'

describe('calculateRequiredBladeHearts', () => {
  it('全ての必要ブレードハート数が正しく計算されることを確認', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 4, visibility: true },
      { color: 'green', count: 3, visibility: true },
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 2, visibility: true },
      { color: 'green', count: 1, visibility: true },
    ]

    const actual = calculateRequiredBladeHearts(
      requiredLiveHearts,
      memberHearts
    )

    const expected = [
      { color: 'pink', count: 4 - 2, visibility: true },
      { color: 'green', count: 3 - 1, visibility: true },
    ]

    expect(actual).toEqual(expected)
  })
})

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

describe('calculateRequiredGrayBladeHeart', () => {
  it('灰色ハートの必要数からメンバーハートの余剰数を差し引いた値が返されること', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 2, visibility: true },
      { color: 'green', count: 1, visibility: true },
      { color: 'blue', count: 0, visibility: true },
      { color: 'red', count: 3, visibility: true },
      { color: 'yellow', count: 0, visibility: true },
      { color: 'purple', count: 1, visibility: true },
      { color: 'gray', count: 5, visibility: true }, // 灰色必要数: 5
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 4, visibility: true }, // 余剰: 2
      { color: 'green', count: 2, visibility: true }, // 余剰: 1
      { color: 'blue', count: 1, visibility: true }, // 余剰: 1
      { color: 'red', count: 3, visibility: true }, // 余剰: 0
      { color: 'yellow', count: 2, visibility: true }, // 余剰: 2
      { color: 'purple', count: 1, visibility: true }, // 余剰: 0
    ]

    const actual = calculateRequiredGrayBladeHeart(
      requiredLiveHearts,
      memberHearts
    )

    // 灰色必要数5 - メンバー余剰数合計(2+1+1+0+2+0=6) = -1 → 0 (最小値)
    const expected = 0
    expect(actual).toBe(expected)
  })

  it('メンバーハートの余剰がない場合、灰色ハートの必要数がそのまま返されること', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 5, visibility: true },
      { color: 'green', count: 3, visibility: true },
      { color: 'blue', count: 2, visibility: true },
      { color: 'red', count: 4, visibility: true },
      { color: 'yellow', count: 1, visibility: true },
      { color: 'purple', count: 2, visibility: true },
      { color: 'gray', count: 3, visibility: true }, // 灰色必要数: 3
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 2, visibility: true }, // 不足
      { color: 'green', count: 3, visibility: true }, // 同じ
      { color: 'blue', count: 1, visibility: true }, // 不足
      { color: 'red', count: 0, visibility: true }, // 不足
      { color: 'yellow', count: 1, visibility: true }, // 同じ
      { color: 'purple', count: 0, visibility: true }, // 不足
    ]

    const actual = calculateRequiredGrayBladeHeart(
      requiredLiveHearts,
      memberHearts
    )

    // 灰色必要数3 - メンバー余剰数合計0 = 3
    const expected = 3
    expect(actual).toBe(expected)
  })
})

describe('calculateRequiredBladeHeartByColor', () => {
  it('通常の色の場合、必要数からメンバー数を差し引いた値が返されること', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 5, visibility: true },
      { color: 'green', count: 3, visibility: true },
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 2, visibility: true },
      { color: 'green', count: 4, visibility: true },
    ]

    const actual = calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      'pink'
    )

    const expected = 5 - 2
    expect(actual).toBe(expected)
  })

  it('grayの場合、灰色ハートの必要数からメンバーハートの余剰数を差し引いた値が返されることを確認', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 2, visibility: true },
      { color: 'green', count: 1, visibility: true },
      { color: 'blue', count: 0, visibility: true },
      { color: 'red', count: 3, visibility: true },
      { color: 'yellow', count: 0, visibility: true },
      { color: 'purple', count: 1, visibility: true },
      { color: 'gray', count: 5, visibility: true },
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 3, visibility: true }, // 余剰: 1
      { color: 'green', count: 2, visibility: true }, // 余剰: 1
      { color: 'blue', count: 1, visibility: true }, // 余剰: 1
      { color: 'red', count: 3, visibility: true }, // 余剰: 0
      { color: 'yellow', count: 2, visibility: true }, // 余剰: 2
      { color: 'purple', count: 1, visibility: true }, // 余剰: 0
    ]

    const actual = calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      'gray'
    )

    // 灰色必要数5 - メンバー余剰数合計(1+1+1+0+2+0=5) = 0
    const expected = 0
    expect(actual).toBe(expected)
  })
})

describe('calculateTotalRequiredBladeHearts', () => {
  it('合計必要ブレードハート数が正しく計算されることを確認', () => {
    const requiredLiveHearts: HeartCollection = [
      { color: 'pink', count: 4, visibility: true },
      { color: 'green', count: 3, visibility: true },
    ]

    const memberHearts: HeartCollection = [
      { color: 'pink', count: 2, visibility: true },
      { color: 'green', count: 1, visibility: true },
    ]

    const actual = calculateTotalRequiredBladeHearts(
      requiredLiveHearts,
      memberHearts
    )

    const expected = 4 - 2 + (3 - 1)
    expect(actual).toBe(expected)
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

describe('withResetHeartCounts', () => {
  it('全ての色のハートカウントが0にリセットされることを確認', () => {
    const heartCollection: HeartCollection = [
      { color: 'pink', count: 1, visibility: true },
      { color: 'green', count: 2, visibility: false },
      { color: 'blue', count: 3, visibility: false },
      { color: 'red', count: 4, visibility: false },
      { color: 'yellow', count: 5, visibility: false },
      { color: 'purple', count: 6, visibility: false },
    ]

    const actual = withResetHeartCounts(heartCollection)

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
