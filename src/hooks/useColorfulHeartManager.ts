'use client'

import { useState, useCallback, useMemo } from 'react'
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
} from '../domain/entities/heart/collection'
import {
  createHeartColor,
  MemberHeartColor,
} from '../domain/valueObjects/HeartColor'
import { HeartCalculationService } from '../domain/services/HeartCalculationService/index'
import { HeartValidationService } from '../domain/services/HeartValidationService/index'

/**
 * カラフルハート管理のためのReactフック
 * 直接domain servicesを呼び出すシンプルな構造
 */

type HeartManagementState = {
  requiredLiveHearts: HeartCollection
  memberHearts: HeartCollection
}

export const useColorfulHeartManager = () => {
  const [state, setState] = useState<HeartManagementState>({
    requiredLiveHearts: createRequiredLiveHeartCollection(),
    memberHearts: createMemberHeartCollection(),
  })
  const [error, setError] = useState<string | null>(null)

  // エラーをクリア
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // ライブハートをインクリメント
  const handleIncrementRequiredLiveHeart = useCallback(
    (colorValue: string) => {
      try {
        const color = createHeartColor(colorValue)
        const validation = HeartValidationService.canIncrementHeart(
          state.requiredLiveHearts,
          color
        )

        if (!validation.canIncrement) {
          setError(validation.reason || '操作に失敗しました')
          return
        }

        const newRequiredLiveHearts = withIncrementedHeartCount(
          state.requiredLiveHearts,
          color
        )

        setState((prev) => ({
          ...prev,
          requiredLiveHearts: newRequiredLiveHearts,
        }))
        clearError()
      } catch (error) {
        setError(
          error instanceof Error ? error.message : '不明なエラーが発生しました'
        )
      }
    },
    [state, clearError]
  )

  // ライブハートをデクリメント
  const handleDecrementRequiredLiveHeart = useCallback(
    (colorValue: string) => {
      try {
        const color = createHeartColor(colorValue)
        const validation = HeartValidationService.canDecrementHeart(
          state.requiredLiveHearts,
          color
        )

        if (!validation.canDecrement) {
          setError(validation.reason || '操作に失敗しました')
          return
        }

        const newRequiredLiveHearts = withDecrementedHeartCount(
          state.requiredLiveHearts,
          color
        )

        setState((prev) => ({
          ...prev,
          requiredLiveHearts: newRequiredLiveHearts,
        }))
        clearError()
      } catch (error) {
        setError(
          error instanceof Error ? error.message : '不明なエラーが発生しました'
        )
      }
    },
    [state, clearError]
  )

  // メンバーハートをインクリメント
  const handleIncrementMemberHeart = useCallback(
    (colorValue: string) => {
      try {
        const color = createHeartColor(colorValue)

        // メンバーハートに灰色が含まれていないかチェック
        if (color.value === 'gray') {
          setError('メンバーハートに灰色は使用できません')
          return
        }

        const validation = HeartValidationService.canIncrementHeart(
          state.memberHearts,
          color
        )

        if (!validation.canIncrement) {
          setError(validation.reason || '操作に失敗しました')
          return
        }

        const newMemberHearts = withIncrementedHeartCount(
          state.memberHearts,
          color
        )

        setState((prev) => ({
          ...prev,
          memberHearts: newMemberHearts,
        }))
        clearError()
      } catch (error) {
        setError(
          error instanceof Error ? error.message : '不明なエラーが発生しました'
        )
      }
    },
    [state, clearError]
  )

  // メンバーハートをデクリメント
  const handleDecrementMemberHeart = useCallback(
    (colorValue: string) => {
      try {
        const color = createHeartColor(colorValue)

        // メンバーハートに灰色が含まれていないかチェック
        if (color.value === 'gray') {
          setError('メンバーハートに灰色は使用できません')
          return
        }

        const validation = HeartValidationService.canDecrementHeart(
          state.memberHearts,
          color
        )

        if (!validation.canDecrement) {
          setError(validation.reason || '操作に失敗しました')
          return
        }

        const newMemberHearts = withDecrementedHeartCount(
          state.memberHearts,
          color
        )

        setState((prev) => ({
          ...prev,
          memberHearts: newMemberHearts,
        }))
        clearError()
      } catch (error) {
        setError(
          error instanceof Error ? error.message : '不明なエラーが発生しました'
        )
      }
    },
    [state, clearError]
  )

  // 全てのハートカウントをリセット
  const handleResetAllHeartCounts = useCallback(() => {
    const newRequiredLiveHearts = withResetAllHeartCounts(
      state.requiredLiveHearts
    )
    const newMemberHearts = withResetAllHeartCounts(state.memberHearts)

    setState({
      requiredLiveHearts: newRequiredLiveHearts,
      memberHearts: newMemberHearts,
    })
    clearError()
  }, [state, clearError])

  // ライブハートの表示設定を更新
  const handleChangeRequiredLiveHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      const newRequiredLiveHearts = withUpdatedVisibilities(
        state.requiredLiveHearts,
        visibleColors,
        true // 灰色は強制的に表示
      )

      setState((prev) => ({
        ...prev,
        requiredLiveHearts: newRequiredLiveHearts,
      }))
      clearError()
    },
    [state, clearError]
  )

  // メンバーハートの表示設定を更新
  const handleChangeMemberHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      const colorValidation =
        HeartValidationService.validateMemberHeartColors(visibleColors)
      if (!colorValidation.isValid) {
        setError(colorValidation.reason || '表示設定の更新に失敗しました')
        return
      }

      const visibilityValidation =
        HeartValidationService.canUpdateMemberHeartVisibility(visibleColors)

      if (!visibilityValidation.isValid) {
        setError(visibilityValidation.reason || '表示設定の更新に失敗しました')
        return
      }

      const newMemberHearts = withUpdatedVisibilities(
        state.memberHearts,
        visibleColors,
        false // メンバーハートでは灰色は表示しない
      )

      setState((prev) => ({
        ...prev,
        memberHearts: newMemberHearts,
      }))
      clearError()
    },
    [state, clearError]
  )

  // サマリーデータの計算（メモ化）
  const summaryData = useMemo(() => {
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

    return {
      requiredLiveHeartCount,
      memberHeartCount,
      totalRequiredBladeHearts,
      liveResultMessage,
      canSucceedLive,
      requiredBladeHearts,
    }
  }, [state])

  // 表示中のハート色リストの取得（メモ化）
  const visibleColors = useMemo(
    () => ({
      requiredLiveHeartColors: getVisibleColorNames(state.requiredLiveHearts),
      memberHeartColors: getVisibleColorNames(state.memberHearts),
    }),
    [state]
  )

  return {
    // 基本情報
    requiredLiveHearts: state.requiredLiveHearts,
    memberHearts: state.memberHearts,

    // 計算結果
    requiredLiveHeartCount: summaryData.requiredLiveHeartCount,
    memberHeartCount: summaryData.memberHeartCount,
    totalRequiredBladeHearts: summaryData.totalRequiredBladeHearts,
    liveResultMessage: summaryData.liveResultMessage,
    canSucceedLive: summaryData.canSucceedLive,
    requiredBladeHearts: summaryData.requiredBladeHearts,

    // 色設定
    requiredLiveHeartColorList: visibleColors.requiredLiveHeartColors,
    memberHeartColorList: visibleColors.memberHeartColors,

    // 操作関数
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetAllHeartCounts,
    handleChangeRequiredLiveHeartVisibility,
    handleChangeMemberHeartVisibility,

    // エラー処理
    error,
    clearError,
  }
}
