import { CardAbility } from '@domain/valueObjects/cardAbility'

export interface RenCard {
  count: number
  ability: CardAbility
}

export function createRenCard(count: number): RenCard {
  return {
    count,
    ability: {
      lookCount: 5,
      successRemoveCount: 4,
      failRemoveCount: 5,
    },
  }
}
