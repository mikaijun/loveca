import {
  HeartColor,
  RequiredLiveHeartColor,
  MemberHeartColor,
} from '@domain/valueObjects/heartColor/heartColor'

export interface Heart {
  readonly color: HeartColor
  readonly count: number
  readonly visibility: boolean
}

export interface RequiredLiveHeart {
  readonly color: RequiredLiveHeartColor
  readonly count: number
  readonly visibility: boolean
}
export interface MemberHeart {
  readonly color: MemberHeartColor
  readonly count: number
  readonly visibility: boolean
}

export const createRequiredLiveHeart = (
  color: RequiredLiveHeartColor
): RequiredLiveHeart => {
  return {
    color,
    count: 0,
    visibility: true,
  }
}

export const createMemberHeart = (color: MemberHeartColor): MemberHeart => {
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

export const isMemberHeart = (heart: Heart): heart is MemberHeart => {
  return heart.color !== 'gray'
}

export const isRequiredLiveHeart = (
  heart: Heart
): heart is RequiredLiveHeart => {
  return heart.color !== 'all'
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
