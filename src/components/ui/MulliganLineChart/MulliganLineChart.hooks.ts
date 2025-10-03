import { createMulliganCalculation } from '@domain/entities/mulliganCalculation'
import { calculateMulliganProbability as calculateMulliganProbabilityService } from '@domain/services/mulliganProbabilityService'

/**
 * マリガンを考慮した最終的な成功確率
 */
export const calculateMulliganProbability = ({
  deckSize,
  kasumiCount = 0,
  renCount = 0,
  wantCardCount,
  mulliganCount,
}: {
  deckSize: number
  kasumiCount?: number
  renCount?: number
  wantCardCount: number
  mulliganCount: number
}): number[] => {
  const calculation = createMulliganCalculation({
    deckSize,
    kasumiCount,
    renCount,
    wantCardCount,
    mulliganCount,
  })

  return calculateMulliganProbabilityService(calculation)
}
