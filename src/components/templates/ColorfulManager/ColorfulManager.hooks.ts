import { useState, useCallback, useMemo } from 'react'
import {
  HeartIconProps,
  MemberHeartColor,
  memberHeartColors,
} from '@constants/hearts'

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

/**
 * Object.keys()のラッパー関数を定義し、ジェネリック型を利用して型注釈を付ける
 * @see: https://zenn.dev/ossamoon/articles/694a601ee62526
 */
const getObjectKeys = <T extends { [key: string]: unknown }>(
  obj: T
): (keyof T)[] => {
  return Object.keys(obj)
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

  const resetCount = useCallback(() => {
    setState((prevState) =>
      getObjectKeys(prevState).reduce((acc, key) => {
        acc[key] = {
          ...prevState[key],
          count: 0,
        }
        return acc
      }, {} as T)
    )
  }, [setState])

  const changeVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setState((prevState) => {
        const updatedState = { ...prevState }

        getObjectKeys(updatedState).forEach((key) => {
          updatedState[key].isVisible =
            key === 'gray' || visibleColors.includes(key as MemberHeartColor)
        })
        return updatedState
      })
    },
    [setState]
  )

  return { state, increment, decrement, resetCount, changeVisibility }
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
    Math.max(
      (!memberHearts[color].isVisible ? 0 : memberHearts[color].count) -
        (!requiredLiveHearts[color].isVisible
          ? 0
          : requiredLiveHearts[color].count),
      0
    )
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
    resetCount: resetRequiredLiveHeart,
    changeVisibility: handleChangeVisibilityRequiredLiveHeart,
  } = useHeartState<RequiredLiveHeartState>({
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
  })

  const {
    state: memberHearts,
    increment: incrementMemberHeart,
    decrement: decrementMemberHeart,
    resetCount: resetMemberHeart,
    changeVisibility: handleChangeVisibilityMemberHeart,
  } = useHeartState<MemberHeartState>({
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
  })

  const requiredLiveHeartColorList = useMemo(
    () =>
      getObjectKeys(requiredLiveHearts)
        .filter((key) => requiredLiveHearts[key].isVisible)
        .filter((key) => key !== 'gray'),
    [requiredLiveHearts]
  )

  const memberHeartColorList = useMemo(
    () =>
      getObjectKeys(memberHearts).filter((key) => memberHearts[key].isVisible),
    [memberHearts]
  )

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

  const handleResetCount = useCallback(() => {
    resetRequiredLiveHeart()
    resetMemberHeart()
  }, [resetRequiredLiveHeart, resetMemberHeart])

  return {
    requiredLiveHearts,
    memberHearts,
    requiredLiveHeartColorList,
    memberHeartColorList,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetCount,
    handleChangeVisibilityRequiredLiveHeart,
    handleChangeVisibilityMemberHeart,
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
    (acc, cur) => acc + (!cur.isVisible ? 0 : cur.count),
    0
  )
  const memberHeartCount = Object.values(memberHearts).reduce(
    (acc, cur) => acc + (!cur.isVisible ? 0 : cur.count),
    0
  )

  const requiredBladeHeart: RequiredLiveHeartState = getObjectKeys(
    requiredLiveHearts
  ).reduce((acc, color) => {
    acc[color] = {
      count: requiredLiveHearts[color].isVisible
        ? color === 'gray'
          ? calculateRequiredGreyBladeHeart({
              requiredLiveHearts,
              memberHearts,
            })
          : Math.max(
              (requiredLiveHearts[color].isVisible
                ? requiredLiveHearts[color].count
                : 0) -
                (memberHearts[color].isVisible ? memberHearts[color].count : 0),
              0
            )
        : 0,
      isVisible: requiredLiveHearts[color].isVisible,
    }
    return acc
  }, {} as RequiredLiveHeartState)

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
