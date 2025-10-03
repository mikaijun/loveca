import { chanceOfPicking } from '@utils'
import { MulliganCalculation } from '@domain/entities/mulliganCalculation'
import { createKasumiCard } from '@domain/valueObjects/cardAbility/kasumi'
import { createRenCard } from '@domain/valueObjects/cardAbility/ren'

/**
 * 非復元抽出で 1枚以上成功する確率
 */
export function successProbability(
  deckSize: number,
  wantCardCount: number,
  drawCount: number
): number {
  let probability = 0
  for (let k = 0; k < 1; k++) {
    probability += chanceOfPicking(deckSize, wantCardCount, drawCount, k)
  }
  return 1 - probability
}

/**
 * カードの能力による確率計算（共通ロジック）
 */
export function calculateAbilityProbability(
  deckSize: number,
  cardCount: number,
  wantCardCount: number,
  ability: {
    lookCount: number
    successRemoveCount: number
    failRemoveCount: number
  }
): { probability: number; removedCards: number } {
  // 見た中に欲しいカードが1枚以上ある確率
  const pWantCardInLook = successProbability(
    deckSize,
    wantCardCount,
    ability.lookCount
  )

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
      pWantCardInLook * ability.successRemoveCount +
      (1 - pWantCardInLook) * ability.failRemoveCount
  } else if (cardCount === 2) {
    // 手札にカードが2枚の場合は2回まで能力を使用可能
    const pFirstAbility = pWantCardInLook
    const deckSizeAfterFirstAbility =
      deckSize -
      (pFirstAbility * ability.successRemoveCount +
        (1 - pFirstAbility) * ability.failRemoveCount)
    const pSecondAbility = successProbability(
      deckSizeAfterFirstAbility,
      wantCardCount,
      ability.lookCount
    )
    // 1回目で成功する確率 + 1回目で失敗して2回目で成功する確率
    probability = pFirstAbility + (1 - pFirstAbility) * pSecondAbility
    // 1回目で成功した場合: successRemoveCount枚
    // 1回目で失敗して2回目で成功した場合: failRemoveCount枚 + successRemoveCount枚
    // 両方失敗した場合: failRemoveCount枚 + failRemoveCount枚
    removedCards =
      pFirstAbility * ability.successRemoveCount +
      (1 - pFirstAbility) *
        (pSecondAbility *
          (ability.failRemoveCount + ability.successRemoveCount) +
          (1 - pSecondAbility) *
            (ability.failRemoveCount + ability.failRemoveCount))
  }

  return { probability, removedCards }
}

/**
 * カードの処理をシミュレート
 */
