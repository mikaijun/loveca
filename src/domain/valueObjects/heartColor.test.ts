import { describe, it, expect } from 'vitest'
import { createHeartColor, isGrayHeart } from './heartColor'

describe('createHeartColor', () => {
  it('有効な色の場合、正しくHeartColorが作成されること', () => {
    const validColors = [
      'pink',
      'green',
      'blue',
      'red',
      'yellow',
      'purple',
      'gray',
    ]

    validColors.forEach((color) => {
      const result = createHeartColor(color)
      expect(result.value).toBe(color)
    })
  })

  it('無効な色の場合、エラーが投げられること', () => {
    const invalidColors = ['orange', 'black', 'white', '', 'invalid']

    invalidColors.forEach((color) => {
      expect(() => createHeartColor(color)).toThrow(
        `無効なハートの色です: ${color}`
      )
    })
  })
})

describe('isGrayHeart', () => {
  it('灰色ハートの場合、trueが返されること', () => {
    const grayColor = createHeartColor('gray')
    expect(isGrayHeart(grayColor)).toBe(true)
  })

  it('灰色以外のハートの場合、falseが返されること', () => {
    const colors = ['pink', 'green', 'blue', 'red', 'yellow', 'purple']

    colors.forEach((colorValue) => {
      const color = createHeartColor(colorValue)
      expect(isGrayHeart(color)).toBe(false)
    })
  })
})
