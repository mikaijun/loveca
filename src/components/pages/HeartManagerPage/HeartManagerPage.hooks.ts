import { useState, useCallback, useMemo } from 'react'

import {
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetHeartCounts,
  withUpdatedVisibilities,
  calculateTotalRequiredBladeHearts,
  getTotalEffectiveCount,
  filterRequiredLiveHeartCollection,
  filterMemberHeartCollection,
} from '@domain/entities/heart/collection'
import { HeartColor } from '@domain/valueObjects/heartColor/heartColor'

export const useColorfulHeartManager = () => {
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

  const handleIncrementRequiredLiveHeart = useCallback((color: HeartColor) => {
    setColorfulHeartState((prev) => {
      const newRequiredLiveHearts = withIncrementedHeartCount(
        prev.requiredLiveHearts,
        color
      )
      return {
        ...prev,
        requiredLiveHearts: filterRequiredLiveHeartCollection(
          newRequiredLiveHearts
        ),
      }
    })
  }, [])

  const handleDecrementRequiredLiveHeart = useCallback((color: HeartColor) => {
    setColorfulHeartState((prev) => {
      const newRequiredLiveHearts = withDecrementedHeartCount(
        prev.requiredLiveHearts,
        color
      )
      return {
        ...prev,
        requiredLiveHearts: filterRequiredLiveHeartCollection(
          newRequiredLiveHearts
        ),
      }
    })
  }, [])

  const handleIncrementMemberHeart = useCallback((color: HeartColor) => {
    setColorfulHeartState((prev) => {
      const newMemberHearts = withIncrementedHeartCount(
        prev.memberHearts,
        color
      )
      return {
        ...prev,
        memberHearts: filterMemberHeartCollection(newMemberHearts),
      }
    })
  }, [])

  const handleDecrementMemberHeart = useCallback((color: HeartColor) => {
    setColorfulHeartState((prev) => {
      const newMemberHearts = withDecrementedHeartCount(
        prev.memberHearts,
        color
      )
      return {
        ...prev,
        memberHearts: filterMemberHeartCollection(newMemberHearts),
      }
    })
  }, [])

  const handleResetHeartCounts = useCallback(() => {
    setColorfulHeartState((prev) => {
      const newRequiredLiveHearts = withResetHeartCounts(
        prev.requiredLiveHearts
      )
      const newMemberHearts = withResetHeartCounts(prev.memberHearts)
      return {
        requiredLiveHearts: filterRequiredLiveHeartCollection(
          newRequiredLiveHearts
        ),
        memberHearts: filterMemberHeartCollection(newMemberHearts),
      }
    })
  }, [])

  const handleChangeRequiredLiveHeartVisibility = useCallback(
    (visibleColors: HeartColor[]) => {
      setColorfulHeartState((prev) => {
        const newRequiredLiveHearts = withUpdatedVisibilities(
          prev.requiredLiveHearts,
          visibleColors,
          true // 灰色は強制的に表示
        )
        return {
          ...prev,
          requiredLiveHearts: filterRequiredLiveHeartCollection(
            newRequiredLiveHearts
          ),
        }
      })
    },
    []
  )

  const handleChangeMemberHeartVisibility = useCallback(
    (visibleColors: HeartColor[]) => {
      setColorfulHeartState((prev) => {
        const newMemberHearts = withUpdatedVisibilities(
          prev.memberHearts,
          visibleColors,
          false // メンバーハートでは灰色は表示しない
        )
        return {
          ...prev,
          memberHearts: filterMemberHeartCollection(newMemberHearts),
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
    handleResetHeartCounts,
    handleChangeRequiredLiveHeartVisibility,
    handleChangeMemberHeartVisibility,
  }
}

export const useMonochromeHeartManager = () => {
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
    bladeHeartDisplayMessage,
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,
  }
}
