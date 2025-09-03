import { useState, useCallback } from 'react'
import {
  HeartIconProps,
  MemberHeartColor,
  memberHeartColors,
} from '@constants/hearts'

export type HeartState = {
  count: number
  isVisible: boolean
}
export type RequiredLiveHeartState = Record<HeartIconProps['color'], HeartState>
export type MemberHeartState = Omit<RequiredLiveHeartState, 'gray'>
type CalculateHeartCount = {
  requiredLiveHearts: RequiredLiveHeartState
  memberHearts: MemberHeartState
}

/**
 * Object.keys()のラッパー関数を定義し、ジェネリック型を利用して型注釈を付ける
 * @see: https://zenn.dev/ossamoon/articles/694a601ee62526
 */
export const getObjectKeys = <T extends { [key: string]: unknown }>(
  obj: T
): (keyof T)[] => {
  return Object.keys(obj)
}

/**
 * ハートのカウントを1つ増やす純粋関数
 *
 * @param state - 現在のハート状態
 * @param color - 対象の色
 * @returns 更新されたハート状態
 */
export const incrementHeartCount = <T extends Record<string, HeartState>>(
  state: T,
  color: keyof T
): T => {
  return {
    ...state,
    [color]: {
      ...state[color],
      count: (state[color].count || 0) + 1,
    },
  }
}

/**
 * ハートのカウントを1つ減らす純粋関数
 *
 * @param state - 現在のハート状態
 * @param color - 対象の色
 * @returns 更新されたハート状態
 */
export const decrementHeartCount = <T extends Record<string, HeartState>>(
  state: T,
  color: keyof T
): T => {
  return {
    ...state,
    [color]: {
      ...state[color],
      count: Math.max((state[color].count || 0) - 1, 0),
    },
  }
}

/**
 * 全てのハートのカウントを0にリセットする純粋関数
 *
 * @param state - 現在のハート状態
 * @returns カウントがリセットされたハート状態
 */
export const resetHeartCounts = <T extends Record<string, HeartState>>(
  state: T
): T => {
  return getObjectKeys(state).reduce((acc, key) => {
    acc[key] = {
      ...state[key],
      count: 0,
    }
    return acc
  }, {} as T)
}

/**
 * 表示するハート色を更新する
 *
 * @param state - 現在のハート状態
 * @param visibleColors - 表示する色の配列
 * @param forceGrayVisible - grayを強制的に表示するかどうか（デフォルト: false）
 * @returns 可視性が更新されたハート状態
 */
export const updateHeartVisibility = <T extends Record<string, HeartState>>(
  state: T,
  visibleColors: MemberHeartColor[],
  forceGrayVisible: boolean = false
): T => {
  const updatedState = { ...state }

  getObjectKeys(updatedState).forEach((key) => {
    if (forceGrayVisible && key === 'gray') {
      updatedState[key] = {
        ...updatedState[key],
        isVisible: true,
      }
    } else {
      updatedState[key] = {
        ...updatedState[key],
        isVisible: visibleColors.includes(key as MemberHeartColor),
      }
    }
  })

  return updatedState
}

/**
 * ライブに必要なハートの状態を管理するカスタムフック
 *
 * @returns ライブハート状態の操作関数とstate
 */
