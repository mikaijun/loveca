import { describe, it, expect } from 'vitest'
import {
  createKasumiCard,
  KasumiCard,
} from '@domain/valueObjects/cardAbility/kasumi'

describe('createKasumiCard', () => {
  it('正しいKasumiCardを作成できること', () => {
    const count = 2
    const actual = createKasumiCard(count)

    const expected: KasumiCard = {
      count: 2,
      ability: {
        lookCount: 3,
        successRemoveCount: 2,
        failRemoveCount: 3,
      },
    }

    expect(actual).toEqual(expected)
  })
})
