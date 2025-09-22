import { describe, it, expect } from 'vitest'
import {
  createHeartColor,
  getAllLiveHeartColors,
  getAllMemberHeartColors,
} from '../../valueObjects/HeartColor'
import {
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetAllHeartCounts,
  getHeartStateByColor,
  getTotalEffectiveCount,
} from './collection'
import { getEffectiveCount } from '.'

describe('HeartCollection', () => {
  describe('withIncrementedHeartCount', () => {
    it('指定した色のハートカウントが1増えることを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const pinkColor = createHeartColor('pink')

      const result = withIncrementedHeartCount(collection, pinkColor)

      const pinkState = getHeartStateByColor(result, pinkColor)
      const originalPinkState = getHeartStateByColor(collection, pinkColor)

      expect(pinkState).not.toBeNull()
      expect(originalPinkState).not.toBeNull()

      if (pinkState && originalPinkState) {
        expect(getEffectiveCount(pinkState)).toBe(
          getEffectiveCount(originalPinkState) + 1
        )
      }
    })

    it('他の色は変更されないことを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const pinkColor = createHeartColor('pink')
      const greenColor = createHeartColor('green')

      const result = withIncrementedHeartCount(collection, pinkColor)

      const originalGreenState = getHeartStateByColor(collection, greenColor)
      const resultGreenState = getHeartStateByColor(result, greenColor)

      expect(originalGreenState).not.toBeNull()
      expect(resultGreenState).not.toBeNull()

      if (originalGreenState && resultGreenState) {
        expect(getEffectiveCount(resultGreenState)).toBe(
          getEffectiveCount(originalGreenState)
        )
        expect(resultGreenState.visibility).toBe(originalGreenState.visibility)
      }
    })
  })

  describe('withDecrementedHeartCount', () => {
    it('指定した色のハートカウントが1減ることを確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const pinkColor = createHeartColor('pink')

      // まず1回インクリメントしてからデクリメント
      const incrementedCollection = withIncrementedHeartCount(
        collection,
        pinkColor
      )
      const result = withDecrementedHeartCount(incrementedCollection, pinkColor)

      const originalPinkState = getHeartStateByColor(collection, pinkColor)
      const resultPinkState = getHeartStateByColor(result, pinkColor)

      expect(originalPinkState).not.toBeNull()
      expect(resultPinkState).not.toBeNull()

      if (originalPinkState && resultPinkState) {
        expect(getEffectiveCount(resultPinkState)).toBe(
          getEffectiveCount(originalPinkState)
        )
      }
    })

    it('カウントが0でもマイナスにならないことを確認', () => {
      const collection = createMemberHeartCollection()
      const pinkColor = createHeartColor('pink')

      // 最初から0の状態でデクリメント
      const result = withDecrementedHeartCount(collection, pinkColor)

      const resultPinkState = getHeartStateByColor(result, pinkColor)

      expect(resultPinkState).not.toBeNull()

      if (resultPinkState) {
        expect(getEffectiveCount(resultPinkState)).toBe(0)
      }
    })
  })

  describe('withResetAllHeartCounts', () => {
    it('全ての色のカウントが0にリセットされることを確認', () => {
      let collection = createRequiredLiveHeartCollection()

      // いくつかの色をインクリメント
      const pinkColor = createHeartColor('pink')
      const greenColor = createHeartColor('green')

      collection = withIncrementedHeartCount(collection, pinkColor)
      collection = withIncrementedHeartCount(collection, pinkColor)
      collection = withIncrementedHeartCount(collection, greenColor)

      // リセット
      const result = withResetAllHeartCounts(collection)

      // 全ての色をチェック
      getAllLiveHeartColors().forEach((color) => {
        const state = getHeartStateByColor(result, color)
        expect(state).not.toBeNull()
        if (state) {
          expect(getEffectiveCount(state)).toBe(0)
        }
      })
    })

    it('visibilityは変更されないことを確認', () => {
      const collection = createMemberHeartCollection()
      const result = withResetAllHeartCounts(collection)

      getAllMemberHeartColors().forEach((color) => {
        const originalState = getHeartStateByColor(collection, color)
        const resultState = getHeartStateByColor(result, color)

        expect(originalState).not.toBeNull()
        expect(resultState).not.toBeNull()

        if (originalState && resultState) {
          expect(resultState.visibility).toBe(originalState.visibility)
        }
      })
    })
  })

  describe('getTotalEffectiveCount', () => {
    it('表示中のハートの合計数を正しく計算できるか確認', () => {
      let collection = createRequiredLiveHeartCollection()

      const pinkColor = createHeartColor('pink')
      const greenColor = createHeartColor('green')

      // pink: 2個, green: 3個追加
      collection = withIncrementedHeartCount(collection, pinkColor)
      collection = withIncrementedHeartCount(collection, pinkColor)
      collection = withIncrementedHeartCount(collection, greenColor)
      collection = withIncrementedHeartCount(collection, greenColor)
      collection = withIncrementedHeartCount(collection, greenColor)

      const total = getTotalEffectiveCount(collection)
      expect(total).toBe(5)
    })

    it('全てのハートが0の場合、0を返すか確認', () => {
      const collection = createRequiredLiveHeartCollection()
      const total = getTotalEffectiveCount(collection)
      expect(total).toBe(0)
    })
  })
})