export const useRequiredLiveHeartState = () => {
  const [state, setState] = useState<RequiredLiveHeartState>({
    pink: { count: 0, isVisible: true },
    green: { count: 0, isVisible: true },
    blue: { count: 0, isVisible: true },
    red: { count: 0, isVisible: true },
    yellow: { count: 0, isVisible: true },
    purple: { count: 0, isVisible: true },
    gray: { count: 0, isVisible: true },
  })

  const increment = useCallback(
    (color: HeartIconProps['color']) => {
      setState((prev) => incrementHeartCount(prev, color))
    },
    [setState]
  )

  const decrement = useCallback(
    (color: HeartIconProps['color']) => {
      setState((prev) => decrementHeartCount(prev, color))
    },
    [setState]
  )

  const resetCount = useCallback(() => {
    setState((prevState) => resetHeartCounts(prevState))
  }, [setState])

  const changeVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setState((prevState) =>
        updateHeartVisibility(prevState, visibleColors, true)
      )
    },
    [setState]
  )

  return {
    requiredLiveHearts: state,
    handleIncrementRequiredLiveHeart: increment,
    handleDecrementRequiredLiveHeart: decrement,
    resetRequiredLiveHeart: resetCount,
    handleChangeVisibilityRequiredLiveHeart: changeVisibility,
  }
}

/**
 * メンバーハートの状態を管理するカスタムフック
 *
 * @returns メンバーハート状態の操作関数とstate
 */
export const useMemberHeartState = () => {
  const [state, setState] = useState<MemberHeartState>({
    pink: { count: 0, isVisible: true },
    green: { count: 0, isVisible: true },
    blue: { count: 0, isVisible: true },
    red: { count: 0, isVisible: true },
    yellow: { count: 0, isVisible: true },
    purple: { count: 0, isVisible: true },
  })

  const increment = useCallback(
    (color: HeartIconProps['color']) => {
      if (color === 'gray') {
        throw new Error('メンバーに灰色ハートはありません')
      }
      setState((prev) => incrementHeartCount(prev, color))
    },
    [setState]
  )

  const decrement = useCallback(
    (color: HeartIconProps['color']) => {
      if (color === 'gray') {
        throw new Error('メンバーに灰色ハートはありません')
      }
      setState((prev) => decrementHeartCount(prev, color))
    },
    [setState]
  )

  const resetCount = useCallback(() => {
    setState((prevState) => resetHeartCounts(prevState))
  }, [setState])

  const changeVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setState((prevState) =>
        updateHeartVisibility(prevState, visibleColors, false)
      )
    },
    [setState]
  )

  return {
    memberHearts: state,
    handleIncrementMemberHeart: increment,
    handleDecrementMemberHeart: decrement,
    resetMemberHeart: resetCount,
    handleChangeVisibilityMemberHeart: changeVisibility,
  }
}

/**
 * メンバーハートの各色における余剰数を計算する
 *
 * 各色について「メンバーハート数 - ライブに必要なハート数」を計算し、
 * 結果がマイナスの場合は0とする。
 *
 * @param memberHearts - メンバーが持つハートの状態
 * @param requiredLiveHearts - ライブに必要なハートの状態
 * @returns 各色の余剰ハート数の配列（memberHeartColors順）
 */
export const calculateMemberOverHeartCounts = ({
  memberHearts,
  requiredLiveHearts,
}: CalculateHeartCount): number[] => {
  return memberHeartColors.map((color) =>
    Math.max(
      (!memberHearts[color].isVisible ? 0 : memberHearts[color].count) -
        (!requiredLiveHearts[color].isVisible
          ? 0
          : requiredLiveHearts[color].count),
      0
    )
  )
}

/**
 * 表示中のライブ必要ハート色リストを取得する（gray除く）
 *
 * @param requiredLiveHearts - ライブに必要なハートの状態
 * @returns 表示中のハート色の配列（grayを除く）
 */
export const getRequiredLiveHeartColorList = (
  requiredLiveHearts: RequiredLiveHeartState
) => {
  return getObjectKeys(requiredLiveHearts)
    .filter((key) => requiredLiveHearts[key].isVisible)
    .filter((key) => key !== 'gray')
}

/**
 * 表示中のメンバーハート色リストを取得する
 *
 * @param memberHearts - メンバーハートの状態
 * @returns 表示中のハート色の配列
 */
export const getMemberHeartColorList = (memberHearts: MemberHeartState) => {
  return getObjectKeys(memberHearts).filter(
    (key) => memberHearts[key].isVisible
  )
}

