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

  // ライブハートをインクリメント
  const handleIncrementRequiredLiveHeart = useCallback(
    (colorValue: string) => {
      const color = createHeartColor(colorValue)

      const newRequiredLiveHearts = withIncrementedHeartCount(
        state.requiredLiveHearts,
        color
      )

      setState((prev) => ({
        ...prev,
        requiredLiveHearts: newRequiredLiveHearts,
      }))
    },
    [state]
  )

  // ライブハートをデクリメント
  const handleDecrementRequiredLiveHeart = useCallback(
    (colorValue: string) => {
      const color = createHeartColor(colorValue)

      const newRequiredLiveHearts = withDecrementedHeartCount(
        state.requiredLiveHearts,
        color
      )

      setState((prev) => ({
        ...prev,
        requiredLiveHearts: newRequiredLiveHearts,
      }))
    },
    [state]
  )

  // メンバーハートをインクリメント
  const handleIncrementMemberHeart = useCallback(
    (colorValue: string) => {
      const color = createHeartColor(colorValue)

      const newMemberHearts = withIncrementedHeartCount(
        state.memberHearts,
        color
      )

      setState((prev) => ({
        ...prev,
        memberHearts: newMemberHearts,
      }))
    },
    [state]
  )

  // メンバーハートをデクリメント
  const handleDecrementMemberHeart = useCallback(
    (colorValue: string) => {
      const color = createHeartColor(colorValue)

      const newMemberHearts = withDecrementedHeartCount(
        state.memberHearts,
        color
      )

      setState((prev) => ({
        ...prev,
        memberHearts: newMemberHearts,
      }))
    },
    [state]
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
  }, [state])

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
    },
    [state]
  )

  // メンバーハートの表示設定を更新
  const handleChangeMemberHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      const newMemberHearts = withUpdatedVisibilities(
        state.memberHearts,
        visibleColors,
        false // メンバーハートでは灰色は表示しない
      )

      setState((prev) => ({
        ...prev,
        memberHearts: newMemberHearts,
      }))
    },
    [state]
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
  }
}
