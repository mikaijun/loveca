import { CardAbility } from '@domain/valueObjects/cardAbility'

export interface KasumiCard {
  count: number
  ability: CardAbility
}

export function createKasumiCard(count: number): KasumiCard {
  return {
    count,
    ability: {
      lookCount: 3,
      successRemoveCount: 2,
      failRemoveCount: 3,
    },
  }
}
