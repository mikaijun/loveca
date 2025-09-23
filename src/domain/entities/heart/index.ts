import { HeartColor } from '@domain/valueObjects/HeartColor'

export type Heart = Readonly<{
  color: HeartColor
  count: number
  visibility: boolean
}>

export function createHeartState(args: {
  color: HeartColor
  count?: number
  visibility?: boolean
}): Heart {
  return {
    color: args.color,
    count: args.count ?? 0,
    visibility: args.visibility ?? true,
  }
}

export function withIncrementedCount(state: Heart): Heart {
  const newCount = Math.min(state.count + 1, 40)

  return {
    ...state,
    count: newCount,
  }
}

export function withDecrementedCount(state: Heart): Heart {
  const newCount = Math.max(state.count - 1, 0)

  return {
    ...state,
    count: newCount,
  }
}

export function withResetCount(state: Heart): Heart {
  return {
    ...state,
    count: 0,
  }
}

export function withUpdatedVisibility(
  state: Heart,
  visibility: boolean
): Heart {
  return {
    ...state,
    visibility,
  }
}

export function getEffectiveCount(state: Heart): number {
  if (!state.visibility) {
    return 0
  }
  return state.count
}

export function getDisplayCount(state: Heart): number {
  return state.count
}
