import { describe, it, expect } from 'vitest'
import {
  allLiveHeartColors,
  isGrayHeart,
  type HeartColor,
} from '@domain/valueObjects/heartColor/heartColor'

describe('getAllLiveHeartColors', () => {
  it('全てのライブ用ハート色が正しく返されること', () => {
    const actual = allLiveHeartColors

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