/**
 * ライブに必要な灰色ブレードハートの数を計算する
 *
 * 必要な灰色ブレードハートの数 = max(A - B, 0)
 * A: 必要な灰色ライブハートの数
 * B: メンバーの各色ハートの合計数 - ライブに必要な各色ハートの数の合計
 *
 * @param params - 計算に必要なパラメータ
 * @param params.requiredLiveHearts - ライブに必要なハートの状態
 * @param params.memberHearts - メンバーハートの状態
 * @returns 必要な灰色ブレードハートの数（0以上）
 */
export const calculateRequiredGreyBladeHeart = ({
  requiredLiveHearts,
  memberHearts,
}: CalculateHeartCount): number => {
  const memberOverHeartCounts = calculateMemberOverHeartCounts({
    memberHearts,
    requiredLiveHearts,
  })

  const totalMemberOverHeartCount = memberOverHeartCounts.reduce(
    (acc, cur) => acc + cur,
    0
  )

  return Math.max(requiredLiveHearts.gray.count - totalMemberOverHeartCount, 0)
}

/**
 * 表示中のライブに必要なハートの合計数を計算する
 *
 * @param requiredLiveHearts - ライブに必要なハートの状態
 * @returns 表示中のハートの合計数
 */
export const calculateRequiredLiveHeartCount = (
  requiredLiveHearts: RequiredLiveHeartState
): number => {
  return Object.values(requiredLiveHearts).reduce(
    (acc, cur) => acc + (!cur.isVisible ? 0 : cur.count),
    0
  )
}

/**
 * 表示中のメンバーハートの合計数を計算する
 *
 * @param memberHearts - メンバーハートの状態
 * @returns 表示中のハートの合計数
 */
export const calculateMemberHeartCount = (
  memberHearts: MemberHeartState
): number => {
  return Object.values(memberHearts).reduce(
    (acc, cur) => acc + (!cur.isVisible ? 0 : cur.count),
    0
  )
}

/**
 * 指定した色の必要なブレードハート数を計算する（gray以外）
 *
 * @param params - 計算に必要なパラメータ
 * @param params.color - 対象の色
 * @param params.requiredLiveHearts - ライブに必要なハートの状態
 * @param params.memberHearts - メンバーハートの状態
 * @returns 必要なブレードハート数（0以上）
 */
export const calculateRequiredBladeHeartForColor = ({
  color,
  requiredLiveHearts,
  memberHearts,
}: {
  color: Exclude<HeartIconProps['color'], 'gray'>
  requiredLiveHearts: RequiredLiveHeartState
  memberHearts: MemberHeartState
}): number => {
  const requiredCount = requiredLiveHearts[color].isVisible
    ? requiredLiveHearts[color].count
    : 0
  const memberCount = memberHearts[color].isVisible
    ? memberHearts[color].count
    : 0

  return Math.max(requiredCount - memberCount, 0)
}

/**
 * 必要なブレードハートの状態を計算する
 *
 * @param requiredLiveHearts - ライブに必要なハートの状態
 * @param memberHearts - メンバーハートの状態
 * @returns 各色の必要なブレードハート状態
 */
export const calculateRequiredBladeHeart = ({
  requiredLiveHearts,
  memberHearts,
}: CalculateHeartCount): RequiredLiveHeartState => {
  return getObjectKeys(requiredLiveHearts).reduce((acc, color) => {
    acc[color] = {
      count: requiredLiveHearts[color].isVisible
        ? color === 'gray'
          ? calculateRequiredGreyBladeHeart({
              requiredLiveHearts,
              memberHearts,
            })
          : calculateRequiredBladeHeartForColor({
              color,
              requiredLiveHearts,
              memberHearts,
            })
        : 0,
      isVisible: requiredLiveHearts[color].isVisible,
    }
    return acc
  }, {} as RequiredLiveHeartState)
}
