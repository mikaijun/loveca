import { describe, it, expect } from 'vitest'

import {
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetAllHeartCounts,
  getHeartStateByColor,
  getTotalEffectiveCount,
} from '@domain/entities/heart/collection'
import {
  createHeartColor,
  getAllLiveHeartColors,
  getAllMemberHeartColors,
} from '@domain/valueObjects/HeartColor'

describe('HeartCollection', () => {
  describe('withIncrementedHeartCount', () => {
    it('指定した色のハートカウントが1増えることを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const color = createHeartColor('red')

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
      let collection = createRequiredLiveHeartCollection()
      const color = createHeartColor('red')

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
      let collection = createRequiredLiveHeartCollection()
      const color = createHeartColor('red')

      // 先に5まで増やす
      for (let i = 0; i < 5; i++) {
        collection = withIncrementedHeartCount(collection, color)
      }

      const decrementedCollection = withDecrementedHeartCount(collection, color)
      const decrementedState = getHeartStateByColor(
        decrementedCollection,
        color
      )
      expect(decrementedState?.count).toBe(4)
    })

    it('最小値（0）に達したときそれ以下にならないことを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const color = createHeartColor('red')

      const decrementedCollection = withDecrementedHeartCount(collection, color)
      const finalState = getHeartStateByColor(decrementedCollection, color)
      expect(finalState?.count).toBe(0)
    })
  })

  describe('withResetAllHeartCounts', () => {
    it('全ての色のハートカウントが0にリセットされることを確認', () => {
      let collection = createRequiredLiveHeartCollection()

      // いくつかの色のハートを増やす
      const colors = getAllLiveHeartColors()
      colors.forEach((color) => {
        for (let i = 0; i < 5; i++) {
          collection = withIncrementedHeartCount(collection, color)
        }
      })

      const resetCollection = withResetAllHeartCounts(collection)

      colors.forEach((color) => {
        const state = getHeartStateByColor(resetCollection, color)
        expect(state?.count).toBe(0)
      })
    })
  })

  describe('getTotalEffectiveCount', () => {
    it('有効なハートの総数が正しく計算されることを確認', () => {
      let collection = createRequiredLiveHeartCollection()
      const color1 = createHeartColor('red')
      const color2 = createHeartColor('blue')

      // red を3個、blue を2個に設定
      for (let i = 0; i < 3; i++) {
        collection = withIncrementedHeartCount(collection, color1)
      }
      for (let i = 0; i < 2; i++) {
        collection = withIncrementedHeartCount(collection, color2)
      }

      const total = getTotalEffectiveCount(collection)
      expect(total).toBe(5)
    })
  })

  describe('getHeartStateByColor', () => {
    it('指定した色のハート状態が取得できることを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const color = createHeartColor('red')

      const state = getHeartStateByColor(collection, color)
      expect(state).toBeDefined()
      expect(state?.color.value).toBe('red')
      expect(state?.count).toBe(0)
      expect(state?.visibility).toBe(true)
    })

    it('存在しない色を指定した場合、undefinedが返されることを確認', () => {
      const collection = createMemberHeartCollection()
      const color = createHeartColor('gray') // メンバーハートに灰色は含まれない

      const state = getHeartStateByColor(collection, color)
      expect(state).toBeUndefined()
    })
  })

  describe('createRequiredLiveHeartCollection', () => {
    it('ライブに必要なハートコレクションが正しく生成されることを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const liveColors = getAllLiveHeartColors()

      expect(collection.states.size).toBe(liveColors.length)

      liveColors.forEach((color) => {
        const state = getHeartStateByColor(collection, color)
        expect(state).toBeDefined()
        expect(state?.count).toBe(0)
        expect(state?.visibility).toBe(true)
      })
    })
  })

  describe('createMemberHeartCollection', () => {
    it('メンバーハートコレクションが正しく生成されることを確認', () => {
      const collection = createMemberHeartCollection()
      const memberColors = getAllMemberHeartColors()

      expect(collection.states.size).toBe(memberColors.length)

      memberColors.forEach((color) => {
        const state = getHeartStateByColor(collection, color)
        expect(state).toBeDefined()
        expect(state?.count).toBe(0)
        expect(state?.visibility).toBe(true)
      })
    })
  })
})
