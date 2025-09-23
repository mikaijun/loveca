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

  createInitialState(): MonochromeHeartState {
    return {
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
    }
  },
}
