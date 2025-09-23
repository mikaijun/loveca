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
} from '../../entities/heart/collection'
import {
  createHeartColor,
  MemberHeartColor,
} from '../../valueObjects/HeartColor'
import { HeartCalculationService } from '../HeartCalculationService'

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
  /**
   * 初期状態の作成
   */
  createInitialState(): ColorfulHeartState {
    return {
      requiredLiveHearts: createRequiredLiveHeartCollection(),
      memberHearts: createMemberHeartCollection(),
    }
  },

  /**
   * ライブハートをインクリメント
   */
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

  /**
   * ライブハートをデクリメント
   */
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

  /**
   * メンバーハートをインクリメント
   */
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

  /**
   * メンバーハートをデクリメント
   */
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

  /**
   * 全てのハートカウントをリセット
   */
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

  /**
   * ライブハートの表示設定を更新
   */
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

  /**
   * メンバーハートの表示設定を更新
   */
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

  /**
   * サマリーデータの計算
   */
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
