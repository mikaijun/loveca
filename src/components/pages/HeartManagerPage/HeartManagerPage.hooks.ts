import { useState, useCallback, useMemo } from 'react'
import { MemberHeartColor } from '@domain/valueObjects/heartColor'
import {
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetAllHeartCounts,
  withUpdatedVisibilities,
  calculateTotalRequiredBladeHearts,
  getTotalEffectiveCount,
} from '@domain/entities/heart/collection'
import { HeartIconProps } from '@constants/hearts'

const useColorfulHeartManager = () => {
  const [colorfulHeartState, setColorfulHeartState] = useState(() => ({
    requiredLiveHearts: createRequiredLiveHeartCollection(),
    memberHearts: createMemberHeartCollection(),
  }))

  const liveResultMessage = useMemo(() => {
    return calculateTotalRequiredBladeHearts(
      colorfulHeartState.requiredLiveHearts,
      colorfulHeartState.memberHearts
    ) === 0 && getTotalEffectiveCount(colorfulHeartState.requiredLiveHearts) > 0
      ? 'ライブ成功'
      : `必要ブレードハート数: ${calculateTotalRequiredBladeHearts(colorfulHeartState.requiredLiveHearts, colorfulHeartState.memberHearts)}`
  }, [colorfulHeartState.requiredLiveHearts, colorfulHeartState.memberHearts])

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
    liveResultMessage,
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
  const [monochromeHeartState, setMonochromeHeartState] = useState(() => ({
    memberHeartCount: 0,
    requiredLiveHeartCount: 0,
  }))

  const memberHeartCount = monochromeHeartState.memberHeartCount
  const requiredLiveHeartCount = monochromeHeartState.requiredLiveHeartCount

  const diffCount = requiredLiveHeartCount - memberHeartCount
  const isLiveSuccess = requiredLiveHeartCount > 0 && diffCount <= 0
  const requiredBladeHeartCount = isLiveSuccess
    ? ('ライブ成功' as const)
    : Math.max(diffCount, 0)
  const bladeHeartDisplayMessage =
    typeof requiredBladeHeartCount === 'string'
      ? requiredBladeHeartCount
      : `必要ブレードハート数: ${requiredBladeHeartCount}`

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
    setMonochromeHeartState({
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
    })
  }, [])

  return {
    memberHeartCount,
    requiredLiveHeartCount,
    requiredBladeHeartCount,
    bladeHeartDisplayMessage,
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
