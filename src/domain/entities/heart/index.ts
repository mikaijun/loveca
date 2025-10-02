import { HeartColor } from '@domain/valueObjects/heartColor'

export interface Heart {
  readonly color: HeartColor
  readonly count: number
  readonly visibility: boolean
}

export const createHeart = (color: HeartColor): Heart => {
  return {
    color,
    count: 0,
    visibility: true,
  }
}

export const getDisplayCount = (state: Heart): number => {
  return state.count
}

export const getEffectiveCount = (state: Heart): number => {
  if (!state.visibility) {
    return 0
  }
  return state.count
}

export const withDecrementedCount = (state: Heart): Heart => {
  const newCount = Math.max(state.count - 1, 0)

  return {
    ...state,
    count: newCount,
  }
}

export const withIncrementedCount = (state: Heart): Heart => {
  const newCount = Math.min(state.count + 1, 40)

  return {
    ...state,
    count: newCount,
  }
}

export const withResetCount = (state: Heart): Heart => {
  return {
    ...state,
    count: 0,
  }
}

export const withUpdatedVisibility = (
  state: Heart,
  visibility: boolean
): Heart => {
  return {
    ...state,
    visibility,
  }
}
