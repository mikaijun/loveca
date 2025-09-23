import { HeartColor } from '../../valueObjects/HeartColor'

export type HeartState = Readonly<{
  color: HeartColor
  count: number
  visibility: boolean
}>

export function createHeartState(args: {
  color: HeartColor
  count?: number
  visibility?: boolean
}): HeartState {
  return {
    color: args.color,
    count: args.count ?? 0,
    visibility: args.visibility ?? true,
  }
}

export function withIncrementedCount(state: HeartState): HeartState {
  const newCount = Math.min(state.count + 1, 40)

  return {
    ...state,
    count: newCount,
  }
}

export function withDecrementedCount(state: HeartState): HeartState {
  const newCount = Math.max(state.count - 1, 0)

  return {
    ...state,
    count: newCount,
  }
}

export function withResetCount(state: HeartState): HeartState {
  return {
    ...state,
    count: 0,
  }
}

export function withUpdatedVisibility(
  state: HeartState,
  visibility: boolean
): HeartState {
  return {
    ...state,
    visibility,
  }
}

export function getEffectiveCount(state: HeartState): number {
  if (!state.visibility) {
    return 0
  }
  return state.count
}

export function getDisplayCount(state: HeartState): number {
  return state.count
}
