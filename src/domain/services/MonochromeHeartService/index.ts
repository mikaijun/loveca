/**
 * モノクロハートに関するドメインサービス
 */

export type MonochromeHeartState = {
  memberHeartCount: number
  requiredLiveHeartCount: number
}

export type MonochromeHeartSummary = {
  memberHeartCount: number
  requiredLiveHeartCount: number
  requiredBladeHeartCount: number | 'ライブ成功'
  isLiveSuccess: boolean
}

export type HeartCountValidationResult = {
  isValid: boolean
  reason?: string
}

export const MonochromeHeartService = {
  /**
   * ハートカウントのバリデーション
   */
  validateHeartCount(count: number): HeartCountValidationResult {
    if (!Number.isInteger(count)) {
      return {
        isValid: false,
        reason: 'ハートの数量は整数である必要があります',
      }
    }
    if (count < 0) {
      return {
        isValid: false,
        reason: 'ハートの数量は0以上である必要があります',
      }
    }
    if (count > 40) {
      return {
        isValid: false,
        reason: 'ハートの数量は40以下である必要があります',
      }
    }
    return { isValid: true }
  },

  /**
   * サマリーデータの計算
   */
  calculateSummary(state: MonochromeHeartState): MonochromeHeartSummary {
    const memberCount = state.memberHeartCount
    const requiredCount = state.requiredLiveHeartCount

    const diffCount = requiredCount - memberCount
    const isLiveSuccess = requiredCount > 0 && diffCount <= 0
    const requiredBladeHeartCount = isLiveSuccess
      ? ('ライブ成功' as const)
      : Math.max(diffCount, 0)

    return {
      memberHeartCount: memberCount,
      requiredLiveHeartCount: requiredCount,
      requiredBladeHeartCount,
      isLiveSuccess,
    }
  },

  /**
   * 初期状態の作成
   */
  createInitialState(): MonochromeHeartState {
    return {
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
    }
  },
}
