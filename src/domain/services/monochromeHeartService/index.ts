/**
 * モノクロハートに関するドメインサービス
 */

export interface MonochromeHeartState {
  memberHeartCount: number
  requiredLiveHeartCount: number
}

export interface MonochromeHeartSummary {
  memberHeartCount: number
  requiredLiveHeartCount: number
  requiredBladeHeartCount: number | 'ライブ成功'
  isLiveSuccess: boolean
}

export interface HeartCountValidationResult {
  isValid: boolean
  reason?: string
}

export const monochromeHeartService = {
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
