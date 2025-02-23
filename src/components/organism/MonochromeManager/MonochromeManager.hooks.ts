import { useCallback, useMemo, useState } from 'react'

const binomialCoefficient = (n: number, k: number): number => {
  if (k > n) return 0
  if (k === 0 || k === n) return 1
  let coefficient = 1
  for (let i = 1; i <= k; i++) {
    coefficient *= (n - i + 1) / i
  }
  return coefficient
}

const binomialProbability = (n: number, k: number, p: number): number => {
  return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

const calculateProbability = (p: number, n: number, z: number): number => {
  if (z > n) return 0

  let probability = 0
  for (let k = 0; k < z; k++) {
    probability += binomialProbability(n, k, p)
  }
  return 1 - probability
}

export const useMonochromeManager = () => {
  const [memberHeartCount, setMemberHeartCount] = useState<number>(0)
  const [requiredLiveHeartCount, setRequiredLiveHeart] = useState<number>(0)
  const [yellCount, setYellHeartCount] = useState<number>(0)
  const [deckBladeHeartCount, setDeckBladeHeartCount] = useState<number>(60)

  const requiredBladeHeartCount = useMemo((): number | 'ライブ成功' => {
    const diffCount = requiredLiveHeartCount - memberHeartCount
    if (requiredLiveHeartCount > 0 && diffCount <= 0) return 'ライブ成功'
    return Math.max(requiredLiveHeartCount - memberHeartCount, 0)
  }, [requiredLiveHeartCount, memberHeartCount])

  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setMemberHeartCount(count)
  }, [])

  const handleRequiredLiveHeartCount = useCallback((count: number) => {
    setRequiredLiveHeart(count)
  }, [])

  const handleChangeYellCount = useCallback((count: number) => {
    setYellHeartCount(count)
  }, [])

  const handleChangeDeckBladeHeartCount = useCallback((count: number) => {
    setDeckBladeHeartCount(count)
  }, [])

  const handleResetHeart = useCallback(() => {
    setMemberHeartCount(0)
    setRequiredLiveHeart(0)
    setYellHeartCount(0)
    setDeckBladeHeartCount(60)
  }, [])

  const liveSuccessProbability = useMemo(() => {
    if (
      yellCount === 0 ||
      requiredLiveHeartCount === 0 ||
      memberHeartCount === 0
    )
      return '-'

    if (memberHeartCount >= requiredLiveHeartCount) return 100
    const p = deckBladeHeartCount / 60
    const n = yellCount
    const z = requiredLiveHeartCount - memberHeartCount
    const probability = calculateProbability(p, n, z)
    return Math.round(probability * 1000) / 10
  }, [deckBladeHeartCount, yellCount, requiredLiveHeartCount, memberHeartCount])

  return {
    memberHeartCount,
    requiredLiveHeartCount,
    requiredBladeHeartCount,
    yellCount,
    deckBladeHeartCount,
    liveSuccessProbability,
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleChangeYellCount,
    handleChangeDeckBladeHeartCount,
    handleResetHeart,
  }
}
