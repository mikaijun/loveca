import { describe, it, expect } from 'vitest'
import {
  createHeartColor,
  getAllLiveHeartColors,
  getAllMemberHeartColors,
  isGrayHeart,
  type HeartColor,
} from '@domain/valueObjects/heartColor'

describe('createHeartColor', () => {
  it('有効な色を指定した場合、正しくHeartColorが作成されること', () => {
    const actual = createHeartColor('pink')
    const expected: HeartColor = 'pink'

    expect(actual).toBe(expected)
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
      'pink',
      'green',
      'blue',
      'red',
      'yellow',
      'purple',
      'gray',
    ]

    expect(actual).toEqual(expected)
  })
})

describe('getAllMemberHeartColors', () => {
  it('全てのメンバーハート色が正しく返されること', () => {
    const actual = getAllMemberHeartColors()
    const expected: HeartColor[] = [
      'pink',
      'green',
      'blue',
      'red',
      'yellow',
      'purple',
    ]

    expect(actual).toEqual(expected)
  })
})

describe('isGrayHeart', () => {
  it('灰色ハートの場合、trueが返されること', () => {
    const grayHeartColor: HeartColor = 'gray'
    const actual = isGrayHeart(grayHeartColor)
    const expected = true

    expect(actual).toBe(expected)
  })

  it('灰色以外のハートの場合、falseが返されること', () => {
    const pinkHeartColor: HeartColor = 'pink'
    const actual = isGrayHeart(pinkHeartColor)
    const expected = false

    expect(actual).toBe(expected)
  })
})
