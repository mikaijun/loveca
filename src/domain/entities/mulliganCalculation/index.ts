// MulliganCalculation Entity - マリガン計算のドメインオブジェクト

export interface MulliganCalculation {
  deckSize: number
  kasumiCount: number
  renCount: number
  wantCardCount: number
  mulliganCount: number
}

export function createMulliganCalculation(params: {
  deckSize: number
  kasumiCount?: number
  renCount?: number
  wantCardCount: number
  mulliganCount: number
}): MulliganCalculation {
  return {
    deckSize: params.deckSize,
    kasumiCount: params.kasumiCount ?? 0,
    renCount: params.renCount ?? 0,
    wantCardCount: params.wantCardCount,
    mulliganCount: params.mulliganCount,
  }
}

export function isValidMulliganCalculation(
  calculation: MulliganCalculation
): boolean {
  return (
    calculation.wantCardCount > 0 &&
    calculation.wantCardCount <= calculation.deckSize &&
    calculation.mulliganCount >= 0 &&
    calculation.mulliganCount <= 6
  )
}
