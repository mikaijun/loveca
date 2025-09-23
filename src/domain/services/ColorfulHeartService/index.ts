import { HeartCalculationService } from '@domain/services/HeartCalculationService'
import {
  HeartCollection,
  createRequiredLiveHeartCollection,
  createMemberHeartCollection,
  withIncrementedHeartCount,
  withDecrementedHeartCount,
  withResetAllHeartCounts,
  withUpdatedVisibilities,
  getTotalEffectiveCount,
  getVisibleColorNames,
} from '@domain/entities/heart/collection'
import {
  createHeartColor,
  MemberHeartColor,
} from '@domain/valueObjects/HeartColor'

/**
 * カラフルハート管理のドメインサービス
 */

export type ColorfulHeartState = {
  requiredLiveHearts: HeartCollection
  memberHearts: HeartCollection
}

export type ColorfulHeartSummary = {
  requiredLiveHeartCount: number
  memberHeartCount: number
  totalRequiredBladeHearts: number
  liveResultMessage: string
  canSucceedLive: boolean
  requiredBladeHearts: HeartCollection
  requiredLiveHeartColors: MemberHeartColor[]
  memberHeartColors: MemberHeartColor[]
}

export const ColorfulHeartService = {
  createInitialState(): ColorfulHeartState {
    return {
      requiredLiveHearts: createRequiredLiveHeartCollection(),
      memberHearts: createMemberHeartCollection(),
    }
  },

  incrementRequiredLiveHeart(
    state: ColorfulHeartState,
    colorValue: string
  ): ColorfulHeartState {
    const color = createHeartColor(colorValue)
    const newRequiredLiveHearts = withIncrementedHeartCount(
      state.requiredLiveHearts,
      color
    )

    return {
      ...state,
      requiredLiveHearts: newRequiredLiveHearts,
    }
  },

  decrementRequiredLiveHeart(
    state: ColorfulHeartState,
    colorValue: string
  ): ColorfulHeartState {
    const color = createHeartColor(colorValue)
    const newRequiredLiveHearts = withDecrementedHeartCount(
      state.requiredLiveHearts,
      color
    )

    return {
      ...state,
      requiredLiveHearts: newRequiredLiveHearts,
    }
  },

  incrementMemberHeart(
    state: ColorfulHeartState,
    colorValue: string
  ): ColorfulHeartState {
    const color = createHeartColor(colorValue)
    const newMemberHearts = withIncrementedHeartCount(state.memberHearts, color)

    return {
      ...state,
      memberHearts: newMemberHearts,
    }
  },

  decrementMemberHeart(
    state: ColorfulHeartState,
    colorValue: string
  ): ColorfulHeartState {
    const color = createHeartColor(colorValue)
    const newMemberHearts = withDecrementedHeartCount(state.memberHearts, color)

    return {
      ...state,
      memberHearts: newMemberHearts,
    }
  },

  resetAllHeartCounts(state: ColorfulHeartState): ColorfulHeartState {
    const newRequiredLiveHearts = withResetAllHeartCounts(
      state.requiredLiveHearts
    )
    const newMemberHearts = withResetAllHeartCounts(state.memberHearts)

    return {
      requiredLiveHearts: newRequiredLiveHearts,
      memberHearts: newMemberHearts,
    }
  },

  updateRequiredLiveHeartVisibility(
    state: ColorfulHeartState,
    visibleColors: MemberHeartColor[]
  ): ColorfulHeartState {
    const newRequiredLiveHearts = withUpdatedVisibilities(
      state.requiredLiveHearts,
      visibleColors,
      true // 灰色は強制的に表示
    )

    return {
      ...state,
      requiredLiveHearts: newRequiredLiveHearts,
    }
  },

  updateMemberHeartVisibility(
    state: ColorfulHeartState,
    visibleColors: MemberHeartColor[]
  ): ColorfulHeartState {
    const newMemberHearts = withUpdatedVisibilities(
      state.memberHearts,
      visibleColors,
      false // メンバーハートでは灰色は表示しない
    )

    return {
      ...state,
      memberHearts: newMemberHearts,
    }
  },

  calculateSummary(state: ColorfulHeartState): ColorfulHeartSummary {
    const requiredLiveHeartCount = getTotalEffectiveCount(
      state.requiredLiveHearts
    )
    const memberHeartCount = getTotalEffectiveCount(state.memberHearts)
    const totalRequiredBladeHearts =
      HeartCalculationService.calculateTotalRequiredBladeHearts(
        state.requiredLiveHearts,
        state.memberHearts
      )
    const liveResultMessage = HeartCalculationService.getLiveResultMessage(
      state.requiredLiveHearts,
      state.memberHearts
    )
    const canSucceedLive = HeartCalculationService.canSucceedLive(
      state.requiredLiveHearts,
      state.memberHearts
    )
    const requiredBladeHearts =
      HeartCalculationService.calculateAllRequiredBladeHearts(
        state.requiredLiveHearts,
        state.memberHearts
      )

    // 表示中のハート色リストの取得
    const requiredLiveHeartColors = getVisibleColorNames(
      state.requiredLiveHearts
    )
    const memberHeartColors = getVisibleColorNames(state.memberHearts)

    return {
      requiredLiveHeartCount,
      memberHeartCount,
      totalRequiredBladeHearts,
      liveResultMessage,
      canSucceedLive,
      requiredBladeHearts,
      requiredLiveHeartColors,
      memberHeartColors,
    }
  },
}
