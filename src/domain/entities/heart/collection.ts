import {
  Heart,
  createHeart,
  withIncrementedCount,
  withDecrementedCount,
  withResetCount,
  getEffectiveCount,
  withUpdatedVisibility,
} from '@domain/entities/heart'
import {
  HeartColor,
  liveHeartColors,
  memberHeartColors,
  MemberHeartColor,
} from '@domain/valueObjects/heartColor/heartColor'

export type HeartCollection = readonly Heart[]

/**
 * 全ての必要ブレードハートの状態を計算する
 */
export const calculateAllRequiredBladeHearts = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection
): HeartCollection => {
  return requiredLiveHearts.map((state) => {
    const requiredBladeCount = calculateRequiredBladeHeartByColor(
      requiredLiveHearts,
      memberHearts,
      state.color
    )

    return { ...state, count: requiredBladeCount }
  })
}

/**
 * 指定した色の必要ブレードハート数を計算する
 */
export const calculateRequiredBladeHeartByColor = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection,
  color: HeartColor
): number => {
  // 灰色の場合は特別な計算
  if (color === 'gray') {
    return calculateRequiredGrayBladeHeart(requiredLiveHearts, memberHearts)
  }

  // 通常の色の計算
  const requiredState = getHeartStateByColor(requiredLiveHearts, color)
  const memberState = getHeartStateByColor(memberHearts, color)

  const requiredCount = requiredState ? getEffectiveCount(requiredState) : 0
  const memberCount = memberState ? getEffectiveCount(memberState) : 0

  return Math.max(requiredCount - memberCount, 0)
}

/**
 * 必要な灰色ブレードハート数を計算する
 */
export const calculateRequiredGrayBladeHeart = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection
): number => {
  // 灰色ハートの必要数を取得
  const grayRequiredState = getHeartStateByColor(requiredLiveHearts, 'gray')
  const grayRequiredCount = grayRequiredState
    ? getEffectiveCount(grayRequiredState)
    : 0

  // メンバーハートの余剰数の合計を計算
  const totalMemberSurplus = calculateTotalMemberHeartSurplus(
    requiredLiveHearts,
    memberHearts
  )

  return Math.max(grayRequiredCount - totalMemberSurplus, 0)
}

/**
 * メンバーハートの各色における余剰数を配列で返す
 */
export const calculateMemberHeartSurplus = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection
): number[] => {
  return memberHeartColors.map((color) => {
    const requiredState = getHeartStateByColor(requiredLiveHearts, color)
    const memberState = getHeartStateByColor(memberHearts, color)

    const requiredCount = requiredState ? getEffectiveCount(requiredState) : 0
    const memberCount = memberState ? getEffectiveCount(memberState) : 0

    return Math.max(memberCount - requiredCount, 0)
  })
}

/**
 * メンバーハートの余剰数の合計を計算する
 */
export const calculateTotalMemberHeartSurplus = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection
): number => {
  const surplusArray = calculateMemberHeartSurplus(
    requiredLiveHearts,
    memberHearts
  )
  return surplusArray.reduce((acc, surplus) => acc + surplus, 0)
}

/**
 * 合計必要ブレードハート数を計算する
 */
export const calculateTotalRequiredBladeHearts = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection
): number => {
  const allBladeHearts = calculateAllRequiredBladeHearts(
    requiredLiveHearts,
    memberHearts
  )

  return getTotalEffectiveCount(allBladeHearts)
}

export const createMemberHeartCollection = (): HeartCollection => {
  return memberHeartColors.map((color) => createHeart(color))
}

export const createRequiredLiveHeartCollection = (): HeartCollection => {
  return liveHeartColors.map((color) => createHeart(color))
}

export const getHeartStateByColor = (
  collection: HeartCollection,
  color: HeartColor
): Heart | undefined => {
  return collection.find((heart) => heart.color === color)
}

export const getTotalEffectiveCount = (collection: HeartCollection): number => {
  return collection.reduce((total, heart) => {
    return total + getEffectiveCount(heart)
  }, 0)
}

export const getVisibleColorNames = (
  collection: HeartCollection
): MemberHeartColor[] => {
  return collection
    .filter((heart) => heart.visibility && heart.color !== 'gray')
    .map((heart) => heart.color as MemberHeartColor)
}

export const withDecrementedHeartCount = (
  collection: HeartCollection,
  color: HeartColor
): HeartCollection => {
  return collection.map((heart) => {
    if (heart.color === color) {
      return withDecrementedCount(heart)
    }
    return heart
  })
}

export const withIncrementedHeartCount = (
  collection: HeartCollection,
  color: HeartColor
): HeartCollection => {
  return collection.map((heart) => {
    if (heart.color === color) {
      return withIncrementedCount(heart)
    }
    return heart
  })
}

export const withResetHeartCounts = (
  collection: HeartCollection
): HeartCollection => {
  return collection.map((heart) => withResetCount(heart))
}

export const withUpdatedVisibilities = (
  collection: HeartCollection,
  visibleColors: MemberHeartColor[],
  forceGrayVisible: boolean = false
): HeartCollection => {
  return collection.map((heart) => {
    let visibility: boolean

    if (forceGrayVisible && heart.color === 'gray') {
      visibility = true
    } else {
      visibility = visibleColors.includes(heart.color as MemberHeartColor)
    }

    return withUpdatedVisibility(heart, visibility)
  })
}
