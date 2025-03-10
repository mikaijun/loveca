import { useMemo, useState, useCallback } from 'react'
import { chanceOfPicking } from '@utils'

/**
 * 非復元抽出で成功回数が z 回以上となる確率を計算
 */
const calculateProbability = (
  N: number,
  K: number,
  n: number,
  z: number
): number => {
  let probability = 0
  for (let k = 0; k < z; k++) {
    probability += chanceOfPicking(N, K, n, k)
  }
  return 1 - probability
}

/**
 * LiveSuccessCalculator のロジック
 */
export const useLiveSuccessCalculator = () => {
  const [memberHeartCount, setMemberHeartCount] = useState<number>(0)
  const [requiredLiveHeartCount, setRequiredLiveHeart] = useState<number>(0)
  const [yellCount, setYellCount] = useState<number>(0)
  const [deckBladeHeartCount, setDeckBladeHeartCount] = useState<number>(60)
  const [deckCount, setDeckCount] = useState<number>(60)

  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setMemberHeartCount(count)
  }, [])

  const handleChangeRequiredLiveHeartCount = useCallback((count: number) => {
    setRequiredLiveHeart(count)
  }, [])

  const handleChangeYellCount = useCallback((count: number) => {
    setYellCount(count)
  }, [])

  const handleChangeDeckBladeHeartCount = useCallback((count: number) => {
    setDeckBladeHeartCount(count)
  }, [])

  const handleChangeDeckCount = useCallback((count: number) => {
    setDeckCount(count)
  }, [])

  const handleResetHeart = useCallback(() => {
    setMemberHeartCount(0)
    setRequiredLiveHeart(0)
    setYellCount(0)
    setDeckBladeHeartCount(60)
    setDeckCount(60)
  }, [])

  const liveSuccessProbability = useMemo(() => {
    if (yellCount === 0 || requiredLiveHeartCount === 0 || deckCount === 0)
      return '-'

    if (deckCount < deckBladeHeartCount) return 'ブレードハート枚数が不正です'

    const N = deckCount
    const K = deckBladeHeartCount
    const n = yellCount
    const z = requiredLiveHeartCount - memberHeartCount
    const probability = calculateProbability(N, K, n, z)
    if (probability <= 0) return '0'
    if (probability === 1) return '100'
    return (Math.floor(probability * 1000) / 10).toFixed(1)
  }, [
    deckBladeHeartCount,
    yellCount,
    requiredLiveHeartCount,
    memberHeartCount,
    deckCount,
  ])

  return {
    memberHeartCount,
    requiredLiveHeartCount,
    yellCount,
    deckBladeHeartCount,
    deckCount,
    liveSuccessProbability,
    handleChangeMemberHeartCount,
    handleChangeRequiredLiveHeartCount,
    handleChangeYellCount,
    handleChangeDeckBladeHeartCount,
    handleChangeDeckCount,
    handleResetHeart,
  }
}
