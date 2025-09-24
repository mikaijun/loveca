import {
  Heart,
  createHeartState,
  withIncrementedCount,
  withDecrementedCount,
  withResetCount,
  getEffectiveCount,
  withUpdatedVisibility,
} from '.'
import {
  HeartColor,
  getHeartColorValue,
  getAllLiveHeartColors,
  getAllMemberHeartColors,
  MemberHeartColor,
} from '@domain/valueObjects/heartColor'

export interface HeartCollection {
  readonly states: ReadonlyMap<string, Heart>
}

export function createRequiredLiveHeartCollection(): HeartCollection {
  const states = new Map<string, Heart>()

  getAllLiveHeartColors().forEach((color) => {
    const key = getHeartColorValue(color)
    states.set(key, createHeartState({ color, visibility: true }))
  })

  return { states }
}

export function createMemberHeartCollection(): HeartCollection {
  const states = new Map<string, Heart>()

  getAllMemberHeartColors().forEach((color) => {
    const key = getHeartColorValue(color)
    states.set(key, createHeartState({ color, visibility: true }))
  })

  return { states }
}

export function withIncrementedHeartCount(
  collection: HeartCollection,
  color: HeartColor
): HeartCollection {
  const colorKey = getHeartColorValue(color)
  const currentState = collection.states.get(colorKey)

  if (!currentState) {
    throw new Error(`指定された色のハートが見つかりません: ${colorKey}`)
  }

  const newStates = new Map(collection.states)
  newStates.set(colorKey, withIncrementedCount(currentState))

  return { states: newStates }
}

export function withDecrementedHeartCount(
  collection: HeartCollection,
  color: HeartColor
): HeartCollection {
  const colorKey = getHeartColorValue(color)
  const currentState = collection.states.get(colorKey)

  if (!currentState) {
    throw new Error(`指定された色のハートが見つかりません: ${colorKey}`)
  }

  const newStates = new Map(collection.states)
  newStates.set(colorKey, withDecrementedCount(currentState))

  return { states: newStates }
}

export function withResetAllHeartCounts(
  collection: HeartCollection
): HeartCollection {
  const newStates = new Map<string, Heart>()

  collection.states.forEach((state, key) => {
    newStates.set(key, withResetCount(state))
  })

  return { states: newStates }
}

export function withUpdatedVisibilities(
  collection: HeartCollection,
  visibleColors: MemberHeartColor[],
  forceGrayVisible: boolean = false
): HeartCollection {
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

export function getTotalEffectiveCount(collection: HeartCollection): number {
  let total = 0
  collection.states.forEach((state) => {
    total += getEffectiveCount(state)
  })
  return total
}

export function getHeartStateByColor(
  collection: HeartCollection,
  color: HeartColor
): Heart | undefined {
  const colorKey = getHeartColorValue(color)
  return collection.states.get(colorKey)
}

export function getVisibleColorNames(
  collection: HeartCollection
): MemberHeartColor[] {
  const visibleColors: MemberHeartColor[] = []
  collection.states.forEach((state) => {
    const colorValue = getHeartColorValue(state.color)
    if (state.visibility && colorValue !== 'gray') {
      visibleColors.push(colorValue as MemberHeartColor)
    }
  })
  return visibleColors
}
