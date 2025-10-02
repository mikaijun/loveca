import { HeartColor } from '@domain/valueObjects/heartColor'

export interface Heart {
  readonly color: HeartColor
  readonly count: number
  readonly visibility: boolean
}

export const createHeartState = (args: {
  color: HeartColor
  count?: number
  visibility?: boolean
}): Heart => {
  return {
    color: args.color,
    count: args.count ?? 0,
    visibility: args.visibility ?? true,
  }
}

export const withIncrementedCount = (state: Heart): Heart => {
  const newCount = Math.min(state.count + 1, 40)

  return {
    ...state,
    count: newCount,
  }
}

export const withDecrementedCount = (state: Heart): Heart => {
  const newCount = Math.max(state.count - 1, 0)

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

export const getEffectiveCount = (state: Heart): number => {
  if (!state.visibility) {
    return 0
  }
  return state.count
}

export const getDisplayCount = (state: Heart): number => {
  return state.count
}
