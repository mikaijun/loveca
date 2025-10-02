import { describe, it, expect } from 'vitest'
import {
  createHeartColor,
  getAllLiveHeartColors,
  getAllMemberHeartColors,
  getHeartColorValue,
  isGrayHeart,
  type HeartColor,
} from '@domain/valueObjects/heartColor'

describe('createHeartColor', () => {
  it('有効な色を指定した場合、正しくHeartColorが作成されること', () => {
    const pinkHeartColor: HeartColor = { value: 'pink' }
    const actual = createHeartColor(pinkHeartColor.value)
    const expected = pinkHeartColor

    expect(actual).toEqual(expected)
  })

  it('無効な色を指定した場合、エラーが投げられること', () => {
    const invalidHeartColorValue = 'invalid'

    expect(() => createHeartColor(invalidHeartColorValue)).toThrow()
  })
})

describe('getAllLiveHeartColors', () => {
  it('全てのライブ用ハート色が正しく返されること', () => {
    const actual = getAllLiveHeartColors()

    const expected: HeartColor[] = [
      { value: 'pink' },
      { value: 'green' },
      { value: 'blue' },
      { value: 'red' },
      { value: 'yellow' },
      { value: 'purple' },
      { value: 'gray' },
    ]

    expect(actual).toEqual(expected)
  })
})

describe('getAllMemberHeartColors', () => {
  it('全てのメンバーハート色が正しく返されること', () => {
    const actual = getAllMemberHeartColors()
    const expected = [
      { value: 'pink' },
      { value: 'green' },
      { value: 'blue' },
      { value: 'red' },
      { value: 'yellow' },
      { value: 'purple' },
    ]

    expect(actual).toEqual(expected)
  })
})

describe('getHeartColorValue', () => {
  it('HeartColorオブジェクトから正しい値が取得されること', () => {
    const pinkHeartColor: HeartColor = { value: 'pink' }
    const actual = getHeartColorValue(pinkHeartColor)
    const expected = 'pink'

    expect(actual).toBe(expected)
  })
})

describe('isGrayHeart', () => {
  it('灰色ハートの場合、trueが返されること', () => {
    const grayHeartColor: HeartColor = { value: 'gray' }
    const actual = isGrayHeart(grayHeartColor)
    const expected = true

    expect(actual).toBe(expected)
  })

  it('灰色以外のハートの場合、falseが返されること', () => {
    const pinkHeartColor: HeartColor = { value: 'pink' }
    const actual = isGrayHeart(pinkHeartColor)
    const expected = false

    expect(actual).toBe(expected)
  })
})
