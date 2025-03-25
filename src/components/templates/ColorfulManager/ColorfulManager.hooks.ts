import { useState, useCallback } from 'react'
import { HeartIconProps, memberHeartColors } from '@constants/hearts'

type RequiredLiveHeartState = Record<HeartIconProps['color'], number>
type MemberHeartState = Omit<RequiredLiveHeartState, 'gray'>
type CalculateHeartCount = {
  requiredLiveHearts: RequiredLiveHeartState
  memberHearts: MemberHeartState
}

/**
 * ハートの状態を管理するカスタムフックを返す
 */
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

  const reset = useCallback(() => {
    setState(initialState)
  }, [initialState])

  return { state, increment, decrement, reset }
}

/**
 * ライブに必要なハート&メンバーのハートから必要な灰色ブレードハートの数を計算する。
 * 必要な灰色ブレードハートの数 = max(A - B, 0)
 *
 * A: 必要な灰色ライブハートの数
 * B: メンバーの各色ハートの合計数 - ライブに必要な各色ハートの数の合計
 */
export const calculateRequiredGreyBladeHeart = ({
  requiredLiveHearts,
  memberHearts,
}: CalculateHeartCount): number => {
  const memberOverHeartCounts = memberHeartColors.map((color) =>
    Math.max(memberHearts[color] - requiredLiveHearts[color], 0)
  )

  const totalMemberOverHeartCount = memberOverHeartCounts.reduce(
    (acc, cur) => acc + cur,
    0
  )

  return Math.max(requiredLiveHearts.gray - totalMemberOverHeartCount, 0)
}

/**
/**
 * ハートの状態を管理するカスタムフックを返す
 */
export const useColorfulManager = () => {
  const {
    state: requiredLiveHearts,
    increment: handleIncrementRequiredLiveHeart,
    decrement: handleDecrementRequiredLiveHeart,
    reset: resetRequiredLiveHeart,
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
    state: memberHearts,
    increment: incrementMemberHeart,
    decrement: decrementMemberHeart,
    reset: resetMemberHeart,
  } = useHeartState<MemberHeartState>({
    pink: 0,
    green: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    purple: 0,
  })

  const handleIncrementMemberHeart = useCallback(
    (color: HeartIconProps['color']) => {
      if (color === 'gray') {
        throw new Error('メンバーに灰色ハートはありません')
      }
      incrementMemberHeart(color)
    },
    [incrementMemberHeart]
  )

  const handleDecrementMemberHeart = useCallback(
    (color: HeartIconProps['color']) => {
      if (color === 'gray') {
        throw new Error('メンバーに灰色ハートはありません')
      }
      decrementMemberHeart(color)
    },
    [decrementMemberHeart]
  )

  const handleResetHeart = useCallback(() => {
    resetRequiredLiveHeart()
    resetMemberHeart()
  }, [resetRequiredLiveHeart, resetMemberHeart])

  return {
    requiredLiveHearts,
    memberHearts,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetHeart,
  }
}

/**
 * ライブに必要なハート&メンバーのハートから必要なハートの数を計算する
 */
export const calculateHeartCount = ({
  requiredLiveHearts,
  memberHearts,
}: CalculateHeartCount) => {
  const requiredLiveHeartCount = Object.values(requiredLiveHearts).reduce(
    (acc, cur) => acc + cur,
    0
  )
  const memberHeartCount = Object.values(memberHearts).reduce(
    (acc, cur) => acc + cur,
    0
  )

  const requiredBladeHeart: RequiredLiveHeartState = {
    pink: Math.max(requiredLiveHearts.pink - memberHearts.pink, 0),
    green: Math.max(requiredLiveHearts.green - memberHearts.green, 0),
    blue: Math.max(requiredLiveHearts.blue - memberHearts.blue, 0),
    red: Math.max(requiredLiveHearts.red - memberHearts.red, 0),
    yellow: Math.max(requiredLiveHearts.yellow - memberHearts.yellow, 0),
    purple: Math.max(requiredLiveHearts.purple - memberHearts.purple, 0),
    gray: calculateRequiredGreyBladeHeart({ requiredLiveHearts, memberHearts }),
  }

  const requiredBladeHeartCount = Object.values(requiredBladeHeart).reduce(
    (acc, cur) => acc + cur,
    0
  )
  return {
    requiredLiveHeartCount,
    memberHeartCount,
    requiredBladeHeart,
    requiredBladeHeartCount,
  }
}
