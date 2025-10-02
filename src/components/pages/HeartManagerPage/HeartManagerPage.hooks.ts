import { useState, useCallback, useMemo } from 'react'
import { monochromeHeartService } from '@domain/services/monochromeHeartService'
import { MemberHeartColor } from '@domain/valueObjects/heartColor'
import {
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetAllHeartCounts,
  withUpdatedVisibilities,
} from '@domain/entities/heart/collection'
import { HeartIconProps } from '@constants/hearts'

const useColorfulHeartManager = () => {
  const [colorfulHeartState, setColorfulHeartState] = useState(() => ({
    requiredLiveHearts: createRequiredLiveHeartCollection(),
    memberHearts: createMemberHeartCollection(),
  }))

  const handleIncrementRequiredLiveHeart = useCallback(
    (color: HeartIconProps['color']) => {
      setColorfulHeartState((prev) => {
        const newRequiredLiveHearts = withIncrementedHeartCount(
          prev.requiredLiveHearts,
          color
        )
        return {
          ...prev,
          requiredLiveHearts: newRequiredLiveHearts,
        }
      })
    },
    []
  )

  const handleDecrementRequiredLiveHeart = useCallback(
    (color: HeartIconProps['color']) => {
      setColorfulHeartState((prev) => {
        const newRequiredLiveHearts = withDecrementedHeartCount(
          prev.requiredLiveHearts,
          color
        )
        return {
          ...prev,
          requiredLiveHearts: newRequiredLiveHearts,
        }
      })
    },
    []
  )

  const handleIncrementMemberHeart = useCallback(
    (color: HeartIconProps['color']) => {
      setColorfulHeartState((prev) => {
        const newMemberHearts = withIncrementedHeartCount(
          prev.memberHearts,
          color
        )
        return {
          ...prev,
          memberHearts: newMemberHearts,
        }
      })
    },
    []
  )

  const handleDecrementMemberHeart = useCallback(
    (color: HeartIconProps['color']) => {
      setColorfulHeartState((prev) => {
        const newMemberHearts = withDecrementedHeartCount(
          prev.memberHearts,
          color
        )
        return {
          ...prev,
          memberHearts: newMemberHearts,
        }
      })
    },
    []
  )

  const handleResetAllHeartCounts = useCallback(() => {
    setColorfulHeartState((prev) => {
      const newRequiredLiveHearts = withResetAllHeartCounts(
        prev.requiredLiveHearts
      )
      const newMemberHearts = withResetAllHeartCounts(prev.memberHearts)
      return {
        requiredLiveHearts: newRequiredLiveHearts,
        memberHearts: newMemberHearts,
      }
    })
  }, [])

  const handleChangeRequiredLiveHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) => {
        const newRequiredLiveHearts = withUpdatedVisibilities(
          prev.requiredLiveHearts,
          visibleColors,
          true // 灰色は強制的に表示
        )
        return {
          ...prev,
          requiredLiveHearts: newRequiredLiveHearts,
        }
      })
    },
    []
  )

  const handleChangeMemberHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) => {
        const newMemberHearts = withUpdatedVisibilities(
          prev.memberHearts,
          visibleColors,
          false // メンバーハートでは灰色は表示しない
        )
        return {
          ...prev,
          memberHearts: newMemberHearts,
        }
      })
    },
    []
  )

  return {
    colorfulHeartState,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetAllHeartCounts,
    handleChangeRequiredLiveHeartVisibility,
    handleChangeMemberHeartVisibility,
  }
}

const useMonochromeHeartManager = () => {
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

export const useHeartManager = () => {
  const colorfulHeartManager = useColorfulHeartManager()
  const monochromeHeartManager = useMonochromeHeartManager()

  return {
    colorful: colorfulHeartManager,
    monochrome: monochromeHeartManager,
  }
}
