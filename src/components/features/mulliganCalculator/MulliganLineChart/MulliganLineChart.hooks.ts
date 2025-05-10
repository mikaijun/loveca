import { chanceOfPicking } from '@utils'

/**
 * 非復元抽出で 1枚以上成功する確率
 */
const successProbability = (N: number, K: number, n: number): number => {
  let probability = 0
  for (let k = 0; k < 1; k++) {
    probability += chanceOfPicking(N, K, n, k)
  }
  return 1 - probability
}

/**
 * マリガンを考慮した最終的な成功確率
 */
export const calculateMulliganProbability = (
  wantCardCount: number,
  mulliganCount: number,
  deckSize: number
): number[] => {
  const initialDraw = 6
  const adjustedDeckSize = deckSize - initialDraw // 初期6枚引いた後のデッキサイズ

  if (wantCardCount <= 0 || wantCardCount > deckSize) return [0]
  if (mulliganCount < 0 || mulliganCount > initialDraw) return [0]

  // Aの確率（最初の6枚で引ける確率）
  const pA = successProbability(adjustedDeckSize, wantCardCount, initialDraw)

  // Bの確率（マリガン後の6枚で引ける確率）
  const pB = successProbability(
    adjustedDeckSize - mulliganCount,
    wantCardCount,
    mulliganCount
  )

  // 最初の成功確率（A成功 or B成功）
  let currentProbability = pA + (1 - pA) * pB
  const probabilities = [Math.floor(currentProbability * 1000) / 10]

  const remainingDeckWithMulligan = adjustedDeckSize

  // 1〜10ドロー追加した場合の確率を計算
  for (let t = 1; t <= 10; t++) {
    const currentDeckSize = remainingDeckWithMulligan - t
    const pDraw = successProbability(currentDeckSize, wantCardCount, 1) // 1枚ずつドローの確率
    currentProbability = currentProbability + (1 - currentProbability) * pDraw
    probabilities.push(Math.floor(currentProbability * 1000) / 10)
  }

  return probabilities
}
