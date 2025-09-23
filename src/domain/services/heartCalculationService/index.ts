import {
  HeartCollection,
  getTotalEffectiveCount,
  getHeartStateByColor,
} from '@domain/entities/heart/collection'
import { getEffectiveCount } from '@domain/entities/heart'
import {
  HeartColor,
  getAllMemberHeartColors,
  getHeartColorValue,
  createHeartColor,
} from '@domain/valueObjects/HeartColor'

export const heartCalculationService = {
  /**
   * 必要なブレードハート数を計算する（各色ごと）
   */
  calculateRequiredBladeHeartByColor: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection,
    color: HeartColor
  ): number => {
    const colorKey = getHeartColorValue(color)

    // 灰色の場合は特別な計算が必要
    if (colorKey === 'gray') {
      return heartCalculationService.calculateRequiredGrayBladeHeart(
        requiredLiveHearts,
        memberHearts
      )
    }

    const requiredState = getHeartStateByColor(requiredLiveHearts, color)
    const memberState = getHeartStateByColor(memberHearts, color)

    const requiredCount = requiredState ? getEffectiveCount(requiredState) : 0
    const memberCount = memberState ? getEffectiveCount(memberState) : 0

    return Math.max(requiredCount - memberCount, 0)
  },

  /**
   * 必要な灰色ブレードハート数を計算する
   */
  calculateRequiredGrayBladeHeart: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection
  ): number => {
    // 灰色ハートの必要数を取得
    const grayColor = createHeartColor('gray')
    const grayRequiredState = getHeartStateByColor(
      requiredLiveHearts,
      grayColor
    )
    const grayRequiredCount = grayRequiredState
      ? getEffectiveCount(grayRequiredState)
      : 0

    // メンバーハートの各色における余剰数を計算
    const memberSurplus = heartCalculationService.calculateMemberHeartSurplus(
      requiredLiveHearts,
      memberHearts
    )

    const totalMemberSurplus = memberSurplus.reduce(
      (acc, surplus) => acc + surplus,
      0
    )

    return Math.max(grayRequiredCount - totalMemberSurplus, 0)
  },

  /**
   * メンバーハートの各色における余剰数を計算する
   */
  calculateMemberHeartSurplus: (
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
  },

  /**
   * 全ての必要ブレードハートの状態を計算する
   */
  calculateAllRequiredBladeHearts: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection
  ): HeartCollection => {
    const bladeHeartStates = new Map()

    // 各色について必要ブレードハート数を計算
    requiredLiveHearts.states.forEach((state, colorKey) => {
      const color = createHeartColor(colorKey)
      const requiredBladeCount =
        heartCalculationService.calculateRequiredBladeHeartByColor(
          requiredLiveHearts,
          memberHearts,
          color
        )

      // 新しいHeartStateを作成（countは計算結果、visibilityは元の設定を維持）
      const bladeHeartState = {
        ...state,
        count: requiredBladeCount,
      }

      bladeHeartStates.set(colorKey, bladeHeartState)
    })

    return { states: bladeHeartStates }
  },

  /**
   * 合計必要ブレードハート数を計算する
   */
  calculateTotalRequiredBladeHearts: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection
  ): number => {
    const allBladeHearts =
      heartCalculationService.calculateAllRequiredBladeHearts(
        requiredLiveHearts,
        memberHearts
      )

    return getTotalEffectiveCount(allBladeHearts)
  },

  /**
   * ライブ成功状態の表示メッセージを取得する
   */
  getLiveResultMessage: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection
  ): string => {
    if (getTotalEffectiveCount(requiredLiveHearts) === 0) {
      return '必要ブレードハート数: 0'
    }

    const totalRequiredBladeHearts =
      heartCalculationService.calculateTotalRequiredBladeHearts(
        requiredLiveHearts,
        memberHearts
      )

    return totalRequiredBladeHearts
      ? `必要ブレードハート数: ${totalRequiredBladeHearts}`
      : 'ライブ成功'
  },
}
