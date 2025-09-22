import {
  HeartCollection,
  getHeartStateByColor,
} from '../../entities/heart/collection'
import {
  HeartColor,
  MemberHeartColor,
  getHeartColorValue,
} from '../../valueObjects/HeartColor'

/**
 * ハートの状態検証に関するドメインサービス
 */
export const HeartValidationService = {
  /**
   * メンバーハートの表示設定が有効かを検証する
   */
  canUpdateMemberHeartVisibility: (
    newVisibleColors: MemberHeartColor[]
  ): { isValid: boolean; reason?: string } => {
    // 最低1色は表示されている必要がある
    if (newVisibleColors.length === 0) {
      return {
        isValid: false,
        reason: 'メンバーハートは最低1色表示されている必要があります',
      }
    }

    return { isValid: true }
  },

  /**
   * 指定した色のハートがインクリメント可能かを検証する
   */
  canIncrementHeart: (
    collection: HeartCollection,
    color: HeartColor
  ): { canIncrement: boolean; reason?: string } => {
    const state = getHeartStateByColor(collection, color)

    if (!state) {
      return {
        canIncrement: false,
        reason: `指定された色のハートが見つかりません: ${getHeartColorValue(color)}`,
      }
    }

    if (!state.visibility) {
      return {
        canIncrement: false,
        reason: '非表示のハートは操作できません',
      }
    }

    const currentCount = state.count
    if (currentCount >= 40) {
      return {
        canIncrement: false,
        reason: 'ハートの上限は40です',
      }
    }

    return { canIncrement: true }
  },

  /**
   * 指定した色のハートがデクリメント可能かを検証する
   */
  canDecrementHeart: (
    collection: HeartCollection,
    color: HeartColor
  ): { canDecrement: boolean; reason?: string } => {
    const state = getHeartStateByColor(collection, color)

    if (!state) {
      return {
        canDecrement: false,
        reason: `指定された色のハートが見つかりません: ${getHeartColorValue(color)}`,
      }
    }

    if (!state.visibility) {
      return {
        canDecrement: false,
        reason: '非表示のハートは操作できません',
      }
    }

    const currentCount = state.count
    if (currentCount <= 0) {
      return {
        canDecrement: false,
        reason: 'ハートの下限は0です',
      }
    }

    return { canDecrement: true }
  },

  /**
   * メンバーハートで灰色が指定されていないかを検証する
   */
  validateMemberHeartColors: (
    colors: MemberHeartColor[]
  ): { isValid: boolean; reason?: string } => {
    // TypeScriptの型システムで既に灰色は除外されているが、実行時の追加チェック
    const hasGray = (colors as string[]).some((color) => color === 'gray')

    if (hasGray) {
      return {
        isValid: false,
        reason: 'メンバーハートに灰色は指定できません',
      }
    }

    return { isValid: true }
  },
}
