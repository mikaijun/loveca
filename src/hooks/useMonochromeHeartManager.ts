'use client'

import { useState, useCallback, useMemo } from 'react'

/**
 * モノクロハート管理のためのReactフック
 * 直接的な状態管理とバリデーション
 */

type MonochromeHeartState = {
  memberHeartCount: number
  requiredLiveHeartCount: number
}

type MonochromeHeartSummary = {
  memberHeartCount: number
  requiredLiveHeartCount: number
  requiredBladeHeartCount: number | 'ライブ成功'
  isLiveSuccess: boolean
}

// バリデーション関数
function validateHeartCount(count: number): string | null {
  if (!Number.isInteger(count)) {
    return 'ハートの数量は整数である必要があります'
  }
  if (count < 0) {
    return 'ハートの数量は0以上である必要があります'
  }
  if (count > 40) {
    return 'ハートの数量は40以下である必要があります'
  }
  return null
}

// サマリー計算関数
function calculateSummary(state: MonochromeHeartState): MonochromeHeartSummary {
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
}
export const useMonochromeHeartManager = () => {
  const [state, setState] = useState<MonochromeHeartState>({
    memberHeartCount: 0,
    requiredLiveHeartCount: 0,
  })
  const [error, setError] = useState<string | null>(null)

  // エラーをクリア
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // メンバーハート数を更新
  const handleChangeMemberHeartCount = useCallback(
    (count: number) => {
      const validationError = validateHeartCount(count)

      if (validationError) {
        setError(validationError)
        return
      }

      setState((prev) => ({ ...prev, memberHeartCount: count }))
      clearError()
    },
    [clearError]
  )

  // ライブに必要なハート数を更新
  const handleRequiredLiveHeartCount = useCallback(
    (count: number) => {
      const validationError = validateHeartCount(count)

      if (validationError) {
        setError(validationError)
        return
      }

      setState((prev) => ({ ...prev, requiredLiveHeartCount: count }))
      clearError()
    },
    [clearError]
  )

  // 全てのカウントをリセット
  const handleResetHeart = useCallback(() => {
    setState({
      memberHeartCount: 0,
      requiredLiveHeartCount: 0,
    })
    clearError()
  }, [clearError])

  // サマリーデータの計算（メモ化）
  const summaryData = useMemo(() => calculateSummary(state), [state])

  return {
    // 基本値
    memberHeartCount: summaryData.memberHeartCount,
    requiredLiveHeartCount: summaryData.requiredLiveHeartCount,

    // 計算結果
    requiredBladeHeartCount: summaryData.requiredBladeHeartCount,
    isLiveSuccess: summaryData.isLiveSuccess,

    // 操作関数
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,

    // エラー処理
    error,
    clearError,
  }
}
