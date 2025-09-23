import { useState, useCallback, useMemo } from 'react'
import { colorfulHeartService } from '@domain/services/colorfulHeartService'
import { monochromeHeartService } from '@domain/services/monochromeHeartService'
import { MemberHeartColor } from '@domain/valueObjects/HeartColor'

function useColorfulHeartManager() {
  const [colorfulHeartState, setColorfulHeartState] = useState(() =>
    colorfulHeartService.createInitialState()
  )

  const colorfulHeartSummary = useMemo(
    () => colorfulHeartService.calculateSummary(colorfulHeartState),
    [colorfulHeartState]
  )

  const handleIncrementRequiredLiveHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      colorfulHeartService.incrementRequiredLiveHeart(prev, colorValue)
    )
  }, [])

  const handleDecrementRequiredLiveHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      colorfulHeartService.decrementRequiredLiveHeart(prev, colorValue)
    )
  }, [])

  const handleIncrementMemberHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      colorfulHeartService.incrementMemberHeart(prev, colorValue)
    )
  }, [])

  const handleDecrementMemberHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      colorfulHeartService.decrementMemberHeart(prev, colorValue)
    )
  }, [])

  const handleResetAllHeartCounts = useCallback(() => {
    setColorfulHeartState((prev) =>
      colorfulHeartService.resetAllHeartCounts(prev)
    )
  }, [])

  const handleChangeRequiredLiveHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) =>
        colorfulHeartService.updateRequiredLiveHeartVisibility(
          prev,
          visibleColors
        )
      )
    },
    []
  )

  const handleChangeMemberHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) =>
        colorfulHeartService.updateMemberHeartVisibility(prev, visibleColors)
      )
    },
    []
  )

  return {
    // 状態
    colorfulHeartState,
    colorfulHeartSummary,

    // ハンドラー
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetAllHeartCounts,
    handleChangeRequiredLiveHeartVisibility,
    handleChangeMemberHeartVisibility,
  }
}

function useMonochromeHeartManager() {
  const [monochromeHeartState, setMonochromeHeartState] = useState(() =>
    monochromeHeartService.createInitialState()
  )

  const monochromeHeartSummary = useMemo(
    () => monochromeHeartService.calculateSummary(monochromeHeartState),
    [monochromeHeartState]
  )

  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setMonochromeHeartState((prev) => ({ ...prev, memberHeartCount: count }))
  }, [])

  const handleRequiredLiveHeartCount = useCallback((count: number) => {
    setMonochromeHeartState((prev) => ({
      ...prev,
      requiredLiveHeartCount: count,
    }))
  }, [])

  const handleResetHeart = useCallback(() => {
    setMonochromeHeartState(monochromeHeartService.createInitialState())
  }, [])

  return {
    monochromeHeartState,
    monochromeHeartSummary,
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,
  }
}

export function useHeartManager() {
  const colorfulHeartManager = useColorfulHeartManager()
  const monochromeHeartManager = useMonochromeHeartManager()

  return {
    colorful: colorfulHeartManager,
    monochrome: monochromeHeartManager,
  }
}
