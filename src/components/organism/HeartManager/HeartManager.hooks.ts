import { useState, useCallback } from 'react'
import { HeartIconProps } from '@atoms/HeartIcon'

type RequiredLiveHeartState = Record<HeartIconProps['color'], number>
type StageHeartState = Omit<RequiredLiveHeartState, 'gray'>

const useHeartState = <T extends Record<string, number>>(initialState: T) => {
  const [state, setState] = useState<T>(initialState)

  const increment = useCallback(
    (color: keyof T) => {
      setState((prev) => ({
        ...prev,
        [color]: (prev[color] || 0) + 1,
      }))
    },
    [setState]
  )

  const decrement = useCallback(
    (color: keyof T) => {
      setState((prev) => ({
        ...prev,
        [color]: Math.max((prev[color] || 0) - 1, 0),
      }))
    },
    [setState]
  )

  return { state, increment, decrement }
}

export const useHeartManager = () => {
  const {
    state: requiredLiveHearts,
    increment: handleIncrementRequiredLiveHeart,
    decrement: handleDecrementRequiredLiveHeart,
  } = useHeartState<RequiredLiveHeartState>({
    pink: 0,
    green: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    purple: 0,
    gray: 0,
  })

  const {
    state: liveHearts,
    increment: incrementStageHeart,
    decrement: decrementStageHeart,
  } = useHeartState<StageHeartState>({
    pink: 0,
    green: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    purple: 0,
  })

  const handleIncrementStageHeart = useCallback(
    (color: HeartIconProps['color']) => {
      if (color === 'gray') {
        throw new Error('ステージに灰色ハートはありません')
      }
      incrementStageHeart(color)
    },
    [incrementStageHeart]
  )

  const handleDecrementStageHeart = useCallback(
    (color: HeartIconProps['color']) => {
      if (color === 'gray') {
        throw new Error('ステージに灰色ハートはありません')
      }
      decrementStageHeart(color)
    },
    [decrementStageHeart]
  )

  return {
    requiredLiveHearts,
    liveHearts,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementStageHeart,
    handleDecrementStageHeart,
  }
}
