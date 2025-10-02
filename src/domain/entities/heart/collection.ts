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
  getAllLiveHeartColors,
  getAllMemberHeartColors,
  MemberHeartColor,
} from '@domain/valueObjects/heartColor'

export type HeartCollection = readonly Heart[]

/**
 * メンバーハートの各色における余剰数を計算する
 */
export const calculateMemberHeartSurplus = (
  requiredLiveHearts: HeartCollection,
  memberHearts: HeartCollection
): number[] => {
  return getAllMemberHeartColors().map((color) => {
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

export const createMemberHeartCollection = (): HeartCollection => {
  return getAllMemberHeartColors().map((color) => createHeart(color))
}

export const createRequiredLiveHeartCollection = (): HeartCollection => {
  return getAllLiveHeartColors().map((color) => createHeart(color))
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

export const withResetAllHeartCounts = (
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
