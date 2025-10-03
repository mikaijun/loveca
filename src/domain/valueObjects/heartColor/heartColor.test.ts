import { describe, it, expect } from 'vitest'
import {
  isGrayHeart,
  type HeartColor,
} from '@domain/valueObjects/heartColor/heartColor'

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
