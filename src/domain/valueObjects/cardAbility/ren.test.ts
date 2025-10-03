import { describe, it, expect } from 'vitest'
import { createRenCard, RenCard } from '@domain/valueObjects/cardAbility/ren'

describe('createKasumiCard', () => {
  it('正しいKasumiCardを作成できること', () => {
    const count = 2
    const actual = createRenCard(count)

    const expected: RenCard = {
      count: 2,
      ability: {
        lookCount: 5,
        successRemoveCount: 4,
        failRemoveCount: 5,
      },
    }

    expect(actual).toEqual(expected)
  })
})
