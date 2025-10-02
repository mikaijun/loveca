import { describe, it, expect } from 'vitest'
import {
  LiveCalculation,
  calculateLiveSuccessProbability,
  calculateProbability,
  formatProbability,
  isCalculationReady,
  isValidDeck,
} from '@domain/entities/liveCalculation'

describe('calculateLiveSuccessProbability', () => {
  it('計算準備ができていない場合、無効な結果を返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 0,
      yellCount: 0,
      deckBladeHeartCount: 30,
      deckCount: 60,
    }

    const actual = calculateLiveSuccessProbability(calculation)

    expect(actual).toEqual({
      probability: '-',
      isValid: false,
    })
  })

  it('計算準備ができている場合、有効な確率を返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 10,
      yellCount: 3,
      deckBladeHeartCount: 30,
      deckCount: 60,
    }

    const actual = calculateLiveSuccessProbability(calculation)

    expect(actual.isValid).toBe(true)
    expect(typeof actual.probability).toBe('string')
  })

  it('確率が0の場合、"0"を返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 10,
      yellCount: 1,
      deckBladeHeartCount: 0, // ブレードハートが0なので確率は0
      deckCount: 60,
    }

    const actual = calculateLiveSuccessProbability(calculation)

    expect(actual).toEqual({
      probability: '0',
      isValid: true,
    })
  })

  it('確率が1の場合、"100"を返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 5, // 必要数とメンバー数が同じ
      yellCount: 1,
      deckBladeHeartCount: 60, // デッキ全てがブレードハート
      deckCount: 60,
    }

    const actual = calculateLiveSuccessProbability(calculation)

    expect(actual).toEqual({
      probability: '100',
      isValid: true,
    })
  })
})

describe('calculateProbability', () => {
  it('基本的な確率計算が正しく行われること', () => {
    const actual = calculateProbability(60, 30, 5, 2)
    expect(typeof actual).toBe('number')
    expect(actual).toBeGreaterThanOrEqual(0)
    expect(actual).toBeLessThanOrEqual(1)
  })

  it('requiredAdditionalHeartsが0の場合、確率が1になること', () => {
    const actual = calculateProbability(60, 30, 5, 0)
    expect(actual).toBe(1)
  })
})

describe('formatProbability', () => {
  it('確率が0以下の場合、"0"を返すこと', () => {
    expect(formatProbability(0)).toBe('0')
    expect(formatProbability(-0.1)).toBe('0')
  })

  it('確率が1の場合、"100"を返すこと', () => {
    expect(formatProbability(1)).toBe('100')
  })

  it('確率が0.5の場合、"50.0"を返すこと', () => {
    expect(formatProbability(0.5)).toBe('50.0')
  })

  it('確率が0.123の場合、"12.3"を返すこと', () => {
    expect(formatProbability(0.123)).toBe('12.3')
  })

  it('確率が0.1234の場合、"12.3"を返すこと（小数点1桁で切り捨て）', () => {
    expect(formatProbability(0.1234)).toBe('12.3')
  })
})

describe('isCalculationReady', () => {
  it('全ての条件が満たされている場合、trueを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 10,
      yellCount: 3,
      deckBladeHeartCount: 30,
      deckCount: 60,
    }

    const actual = isCalculationReady(calculation)
    expect(actual).toBe(true)
  })

  it('エール回数が0の場合、falseを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 10,
      yellCount: 0,
      deckBladeHeartCount: 30,
      deckCount: 60,
    }

    const actual = isCalculationReady(calculation)
    expect(actual).toBe(false)
  })

  it('必要ライブハート数が0の場合、falseを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 0,
      yellCount: 3,
      deckBladeHeartCount: 30,
      deckCount: 60,
    }

    const actual = isCalculationReady(calculation)
    expect(actual).toBe(false)
  })

  it('デッキ枚数が0の場合、falseを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 10,
      yellCount: 3,
      deckBladeHeartCount: 30,
      deckCount: 0,
    }

    const actual = isCalculationReady(calculation)
    expect(actual).toBe(false)
  })

  it('ブレードハート枚数がデッキ枚数を超えている場合、falseを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 5,
      requiredLiveHeartCount: 10,
      yellCount: 3,
      deckBladeHeartCount: 70,
      deckCount: 60,
    }

    const actual = isCalculationReady(calculation)
    expect(actual).toBe(false)
  })
})

describe('isValidDeck', () => {
  it('デッキ枚数がブレードハート枚数以上の場合、trueを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
      yellCount: 0,
      deckBladeHeartCount: 30,
      deckCount: 60,
    }

    const actual = isValidDeck(calculation)
    expect(actual).toBe(true)
  })

  it('デッキ枚数がブレードハート枚数未満の場合、falseを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
      yellCount: 0,
      deckBladeHeartCount: 70,
      deckCount: 60,
    }

    const actual = isValidDeck(calculation)
    expect(actual).toBe(false)
  })

  it('デッキ枚数とブレードハート枚数が同じ場合、trueを返すこと', () => {
    const calculation: LiveCalculation = {
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
      yellCount: 0,
      deckBladeHeartCount: 60,
      deckCount: 60,
    }

    const actual = isValidDeck(calculation)
    expect(actual).toBe(true)
  })
})
