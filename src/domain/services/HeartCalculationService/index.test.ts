import { describe, it, expect } from 'vitest'
import {
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
} from '../../entities/heart/collection'
import { createHeartColor } from '../../valueObjects/HeartColor'
import { HeartCalculationService } from './index'

describe('HeartCalculationService', () => {
  describe('calculateRequiredBladeHeartByColor', () => {
    it('必要なブレードハート数を正しく計算できるか確認', () => {
      let requiredLiveHearts = createRequiredLiveHeartCollection()
      let memberHearts = createMemberHeartCollection()

      const pinkColor = createHeartColor('pink')

      // ライブに必要: 3個
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )

      // メンバー: 1個
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)

      const result = HeartCalculationService.calculateRequiredBladeHeartByColor(
        requiredLiveHearts,
        memberHearts,
        pinkColor
      )

      // 3 - 1 = 2個必要
      expect(result).toBe(2)
    })

    it('メンバーのハートが十分な場合、0を返すか確認', () => {
      let requiredLiveHearts = createRequiredLiveHeartCollection()
      let memberHearts = createMemberHeartCollection()

      const pinkColor = createHeartColor('pink')

      // ライブに必要: 1個
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )

      // メンバー: 3個
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)

      const result = HeartCalculationService.calculateRequiredBladeHeartByColor(
        requiredLiveHearts,
        memberHearts,
        pinkColor
      )

      // 十分なので0
      expect(result).toBe(0)
    })
  })

  describe('calculateTotalRequiredBladeHearts', () => {
    it('必要なブレードハートの合計を正しく計算できるか確認', () => {
      let requiredLiveHearts = createRequiredLiveHeartCollection()
      let memberHearts = createMemberHeartCollection()

      const pinkColor = createHeartColor('pink')
      const greenColor = createHeartColor('green')

      // ライブ必要: pink=3, green=2
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        greenColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        greenColor
      )

      // メンバー: pink=1, green=0
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)

      const result = HeartCalculationService.calculateTotalRequiredBladeHearts(
        requiredLiveHearts,
        memberHearts
      )

      // pink: max(3-1, 0) = 2
      // green: max(2-0, 0) = 2
      // 合計: 4
      expect(result).toBe(4)
    })
  })

  describe('canSucceedLive', () => {
    it('ライブに成功できる場合、trueを返すか確認', () => {
      let requiredLiveHearts = createRequiredLiveHeartCollection()
      let memberHearts = createMemberHeartCollection()

      const pinkColor = createHeartColor('pink')

      // ライブ必要: 2個
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )
      requiredLiveHearts = withIncrementedHeartCount(
        requiredLiveHearts,
        pinkColor
      )

      // メンバー: 3個（十分）
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)

      const result = HeartCalculationService.canSucceedLive(
        requiredLiveHearts,
        memberHearts
      )

      expect(result).toBe(true)
    })

    it('ライブに失敗する場合、falseを返すか確認', () => {
      let requiredLiveHearts = createRequiredLiveHeartCollection()
      let memberHearts = createMemberHeartCollection()

      const pinkColor = createHeartColor('pink')

      // ライブ必要: 5個
      for (let i = 0; i < 5; i++) {
        requiredLiveHearts = withIncrementedHeartCount(
          requiredLiveHearts,
          pinkColor
        )
      }

      // メンバー: 2個（不足）
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)
      memberHearts = withIncrementedHeartCount(memberHearts, pinkColor)

      const result = HeartCalculationService.canSucceedLive(
        requiredLiveHearts,
        memberHearts
      )

      expect(result).toBe(false)
    })
  })
})
