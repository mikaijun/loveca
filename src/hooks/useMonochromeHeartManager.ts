'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  MonochromeHeartService,
  MonochromeHeartState,
} from '../domain/services/MonochromeHeartService'

/**
 * モノクロハート管理のためのReactフック
 * MonochromeHeartServiceを使用したシンプルな状態管理
 */
export const useMonochromeHeartManager = () => {
  const [state, setState] = useState<MonochromeHeartState>(
    MonochromeHeartService.createInitialState()
  )

  // メンバーハート数を更新
  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setState((prev) => ({ ...prev, memberHeartCount: count }))
  }, [])

  // ライブに必要なハート数を更新
  const handleRequiredLiveHeartCount = useCallback((count: number) => {
    setState((prev) => ({ ...prev, requiredLiveHeartCount: count }))
  }, [])

  // 全てのカウントをリセット
  const handleResetHeart = useCallback(() => {
    setState(MonochromeHeartService.createInitialState())
  }, [])

  // サマリーデータの計算（メモ化）
  const summaryData = useMemo(
    () => MonochromeHeartService.calculateSummary(state),
    [state]
  )

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
  }
}
