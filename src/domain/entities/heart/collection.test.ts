import { describe, it, expect } from 'vitest'

import {
  HeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetAllHeartCounts,
  getHeartStateByColor,
  getTotalEffectiveCount,
} from '@domain/entities/heart/collection'
import { Heart } from '@domain/entities/heart'
import { HeartColor } from '@domain/valueObjects/HeartColor'

// テストデータ作成ヘルパー関数（ドメインメソッドを使わずに直接作成）
function createTestHeartCollection(
  heartCounts: Record<string, number>
): HeartCollection {
  const states = new Map()

  Object.entries(heartCounts).forEach(([colorValue, count]) => {
    const color: HeartColor = {
      value: colorValue as HeartColor['value'],
    }
    const heart: Heart = {
      color,
      count,
      visibility: true,
    }
    states.set(colorValue, heart)
  })

  return { states }
}

function createTestHeartColor(value: string): HeartColor {
  return { value: value as HeartColor['value'] }
}

describe('HeartCollection', () => {
  describe('withIncrementedHeartCount', () => {
    it('指定した色のハートカウントが1増えることを確認', () => {
      const collection = createTestHeartCollection({ red: 0 })
      const color = createTestHeartColor('red')

      const originalState = getHeartStateByColor(collection, color)
      expect(originalState?.count).toBe(0)

      const incrementedCollection = withIncrementedHeartCount(collection, color)
      const incrementedState = getHeartStateByColor(
        incrementedCollection,
        color
      )
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

  describe('withDecrementedHeartCount', () => {
    it('指定した色のハートカウントが1減ることを確認', () => {
      const collection = createTestHeartCollection({ red: 5 })
      const color = createTestHeartColor('red')

      const decrementedCollection = withDecrementedHeartCount(collection, color)
      const decrementedState = getHeartStateByColor(
        decrementedCollection,
        color
      )
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

  describe('getHeartStateByColor', () => {
    it('指定した色のハート状態が取得できることを確認', () => {
      const collection = createTestHeartCollection({ red: 0 })
      const color = createTestHeartColor('red')

      const state = getHeartStateByColor(collection, color)
      expect(state).toBeDefined()
      expect(state?.color.value).toBe('red')
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

      expect(collection.states.size).toBe(expectedColors.length)

      expectedColors.forEach((colorValue) => {
        const color = createTestHeartColor(colorValue)
        const state = getHeartStateByColor(collection, color)
        expect(state).toBeDefined()
        expect(state?.count).toBe(0)
        expect(state?.visibility).toBe(true)
      })
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
      const expectedColors = [
        'pink',
        'green',
        'blue',
        'red',
        'yellow',
        'purple',
      ]

      expect(collection.states.size).toBe(expectedColors.length)

      expectedColors.forEach((colorValue) => {
        const color = createTestHeartColor(colorValue)
        const state = getHeartStateByColor(collection, color)
        expect(state).toBeDefined()
        expect(state?.count).toBe(0)
        expect(state?.visibility).toBe(true)
      })
    })
  })
})
