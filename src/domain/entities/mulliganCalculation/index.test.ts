import { describe, it, expect } from 'vitest'
import {
  createMulliganCalculation,
  isValidMulliganCalculation,
  type MulliganCalculation,
} from '@domain/entities/mulliganCalculation'

describe('createMulliganCalculation', () => {
  it('正しくMulliganCalculationオブジェクトが作成されること', () => {
    const params = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 3,
      mulliganCount: 4,
    }
    const actual = createMulliganCalculation(params)

    const expected = params
    expect(actual).toEqual(expected)
  })

  it('kasumiCountとrenCountが省略された場合、0で初期化されること', () => {
    const params = {
      deckSize: 60,
      wantCardCount: 3,
      mulliganCount: 4,
    }
    const actual = createMulliganCalculation(params)

    const expected: MulliganCalculation = {
      ...params,
      kasumiCount: 0,
      renCount: 0,
    }
    expect(actual).toEqual(expected)
  })
})

describe('isValidMulliganCalculation', () => {
  it('有効なMulliganCalculationの場合、trueが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 3,
      mulliganCount: 4,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(true)
  })

  it('wantCardCountが0の場合、falseが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 0,
      mulliganCount: 4,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(false)
  })

  it('wantCardCountがdeckSizeより大きい場合、falseが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 61,
      mulliganCount: 4,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(false)
  })

  it('wantCardCountがdeckSizeと等しい場合、trueが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 60,
      mulliganCount: 4,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(true)
  })

  it('mulliganCountが負の数の場合、falseが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 3,
      mulliganCount: -1,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(false)
  })

  it('mulliganCountが6より大きい場合、falseが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 3,
      mulliganCount: 7,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(false)
  })

  it('mulliganCountが6の場合、trueが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 3,
      mulliganCount: 6,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(true)
  })

  it('mulliganCountが0の場合、trueが返されること', () => {
    const calculation: MulliganCalculation = {
      deckSize: 60,
      kasumiCount: 2,
      renCount: 1,
      wantCardCount: 3,
      mulliganCount: 0,
    }
    const actual = isValidMulliganCalculation(calculation)

    expect(actual).toBe(true)
  })
})
