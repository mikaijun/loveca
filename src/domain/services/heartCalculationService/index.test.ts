import { describe, it, expect } from 'vitest'

import { heartCalculationService } from '@domain/services/heartCalculationService'
import { HeartCollection } from '@domain/entities/heart/collection'
import { Heart } from '@domain/entities/heart'
import { HeartColor } from '@domain/valueObjects/heartColor'

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

describe('calculateRequiredBladeHeartByColor', () => {
  it('必要なブレードハート数を正しく計算できるか確認', () => {
    const requiredLiveHearts = createTestHeartCollection({ pink: 3 })
    const memberHearts = createTestHeartCollection({ pink: 1 })
    const pinkColor: HeartColor = { value: 'pink' }

    const result = heartCalculationService.calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      pinkColor
    )

    // 3 - 1 = 2個必要
    expect(result).toBe(2)
  })

  it('メンバーのハートが十分な場合、0を返すか確認', () => {
    const requiredLiveHearts = createTestHeartCollection({ pink: 1 })
    const memberHearts = createTestHeartCollection({ pink: 3 })
    const pinkColor: HeartColor = { value: 'pink' }

    const result = heartCalculationService.calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      pinkColor
    )

    // 十分なので0
    expect(result).toBe(0)
  })

  it('gray色の場合、特別な計算が呼ばれることを確認', () => {
    const requiredLiveHearts = createTestHeartCollection({ gray: 3 })
    const memberHearts = createTestHeartCollection({
      pink: 1,
      green: 2, // 余剰合計3個
    })
    const grayColor: HeartColor = { value: 'gray' }

    const result = heartCalculationService.calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      grayColor
    )

    // gray必要数3 - メンバー余剰数3 = 0
    expect(result).toBe(0)
  })

  it('存在しない色の状態でも正しく計算されることを確認', () => {
    const requiredLiveHearts = createTestHeartCollection({ pink: 2 })
    const memberHearts = createTestHeartCollection({}) // blueが存在しない
    const blueColor: HeartColor = { value: 'blue' }

    const result = heartCalculationService.calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      blueColor
    )

    // required: 0 (存在しない), member: 0 (存在しない) = 0
    expect(result).toBe(0)
  })
})

describe('calculateTotalRequiredBladeHearts', () => {
  it('必要なブレードハートの合計を正しく計算できるか確認', () => {
    const requiredLiveHearts = createTestHeartCollection({
      pink: 3,
      green: 2,
    })
    const memberHearts = createTestHeartCollection({ pink: 1, green: 0 })

    const result = heartCalculationService.calculateTotalRequiredBladeHearts(
      requiredLiveHearts,
      memberHearts
    )

    // pink: max(3-1, 0) = 2
    // green: max(2-0, 0) = 2
    // 合計: 4
    expect(result).toBe(4)
  })
})

describe('getLiveResultMessage', () => {
  it('必要ハート数が0の場合、固定メッセージが返されることを確認', () => {
    const requiredLiveHearts = createTestHeartCollection({}) // 必要数0
    const memberHearts = createTestHeartCollection({ pink: 5 })

    const result = heartCalculationService.getLiveResultMessage(
      requiredLiveHearts,
      memberHearts
    )

    expect(result).toBe('必要ブレードハート数: 0')
  })

  it('ライブ成功の場合、成功メッセージが返されることを確認', () => {
    const requiredLiveHearts = createTestHeartCollection({ pink: 2, green: 1 })
    const memberHearts = createTestHeartCollection({ pink: 2, green: 1 })

    const result = heartCalculationService.getLiveResultMessage(
      requiredLiveHearts,
      memberHearts
    )

    expect(result).toBe('ライブ成功')
  })

  it('ブレードハートが必要な場合、必要数メッセージが返されることを確認', () => {
    const requiredLiveHearts = createTestHeartCollection({ pink: 5, green: 3 })
    const memberHearts = createTestHeartCollection({ pink: 2, green: 1 })

    const result = heartCalculationService.getLiveResultMessage(
      requiredLiveHearts,
      memberHearts
    )

    // pink不足3 + green不足2 = 5
    expect(result).toBe('必要ブレードハート数: 5')
  })
})
