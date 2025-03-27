import { useState, useCallback } from 'react'
import { HeartIconProps, memberHeartColors } from '@constants/hearts'

type HeartState = {
  count: number
  isVisible: boolean
}
type RequiredLiveHeartState = Record<HeartIconProps['color'], HeartState>
type MemberHeartState = Omit<RequiredLiveHeartState, 'gray'>
type CalculateHeartCount = {
  requiredLiveHearts: RequiredLiveHeartState
  memberHearts: MemberHeartState
}

export const INITIAL_VALUE = {
  pink: {
    count: 0,
    isVisible: true,
  },
  green: {
    count: 0,
    isVisible: true,
  },
  blue: {
    count: 0,
    isVisible: true,
  },
  red: {
    count: 0,
    isVisible: true,
  },
  yellow: {
    count: 0,
    isVisible: true,
  },
  purple: {
    count: 0,
    isVisible: true,
  },
  gray: {
    count: 0,
    isVisible: true,
  },
}

/**
 * ハートの状態を管理するカスタムフックを返す
 */
const useHeartState = <T extends Record<string, HeartState>>(
  initialState: T
) => {
  const [state, setState] = useState<T>(initialState)

  const increment = useCallback(
    (color: keyof T) => {
      setState((prev) => ({
        ...prev,
        [color]: {
          ...prev[color],
          count: (prev[color].count || 0) + 1,
        },
      }))
    },
    [setState]
  )

  const decrement = useCallback(
    (color: keyof T) => {
      setState((prev) => ({
        ...prev,
        [color]: {
          ...prev[color],
          count: (prev[color].count || 0) - 1,
        },
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
    Math.max(memberHearts[color].count - requiredLiveHearts[color].count, 0)
  )

  const totalMemberOverHeartCount = memberOverHeartCounts.reduce(
    (acc, cur) => acc + cur,
    0
  )

  return Math.max(requiredLiveHearts.gray.count - totalMemberOverHeartCount, 0)
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
  } = useHeartState<RequiredLiveHeartState>(INITIAL_VALUE)

  const {
    state: memberHearts,
    increment: incrementMemberHeart,
    decrement: decrementMemberHeart,
    reset: resetMemberHeart,
  } = useHeartState<MemberHeartState>(INITIAL_VALUE)

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
    (acc, cur) => acc + cur.count,
    0
  )
  const memberHeartCount = Object.values(memberHearts).reduce(
    (acc, cur) => acc + cur.count,
    0
  )

  const requiredBladeHeart: RequiredLiveHeartState = {
    pink: {
      count: Math.max(
        requiredLiveHearts.pink.count - memberHearts.pink.count,
        0
      ),
      isVisible: true,
    },

    green: {
      count: Math.max(
        requiredLiveHearts.green.count - memberHearts.green.count,
        0
      ),
      isVisible: true,
    },
    blue: {
      count: Math.max(
        requiredLiveHearts.blue.count - memberHearts.blue.count,
        0
      ),
      isVisible: true,
    },
    red: {
      count: Math.max(requiredLiveHearts.red.count - memberHearts.red.count, 0),
      isVisible: true,
    },
    yellow: {
      count: Math.max(
        requiredLiveHearts.yellow.count - memberHearts.yellow.count,
        0
      ),
      isVisible: true,
    },

    purple: {
      count: Math.max(
        requiredLiveHearts.purple.count - memberHearts.purple.count,
        0
      ),
      isVisible: true,
    },

    gray: {
      count: calculateRequiredGreyBladeHeart({
        requiredLiveHearts,
        memberHearts,
      }),
      isVisible: true,
    },
  }

  const requiredBladeHeartCount = Object.values(requiredBladeHeart).reduce(
    (acc, cur) => acc + cur.count,
    0
  )
  return {
    requiredLiveHeartCount,
    memberHeartCount,
    requiredBladeHeart,
    requiredBladeHeartCount,
  }
}
