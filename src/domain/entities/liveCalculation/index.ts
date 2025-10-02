import { chanceOfPicking } from '@utils'

export interface LiveCalculation {
  memberHeartCount: number
  requiredLiveHeartCount: number
  yellCount: number
  deckBladeHeartCount: number
  deckCount: number
}

export function calculateLiveSuccessProbability(calculation: LiveCalculation): {
  probability: string
  isValid: boolean
} {
  if (!isCalculationReady(calculation)) {
    return {
      probability: '-',
      isValid: false,
    }
  }

  const probability = calculateProbability(
    calculation.deckCount,
    calculation.deckBladeHeartCount,
    calculation.yellCount,
    calculation.requiredLiveHeartCount - calculation.memberHeartCount
  )
  const formattedProbability = formatProbability(probability)

  return {
    probability: formattedProbability,
    isValid: true,
  }
}

export function calculateProbability(
  deckCount: number,
  deckBladeHeartCount: number,
  yellCount: number,
  requiredAdditionalHearts: number
): number {
  let probability = 0
  for (let k = 0; k < requiredAdditionalHearts; k++) {
    probability += chanceOfPicking(deckCount, deckBladeHeartCount, yellCount, k)
  }
  return 1 - probability
}

export function formatProbability(probability: number): string {
  if (probability <= 0) return '0'
  if (probability === 1) return '100'
  return (Math.floor(probability * 1000) / 10).toFixed(1)
}

export function isCalculationReady(calculation: LiveCalculation): boolean {
  return (
    calculation.yellCount > 0 &&
    calculation.requiredLiveHeartCount > 0 &&
    calculation.deckCount > 0 &&
    isValidDeck(calculation)
  )
}

export function isValidDeck(calculation: LiveCalculation): boolean {
  return calculation.deckCount >= calculation.deckBladeHeartCount
}
