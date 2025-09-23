import { describe, it, expect } from 'vitest'

import { HeartCalculationService } from '@domain/services/HeartCalculationService'
import { HeartCollection } from '@domain/entities/heart/collection'
import { Heart } from '@domain/entities/heart'
import { HeartColor } from '@domain/valueObjects/HeartColor'

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

    const result = HeartCalculationService.calculateRequiredBladeHeartByColor(
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
    const requiredLiveHearts = createTestHeartCollection({
      pink: 3,
      green: 2,
    })
    const memberHearts = createTestHeartCollection({ pink: 1, green: 0 })

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
