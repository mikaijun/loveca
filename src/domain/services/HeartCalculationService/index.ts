import {
  HeartCollection,
  getTotalEffectiveCount,
  getHeartStateByColor,
} from '../../entities/Heart/collection'
import { getEffectiveCount } from '../../entities/Heart'
import {
  HeartColor,
  getAllMemberHeartColors,
  getHeartColorValue,
  createHeartColor,
} from '../../valueObjects/HeartColor'

/**
 * ハートの計算に関するドメインサービス
 */
export const HeartCalculationService = {
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
      return HeartCalculationService.calculateRequiredGrayBladeHeart(
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
    const memberSurplus = HeartCalculationService.calculateMemberHeartSurplus(
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
        HeartCalculationService.calculateRequiredBladeHeartByColor(
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
   * ライブが成功可能かを判定する
   */
  canSucceedLive: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection
  ): boolean => {
    const totalRequired = getTotalEffectiveCount(requiredLiveHearts)
    const totalMember = getTotalEffectiveCount(memberHearts)

    // 必要ハート数が0より大きく、かつメンバーハートで充足可能な場合
    return totalRequired > 0 && totalMember >= totalRequired
  },

  /**
   * 合計必要ブレードハート数を計算する
   */
  calculateTotalRequiredBladeHearts: (
    requiredLiveHearts: HeartCollection,
    memberHearts: HeartCollection
  ): number => {
    const allBladeHearts =
      HeartCalculationService.calculateAllRequiredBladeHearts(
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
    const canSucceed = HeartCalculationService.canSucceedLive(
      requiredLiveHearts,
      memberHearts
    )
    const totalRequired = getTotalEffectiveCount(requiredLiveHearts)

    if (totalRequired > 0 && canSucceed) {
      return 'ライブ成功'
    }

    const totalBladeRequired =
      HeartCalculationService.calculateTotalRequiredBladeHearts(
        requiredLiveHearts,
        memberHearts
      )

    return `必要ブレードハート数: ${totalBladeRequired}`
  },
}
