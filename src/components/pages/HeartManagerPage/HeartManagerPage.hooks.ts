import { useState, useCallback, useMemo } from 'react'
import { ColorfulHeartService } from '@domain/services/ColorfulHeartService'
import { MonochromeHeartService } from '@domain/services/MonochromeHeartService'
import { MemberHeartColor } from '@domain/valueObjects/HeartColor'

function useColorfulHeartManager() {
  const [colorfulHeartState, setColorfulHeartState] = useState(() =>
    ColorfulHeartService.createInitialState()
  )

  const colorfulHeartSummary = useMemo(
    () => ColorfulHeartService.calculateSummary(colorfulHeartState),
    [colorfulHeartState]
  )

  const handleIncrementRequiredLiveHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.incrementRequiredLiveHeart(prev, colorValue)
    )
  }, [])

  const handleDecrementRequiredLiveHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.decrementRequiredLiveHeart(prev, colorValue)
    )
  }, [])

  const handleIncrementMemberHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.incrementMemberHeart(prev, colorValue)
    )
  }, [])

  const handleDecrementMemberHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.decrementMemberHeart(prev, colorValue)
    )
  }, [])

  const handleResetAllHeartCounts = useCallback(() => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.resetAllHeartCounts(prev)
    )
  }, [])

  const handleChangeRequiredLiveHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) =>
        ColorfulHeartService.updateRequiredLiveHeartVisibility(
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
        ColorfulHeartService.updateMemberHeartVisibility(prev, visibleColors)
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
    MonochromeHeartService.createInitialState()
  )

  const monochromeHeartSummary = useMemo(
    () => MonochromeHeartService.calculateSummary(monochromeHeartState),
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
    setMonochromeHeartState(MonochromeHeartService.createInitialState())
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
