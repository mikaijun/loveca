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
 * カードの能力による確率計算
 * @param deckSize デッキサイズ
 * @param cardCount 手札にあるカードの枚数
 * @param wantCardCount 欲しいカードの枚数
 * @param lookCount 能力で見るカードの枚数
 * @param successRemoveCount 成功時に取り除くカードの枚数
 * @param failRemoveCount 失敗時に取り除くカードの枚数
 * @returns 確率と能力で取り除いたカードの枚数
 */
const calculateAbilityProbability = (
  deckSize: number,
  cardCount: number,
  wantCardCount: number,
  lookCount: number,
  successRemoveCount: number,
  failRemoveCount: number
): { probability: number; removedCards: number } => {
  // 見た中に欲しいカードが1枚以上ある確率
  const pWantCardInLook = successProbability(deckSize, wantCardCount, lookCount)

  let probability = 0
  let removedCards = 0

  if (cardCount === 0) {
    // 手札にカードがない場合は能力を使用できない
    probability = 0
    removedCards = 0
  } else if (cardCount === 1) {
    // 手札にカードが1枚の場合は1回だけ能力を使用可能
    probability = pWantCardInLook
    // 欲しいカードが見つかった場合はsuccessRemoveCount枚、見つからなかった場合はfailRemoveCount枚をデッキから取り除く
    removedCards =
      pWantCardInLook * successRemoveCount +
      (1 - pWantCardInLook) * failRemoveCount
  } else if (cardCount === 2) {
    // 手札にカードが2枚の場合は2回まで能力を使用可能
    const pFirstAbility = pWantCardInLook
    const deckSizeAfterFirstAbility =
      deckSize -
      (pFirstAbility * successRemoveCount +
        (1 - pFirstAbility) * failRemoveCount)
    const pSecondAbility = successProbability(
      deckSizeAfterFirstAbility,
      wantCardCount,
      lookCount
    )
    // 1回目で成功する確率 + 1回目で失敗して2回目で成功する確率
    probability = pFirstAbility + (1 - pFirstAbility) * pSecondAbility
    // 1回目で成功した場合: successRemoveCount枚
    // 1回目で失敗して2回目で成功した場合: failRemoveCount枚 + successRemoveCount枚
    // 両方失敗した場合: failRemoveCount枚 + failRemoveCount枚
    removedCards =
      pFirstAbility * successRemoveCount +
      (1 - pFirstAbility) *
        (pSecondAbility * (failRemoveCount + successRemoveCount) +
          (1 - pSecondAbility) * (failRemoveCount + failRemoveCount))
  }

  return { probability, removedCards }
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
  return calculateAbilityProbability(
    deckSize,
    kasumiCount,
    wantCardCount,
    3, // 3枚見る
    2, // 成功時は2枚取り除く
    3 // 失敗時は3枚取り除く
  )
}

/**
 * renの能力による確率計算
 * @param deckSize デッキサイズ
 * @param renCount 手札にあるrenの枚数
 * @param wantCardCount 欲しいカードの枚数
 * @returns 確率とrenの能力で取り除いたカードの枚数
 */
const calculateRenAbilityProbability = (
  deckSize: number,
  renCount: number,
  wantCardCount: number
): { probability: number; removedCards: number } => {
  return calculateAbilityProbability(
    deckSize,
    renCount,
    wantCardCount,
    5, // 5枚見る
    1, // 成功時は1枚取り除く
    5 // 失敗時は5枚取り除く
  )
}

/**
 * カードの処理をシミュレート
 * @param deckSize デッキサイズ
 * @param cardCount デッキ内のカードの枚数
 * @param initialDraw 初手の枚数
 * @param mulliganCount マリガンする枚数
 * @returns カードの処理結果
 */
const simulateCard = (
  deckSize: number,
  cardCount: number,
  initialDraw: number,
  mulliganCount: number
): {
  cardInHand: number
  cardInMulligan: number
  totalCardInHand: number
} => {
  // 初手でカードを引く枚数
  let cardInHand = 0
  let remainingCards = cardCount
  let remainingDeck = deckSize
  for (let j = 0; j < initialDraw; j++) {
    if (Math.random() < remainingCards / remainingDeck) {
      cardInHand++
      remainingCards--
    }
    remainingDeck--
  }
  cardInHand = Math.min(2, cardInHand)

  // マリガンでカードを引く枚数
  let cardInMulligan = 0
  remainingCards = cardCount - cardInHand
  remainingDeck = deckSize - mulliganCount
  for (let j = 0; j < mulliganCount; j++) {
    if (Math.random() < remainingCards / remainingDeck) {
      cardInMulligan++
      remainingCards--
    }
    remainingDeck--
  }
  cardInMulligan = Math.min(2, cardInMulligan)

  // 手札にあるカードの合計枚数
  const totalCardInHand = Math.min(2, cardInHand + cardInMulligan)

  return {
    cardInHand,
    cardInMulligan,
    totalCardInHand,
  }
}

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
    const { totalCardInHand: totalKasumiInHand } = simulateCard(
      adjustedDeckSize,
      kasumiCount,
      initialDraw,
      mulliganCount
    )

    // renの処理をシミュレート
    const { totalCardInHand: totalRenInHand } = simulateCard(
      adjustedDeckSize,
      renCount,
      initialDraw,
      mulliganCount
    )

    // kasumiの能力による確率計算
    const { probability: pKasumiAbility, removedCards: kasumiRemovedCards } =
      calculateKasumiAbilityProbability(
        adjustedDeckSize,
        totalKasumiInHand,
        wantCardCount
      )

    // renの能力による確率計算
    const { probability: pRenAbility, removedCards: renRemovedCards } =
      calculateRenAbilityProbability(
        adjustedDeckSize - kasumiRemovedCards,
        totalRenInHand,
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

    // 最初の成功確率（A成功 or B成功 + kasumiの能力による確率 + renの能力による確率）
    let currentProbability =
      pA +
      (1 - pA) * pB +
      (1 - (pA + (1 - pA) * pB)) * pKasumiAbility +
      (1 - (pA + (1 - pA) * pB + (1 - (pA + (1 - pA) * pB)) * pKasumiAbility)) *
        pRenAbility

    trialResults[trial].push(Math.floor(currentProbability * 1000) / 10)

    // kasumiとrenの能力で欲しいカード以外を取り除いた後のデッキサイズ
    const remainingDeckWithMulligan =
      adjustedDeckSize - kasumiRemovedCards - renRemovedCards

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
