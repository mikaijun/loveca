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
 * kasumiの能力による確率計算
 * @param deckSize デッキサイズ
 * @param kasumiCount 手札にあるkasumiの枚数
 * @param wantCardCount 欲しいカードの枚数
 * @returns 確率とkasumiの能力で取り除いたカードの枚数
 */
const calculateKasumiAbilityProbability = (
  deckSize: number,
  kasumiCount: number,
  wantCardCount: number
): { probability: number; removedCards: number } => {
  // 3枚見た中に欲しいカードが1枚以上ある確率
  const pWantCardInThree = successProbability(deckSize, wantCardCount, 3)

  let probability = 0
  let removedCards = 0

  if (kasumiCount === 0) {
    // 手札にkasumiがない場合は能力を使用できない
    probability = 0
    removedCards = 0
  } else if (kasumiCount === 1) {
    // 手札にkasumiが1枚の場合は1回だけ能力を使用可能
    probability = pWantCardInThree
    // 欲しいカードが見つかった場合は2枚、見つからなかった場合は3枚をデッキから取り除く
    removedCards = pWantCardInThree * 2 + (1 - pWantCardInThree) * 3
  } else if (kasumiCount === 2) {
    // 手札にkasumiが2枚の場合は2回まで能力を使用可能
    const pFirstAbility = pWantCardInThree
    const deckSizeAfterFirstAbility =
      deckSize - (pFirstAbility * 2 + (1 - pFirstAbility) * 3)
    const pSecondAbility = successProbability(
      deckSizeAfterFirstAbility,
      wantCardCount,
      3
    )
    // 1回目で成功する確率 + 1回目で失敗して2回目で成功する確率
    probability = pFirstAbility + (1 - pFirstAbility) * pSecondAbility
    // 1回目で成功した場合: 2枚
    // 1回目で失敗して2回目で成功した場合: 3枚 + 2枚
    // 両方失敗した場合: 3枚 + 3枚
    removedCards =
      pFirstAbility * 2 +
      (1 - pFirstAbility) *
        (pSecondAbility * (3 + 2) + (1 - pSecondAbility) * (3 + 3))
  }

  return { probability, removedCards }
}

/**
 * kasumiの処理をシミュレート
 * @param deckSize デッキサイズ
 * @param kasumiCount デッキ内のkasumiの枚数
 * @param initialDraw 初手の枚数
 * @param mulliganCount マリガンする枚数
 * @returns kasumiの処理結果
 */
const simulateKasumi = (
  deckSize: number,
  kasumiCount: number,
  initialDraw: number,
  mulliganCount: number
): {
  kasumiInHand: number
  kasumiInMulligan: number
  totalKasumiInHand: number
} => {
  // 初手でkasumiを引く枚数
  let kasumiInHand = 0
  let remainingKasumi = kasumiCount
  let remainingDeck = deckSize
  for (let j = 0; j < initialDraw; j++) {
    if (Math.random() < remainingKasumi / remainingDeck) {
      kasumiInHand++
      remainingKasumi--
    }
    remainingDeck--
  }
  kasumiInHand = Math.min(2, kasumiInHand)

  // マリガンでkasumiを引く枚数
  let kasumiInMulligan = 0
  remainingKasumi = kasumiCount - kasumiInHand
  remainingDeck = deckSize - mulliganCount
  for (let j = 0; j < mulliganCount; j++) {
    if (Math.random() < remainingKasumi / remainingDeck) {
      kasumiInMulligan++
      remainingKasumi--
    }
    remainingDeck--
  }
  kasumiInMulligan = Math.min(2, kasumiInMulligan)

  // 手札にあるkasumiの合計枚数
  const totalKasumiInHand = Math.min(2, kasumiInHand + kasumiInMulligan)

  return {
    kasumiInHand,
    kasumiInMulligan,
    totalKasumiInHand,
  }
}

/**
 * マリガンを考慮した最終的な成功確率
 */
export const calculateMulliganProbability = ({
  deckSize,
  kasumiCount = 0,
  wantCardCount,
  mulliganCount,
}: {
  deckSize: number
  kasumiCount?: number
  wantCardCount: number
  mulliganCount: number
}): number[] => {
  const initialDraw = 6
  const adjustedDeckSize = deckSize - initialDraw // 初期6枚引いた後のデッキサイズ

  if (wantCardCount <= 0 || wantCardCount > deckSize) return [0]
  if (mulliganCount < 0 || mulliganCount > initialDraw) return [0]

  // 100回の試行の結果を格納する配列
  const trialResults: number[][] = Array(100)
    .fill([])
    .map(() => [])

  for (let trial = 0; trial < 100; trial++) {
    // kasumiの処理をシミュレート
    const { totalKasumiInHand } = simulateKasumi(
      adjustedDeckSize,
      kasumiCount,
      initialDraw,
      mulliganCount
    )

    // kasumiの能力による確率計算
    const { probability: pKasumiAbility, removedCards } =
      calculateKasumiAbilityProbability(
        adjustedDeckSize,
        totalKasumiInHand,
        wantCardCount
      )

    // 初手で欲しいカードを引く確率
    const pA = successProbability(adjustedDeckSize, wantCardCount, initialDraw)

    // マリガンで欲しいカードを引く確率
    const pB = successProbability(
      adjustedDeckSize - mulliganCount,
      wantCardCount,
      mulliganCount
    )

    // 最初の成功確率（A成功 or B成功 + kasumiの能力による確率）
    let currentProbability =
      pA + (1 - pA) * pB + (1 - (pA + (1 - pA) * pB)) * pKasumiAbility
    trialResults[trial].push(Math.floor(currentProbability * 1000) / 10)

    // kasumiの能力で欲しいカード以外を取り除いた後のデッキサイズ
    const remainingDeckWithMulligan = adjustedDeckSize - removedCards

    // 1〜10ドロー追加した場合の確率を計算
    for (let t = 1; t <= 10; t++) {
      const currentDeckSize = remainingDeckWithMulligan - t
      const pDraw = successProbability(currentDeckSize, wantCardCount, 1) // 1枚ずつドローの確率
      currentProbability = currentProbability + (1 - currentProbability) * pDraw
      trialResults[trial].push(Math.floor(currentProbability * 1000) / 10)
    }
  }

  // 100回の試行の平均を計算
  const probabilities = Array(11).fill(0)
  for (let i = 0; i < 11; i++) {
    const sum = trialResults.reduce((acc, trial) => acc + trial[i], 0)
    probabilities[i] = Math.floor((sum / 100) * 10) / 10
  }

  return probabilities
}
