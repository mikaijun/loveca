import {
  Heart,
  createHeart,
  withIncrementedCount,
  withDecrementedCount,
  withResetCount,
  getEffectiveCount,
  withUpdatedVisibility,
} from '.'
import {
  HeartColor,
  getAllLiveHeartColors,
  getAllMemberHeartColors,
  MemberHeartColor,
} from '@domain/valueObjects/heartColor'

export interface HeartCollection {
  readonly states: ReadonlyMap<string, Heart>
}

export const createRequiredLiveHeartCollection = (): HeartCollection => {
  const states = new Map<string, Heart>()

  getAllLiveHeartColors().forEach((color) => {
    const key = color.value
    states.set(key, createHeart(color))
  })

  return { states }
}

export const createMemberHeartCollection = (): HeartCollection => {
  const states = new Map<string, Heart>()

  getAllMemberHeartColors().forEach((color) => {
    const key = color.value
    states.set(key, createHeart(color))
  })

  return { states }
}

export const withIncrementedHeartCount = (
  collection: HeartCollection,
  color: HeartColor
): HeartCollection => {
  const colorKey = color.value
  const currentState = collection.states.get(colorKey)

  if (!currentState) {
    throw new Error(`指定された色のハートが見つかりません: ${colorKey}`)
  }

  const newStates = new Map(collection.states)
  newStates.set(colorKey, withIncrementedCount(currentState))

  return { states: newStates }
}

export const withDecrementedHeartCount = (
  collection: HeartCollection,
  color: HeartColor
): HeartCollection => {
  const colorKey = color.value
  const currentState = collection.states.get(colorKey)

  if (!currentState) {
    throw new Error(`指定された色のハートが見つかりません: ${colorKey}`)
  }

  const newStates = new Map(collection.states)
  newStates.set(colorKey, withDecrementedCount(currentState))

  return { states: newStates }
}

export const withResetAllHeartCounts = (
  collection: HeartCollection
): HeartCollection => {
  const newStates = new Map<string, Heart>()

  collection.states.forEach((state, key) => {
    newStates.set(key, withResetCount(state))
  })

  return { states: newStates }
}

export const withUpdatedVisibilities = (
  collection: HeartCollection,
  visibleColors: MemberHeartColor[],
  forceGrayVisible: boolean = false
): HeartCollection => {
  const newStates = new Map<string, Heart>()

  collection.states.forEach((state, key) => {
    let visibility: boolean

    if (forceGrayVisible && key === 'gray') {
      visibility = true
    } else {
      visibility = visibleColors.includes(key as MemberHeartColor)
    }

    newStates.set(key, withUpdatedVisibility(state, visibility))
  })

  return { states: newStates }
}

export const getTotalEffectiveCount = (collection: HeartCollection): number => {
  let total = 0
  collection.states.forEach((state) => {
    total += getEffectiveCount(state)
  })
  return total
}

export const getHeartStateByColor = (
  collection: HeartCollection,
  color: HeartColor
): Heart | undefined => {
  const colorKey = color.value
  return collection.states.get(colorKey)
}

export const getVisibleColorNames = (
  collection: HeartCollection
): MemberHeartColor[] => {
  const visibleColors: MemberHeartColor[] = []
  collection.states.forEach((state) => {
    const colorValue = state.color.value
    if (state.visibility && colorValue !== 'gray') {
      visibleColors.push(colorValue as MemberHeartColor)
    }
  })
  return visibleColors
}

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