export function simulateCard(
  deckSize: number,
  cardCount: number,
  initialDraw: number,
  mulliganCount: number
): {
  cardInHand: number
  cardInMulligan: number
  totalCardInHand: number
} {
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
 * カードのシミュレーション結果を取得
 */
export function simulateCards(
  calculation: MulliganCalculation,
  adjustedDeckSize: number,
  initialDraw: number
): {
  totalKasumiInHand: number
  totalRenInHand: number
} {
  // kasumiの処理をシミュレート
  const { totalCardInHand: totalKasumiInHand } = simulateCard(
    adjustedDeckSize,
    calculation.kasumiCount,
    initialDraw,
    calculation.mulliganCount
  )

  // renの処理をシミュレート
  const { totalCardInHand: totalRenInHand } = simulateCard(
    adjustedDeckSize,
    calculation.renCount,
    initialDraw,
    calculation.mulliganCount
  )

  return {
    totalKasumiInHand,
    totalRenInHand,
  }
}

/**
 * カードの能力による確率計算結果を取得
 */
export function calculateCardAbilities(
  calculation: MulliganCalculation,
  adjustedDeckSize: number,
  totalKasumiInHand: number,
  totalRenInHand: number
): {
  pKasumiAbility: number
  kasumiRemovedCards: number
  pRenAbility: number
  renRemovedCards: number
} {
  // kasumiの能力による確率計算
  const kasumiCard = createKasumiCard(totalKasumiInHand)
  const { probability: pKasumiAbility, removedCards: kasumiRemovedCards } =
    calculateAbilityProbability(
      adjustedDeckSize,
      kasumiCard.count,
      calculation.wantCardCount,
      kasumiCard.ability
    )

  // renの能力による確率計算
  const renCard = createRenCard(totalRenInHand)
  const { probability: pRenAbility, removedCards: renRemovedCards } =
    calculateAbilityProbability(
      adjustedDeckSize - kasumiRemovedCards,
      renCard.count,
      calculation.wantCardCount,
      renCard.ability
    )

  return {
    pKasumiAbility,
    kasumiRemovedCards,
    pRenAbility,
    renRemovedCards,
  }
}

/**
 * 初手とマリガンの確率を計算
 */
export function calculateInitialProbabilities(
  calculation: MulliganCalculation,
  adjustedDeckSize: number,
  initialDraw: number
): {
  pA: number
  pB: number
} {
  // 初手で欲しいカードを引く確率
  const pA = successProbability(
    adjustedDeckSize,
    calculation.wantCardCount,
    initialDraw
  )

  // マリガンで欲しいカードを引く確率
  const pB = successProbability(
    adjustedDeckSize - calculation.mulliganCount,
    calculation.wantCardCount,
    calculation.mulliganCount
  )

  return { pA, pB }
}

/**
 * 最初の成功確率を計算
 */
export function calculateInitialSuccessProbability(
  pA: number,
  pB: number,
  pKasumiAbility: number,
  pRenAbility: number
): number {
  return (
    pA +
    (1 - pA) * pB +
    (1 - (pA + (1 - pA) * pB)) * pKasumiAbility +
    (1 - (pA + (1 - pA) * pB + (1 - (pA + (1 - pA) * pB)) * pKasumiAbility)) *
      pRenAbility
  )
}

/**
 * 追加ドローの確率を計算
 */
export function calculateAdditionalDrawProbabilities(
  calculation: MulliganCalculation,
  remainingDeckWithMulligan: number,
  initialProbability: number
): number[] {
  const probabilities = [Math.floor(initialProbability * 1000) / 10]
  let currentProbability = initialProbability

  // 1〜10ドロー追加した場合の確率を計算
  for (let t = 1; t <= 10; t++) {
    const currentDeckSize = remainingDeckWithMulligan - t
    const pDraw = successProbability(
      currentDeckSize,
      calculation.wantCardCount,
      1
    ) // 1枚ずつドローの確率
    currentProbability = currentProbability + (1 - currentProbability) * pDraw
    probabilities.push(Math.floor(currentProbability * 1000) / 10)
  }

  return probabilities
}

/**
 * 1回の試行での確率計算
 */
export function calculateTrialProbability(
  calculation: MulliganCalculation,
  adjustedDeckSize: number,
  initialDraw: number
): number[] {
  // カードのシミュレーション結果を取得
  const { totalKasumiInHand, totalRenInHand } = simulateCards(
    calculation,
    adjustedDeckSize,
    initialDraw
  )

  // カードの能力による確率計算結果を取得
  const { pKasumiAbility, kasumiRemovedCards, pRenAbility, renRemovedCards } =
    calculateCardAbilities(
      calculation,
      adjustedDeckSize,
      totalKasumiInHand,
      totalRenInHand
    )

  // 初手とマリガンの確率を計算
  const { pA, pB } = calculateInitialProbabilities(
    calculation,
    adjustedDeckSize,
    initialDraw
  )

  // 最初の成功確率を計算
  const initialProbability = calculateInitialSuccessProbability(
    pA,
    pB,
    pKasumiAbility,
    pRenAbility
  )

  // kasumiとrenの能力で欲しいカード以外を取り除いた後のデッキサイズ
  const remainingDeckWithMulligan =
    adjustedDeckSize - kasumiRemovedCards - renRemovedCards

  // 追加ドローの確率を計算
  return calculateAdditionalDrawProbabilities(
    calculation,
    remainingDeckWithMulligan,
    initialProbability
  )
}

/**
 * 複数試行の平均確率を計算
 */
export function calculateAverageProbabilities(
  trialResults: number[][]
): number[] {
  const probabilities = Array(11).fill(0)
  for (let i = 0; i < 11; i++) {
    const sum = trialResults.reduce((acc, trial) => acc + trial[i], 0)
    probabilities[i] = Math.floor((sum / 100) * 10) / 10
  }
  return probabilities
}

/**
 * マリガンを考慮した最終的な成功確率を計算
 */
export function calculateMulliganProbability(
  calculation: MulliganCalculation
): number[] {
  const initialDraw = 6
  const adjustedDeckSize = calculation.deckSize - initialDraw // 初期6枚引いた後のデッキサイズ

  if (
    calculation.wantCardCount <= 0 ||
    calculation.wantCardCount > calculation.deckSize
  )
    return [0]
  if (calculation.mulliganCount < 0 || calculation.mulliganCount > initialDraw)
    return [0]

  // 100回の試行の結果を格納する配列
  const trialResults: number[][] = []

  for (let trial = 0; trial < 100; trial++) {
    const trialProbability = calculateTrialProbability(
      calculation,
      adjustedDeckSize,
      initialDraw
    )
    trialResults.push(trialProbability)
  }

  return calculateAverageProbabilities(trialResults)
}
