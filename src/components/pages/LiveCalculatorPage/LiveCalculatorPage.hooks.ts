import { useMemo, useState, useCallback } from 'react'
import {
  LiveCalculation,
  calculateLiveSuccessProbability,
} from '@domain/entities/liveCalculation'

export const useLiveCalculator = () => {
  const [liveCalculation, setLiveCalculation] = useState<LiveCalculation>({
    memberHeartCount: 0,
    requiredLiveHeartCount: 0,
    yellCount: 0,
    deckBladeHeartCount: 60,
    deckCount: 60,
  })

  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setLiveCalculation((prev) => ({ ...prev, memberHeartCount: count }))
  }, [])

  const handleChangeRequiredLiveHeartCount = useCallback((count: number) => {
    setLiveCalculation((prev) => ({ ...prev, requiredLiveHeartCount: count }))
  }, [])

  const handleChangeYellCount = useCallback((count: number) => {
    setLiveCalculation((prev) => ({ ...prev, yellCount: count }))
  }, [])

  const handleChangeDeckBladeHeartCount = useCallback((count: number) => {
    setLiveCalculation((prev) => ({ ...prev, deckBladeHeartCount: count }))
  }, [])

  const handleChangeDeckCount = useCallback((count: number) => {
    setLiveCalculation((prev) => ({ ...prev, deckCount: count }))
  }, [])

  const handleResetHeart = useCallback(() => {
    setLiveCalculation({
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
      yellCount: 0,
      deckBladeHeartCount: 60,
      deckCount: 60,
    })
  }, [])

  // 確率計算結果
  const liveSuccessProbabilityResult = useMemo(() => {
    return calculateLiveSuccessProbability(liveCalculation)
  }, [liveCalculation])

  return {
    memberHeartCount: liveCalculation.memberHeartCount,
    requiredLiveHeartCount: liveCalculation.requiredLiveHeartCount,
    yellCount: liveCalculation.yellCount,
    deckBladeHeartCount: liveCalculation.deckBladeHeartCount,
    deckCount: liveCalculation.deckCount,
    liveSuccessProbability: liveSuccessProbabilityResult.probability,
    handleChangeMemberHeartCount,
    handleChangeRequiredLiveHeartCount,
    handleChangeYellCount,
    handleChangeDeckBladeHeartCount,
    handleChangeDeckCount,
    handleResetHeart,
  }
}
