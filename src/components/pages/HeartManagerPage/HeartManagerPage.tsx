'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { Tabs, Flex, Box } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'

import {
  ColorfulHeartService,
  ColorfulHeartState,
  ColorfulHeartSummary,
} from '../../../domain/services/ColorfulHeartService'
import { MonochromeHeartService } from '../../../domain/services/MonochromeHeartService'
import { getHeartStateByColor } from '../../../domain/entities/heart/collection'
import {
  getAllLiveHeartColors,
  getAllMemberHeartColors,
  getHeartColorValue,
} from '../../../domain/valueObjects/HeartColor'
import {
  getEffectiveCount,
  getDisplayCount,
} from '../../../domain/entities/heart'
import { MemberHeartColor } from '../../../domain/valueObjects/HeartColor'
import { HeartColorSettingsModal } from '@components/ui/HeartColorSettingsModal'
import { HeartCounter } from '@components/ui/HeartCounter'
import { HeartIcon } from '@components/ui/HeartIcon'
import { ResetButton } from '@components/commons/ui/ResetButton'
import { Summary } from '@components/commons/ui/Summary'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import { colors } from '@constants/colors'
import './HeartManagerPage.css'

/**
 * カラフルハート管理コンポーネント
 */
interface ColorfulHeartManagerProps {
  requiredLiveHearts: ColorfulHeartState['requiredLiveHearts']
  memberHearts: ColorfulHeartState['memberHearts']
  requiredLiveHeartCount: number
  memberHeartCount: number
  liveResultMessage: string
  requiredBladeHearts: ColorfulHeartSummary['requiredBladeHearts']
  requiredLiveHeartColorList: MemberHeartColor[]
  memberHeartColorList: MemberHeartColor[]
  handleIncrementRequiredLiveHeart: (colorValue: string) => void
  handleDecrementRequiredLiveHeart: (colorValue: string) => void
  handleIncrementMemberHeart: (colorValue: string) => void
  handleDecrementMemberHeart: (colorValue: string) => void
  handleResetAllHeartCounts: () => void
  handleChangeRequiredLiveHeartVisibility: (
    visibleColors: MemberHeartColor[]
  ) => void
  handleChangeMemberHeartVisibility: (visibleColors: MemberHeartColor[]) => void
}

const ColorfulHeartManager: React.FC<ColorfulHeartManagerProps> = ({
  requiredLiveHearts,
  memberHearts,
  requiredLiveHeartCount,
  memberHeartCount,
  liveResultMessage,
  requiredBladeHearts,
  requiredLiveHeartColorList,
  memberHeartColorList,
  handleIncrementRequiredLiveHeart,
  handleDecrementRequiredLiveHeart,
  handleIncrementMemberHeart,
  handleDecrementMemberHeart,
  handleResetAllHeartCounts,
  handleChangeRequiredLiveHeartVisibility,
  handleChangeMemberHeartVisibility,
}) => {
  return (
    <div className="HeartManagerContainer">
      <div className="HeartManagerHeader">
        <HeartColorSettingsModal
          memberHeartColorList={memberHeartColorList}
          onChangeMemberHeartColor={handleChangeMemberHeartVisibility}
          onChangeRequiredLiveHeartColor={
            handleChangeRequiredLiveHeartVisibility
          }
          requiredLiveHeartColorList={requiredLiveHeartColorList}
        />
        <ResetButton
          onReset={handleResetAllHeartCounts}
          text="カウントリセット"
        />
      </div>

      <Summary
        icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
        label={liveResultMessage}
      />

      {/* 必要ブレードハート表示 */}
      <div className="HeartCounterGroup">
        {getAllLiveHeartColors().map((color) => {
          const colorValue = getHeartColorValue(color)
          const requiredState = getHeartStateByColor(requiredLiveHearts, color)
          const bladeState = getHeartStateByColor(requiredBladeHearts, color)

          if (!requiredState || !requiredState.visibility) {
            return null
          }

          const requiredCount = getEffectiveCount(requiredState)
          const bladeCount = bladeState ? getEffectiveCount(bladeState) : 0

          return (
            <div className="HeartCounterItem" key={colorValue}>
              <HeartIcon color={colorValue} />
              <span className="HeartCounterValue">
                {requiredCount > 0 && bladeCount === 0 ? '達成' : bladeCount}
              </span>
            </div>
          )
        })}
      </div>

      <Summary
        icon={<VscWand size="20px" />}
        label={`ライブに必要なハート数: ${requiredLiveHeartCount}`}
      />

      {/* ライブハートカウンター */}
      <div className="HeartCounterGroup">
        {getAllLiveHeartColors().map((color) => {
          const colorValue = getHeartColorValue(color)
          const state = getHeartStateByColor(requiredLiveHearts, color)

          if (!state || !state.visibility) {
            return null
          }

          return (
            <HeartCounter
              color={colorValue}
              count={getDisplayCount(state)}
              key={colorValue}
              onDecrement={handleDecrementRequiredLiveHeart}
              onIncrement={handleIncrementRequiredLiveHeart}
            />
          )
        })}
      </div>

      <Summary
        icon={<BsPersonHearts size="20px" />}
        label={`メンバーのハート合計数: ${memberHeartCount}`}
      />

      {/* メンバーハートカウンター */}
      <div className="HeartCounterGroup">
        {getAllMemberHeartColors().map((color) => {
          const colorValue = getHeartColorValue(color)
          const state = getHeartStateByColor(memberHearts, color)

          if (!state || !state.visibility) {
            return null
          }

          return (
            <HeartCounter
              color={colorValue}
              count={getDisplayCount(state)}
              key={colorValue}
              onDecrement={handleDecrementMemberHeart}
              onIncrement={handleIncrementMemberHeart}
            />
          )
        })}
      </div>

      <div className="HeartManagerFooter">
        ※ALLハート持ちメンバーは好きな色を選択してください
      </div>
    </div>
  )
}

/**
 * モノクロハート管理コンポーネント
 */
interface MonochromeHeartManagerProps {
  memberHeartCount: number
  requiredLiveHeartCount: number
  requiredBladeHeartCount: number | string
  isLiveSuccess: boolean
  handleChangeMemberHeartCount: (count: number) => void
  handleRequiredLiveHeartCount: (count: number) => void
  handleResetHeart: () => void
}

const MonochromeHeartManager: React.FC<MonochromeHeartManagerProps> = ({
  memberHeartCount,
  requiredLiveHeartCount,
  requiredBladeHeartCount,
  handleChangeMemberHeartCount,
  handleRequiredLiveHeartCount,
  handleResetHeart,
}) => {
  const bladeHeartDisplayMessage =
    typeof requiredBladeHeartCount === 'string'
      ? requiredBladeHeartCount
      : `必要ブレードハート数: ${requiredBladeHeartCount}`

  return (
    <Flex direction="column" gap="8px">
      <ResetButton
        onReset={handleResetHeart}
        style={{
          marginLeft: 'auto',
          alignItems: 'center',
        }}
      />
      <Flex direction="column" gap="24px">
        <Summary
          icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
          label={bladeHeartDisplayMessage}
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        />
        <Box
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        >
          <Summary
            icon={<VscWand size="20px" />}
            label={`ライブに必要なハート数: ${requiredLiveHeartCount}`}
            style={{
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Required Live Heart"
            endNumber={40}
            onChangeValue={handleRequiredLiveHeartCount}
            startNumber={0}
            value={requiredLiveHeartCount}
          />
        </Box>
        <Box
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        >
          <Summary
            icon={<BsPersonHearts size="20px" />}
            label={`メンバーのハート合計数: ${memberHeartCount}`}
            style={{
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Member Heart"
            endNumber={40}
            onChangeValue={handleChangeMemberHeartCount}
            startNumber={0}
            value={memberHeartCount}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

/**
 * ハート管理ページのメインコンポーネント
 */
export default function HeartManagerPage() {
  // カラフルハート管理のフック
  const [colorfulHeartState, setColorfulHeartState] = useState(() =>
    ColorfulHeartService.createInitialState()
  )

  const colorfulHeartSummary = useMemo(
    () => ColorfulHeartService.calculateSummary(colorfulHeartState),
    [colorfulHeartState]
  )

  const handleIncrementRequiredLiveHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.incrementRequiredLiveHeart(prev, colorValue)
    )
  }, [])

  const handleDecrementRequiredLiveHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.decrementRequiredLiveHeart(prev, colorValue)
    )
  }, [])

  const handleIncrementMemberHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.incrementMemberHeart(prev, colorValue)
    )
  }, [])

  const handleDecrementMemberHeart = useCallback((colorValue: string) => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.decrementMemberHeart(prev, colorValue)
    )
  }, [])

  const handleResetAllHeartCounts = useCallback(() => {
    setColorfulHeartState((prev) =>
      ColorfulHeartService.resetAllHeartCounts(prev)
    )
  }, [])

  const handleChangeRequiredLiveHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) =>
        ColorfulHeartService.updateRequiredLiveHeartVisibility(
          prev,
          visibleColors
        )
      )
    },
    []
  )

  const handleChangeMemberHeartVisibility = useCallback(
    (visibleColors: MemberHeartColor[]) => {
      setColorfulHeartState((prev) =>
        ColorfulHeartService.updateMemberHeartVisibility(prev, visibleColors)
      )
    },
    []
  )

  // モノクロハート管理のフック
  const [monochromeHeartState, setMonochromeHeartState] = useState(() =>
    MonochromeHeartService.createInitialState()
  )

  const monochromeHeartSummary = useMemo(
    () => MonochromeHeartService.calculateSummary(monochromeHeartState),
    [monochromeHeartState]
  )

  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setMonochromeHeartState((prev) => ({ ...prev, memberHeartCount: count }))
  }, [])

  const handleRequiredLiveHeartCount = useCallback((count: number) => {
    setMonochromeHeartState((prev) => ({
      ...prev,
      requiredLiveHeartCount: count,
    }))
  }, [])

  const handleResetHeart = useCallback(() => {
    setMonochromeHeartState(MonochromeHeartService.createInitialState())
  }, [])

  // カラフルハートのデータ取得
  const { requiredLiveHearts, memberHearts } = colorfulHeartState
  return (
    <Tabs.Root
      className="TabsRoot"
      defaultValue="tab1"
      style={{ maxWidth: '668px' }}
    >
      <Tabs.List aria-label="Manage your account" className="TabsList">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          ハート色別計算
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          ハート合計数
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="TabsContent"
        style={{
          padding: '8px',
        }}
        value="tab1"
      >
        <ColorfulHeartManager
          handleChangeMemberHeartVisibility={handleChangeMemberHeartVisibility}
          handleChangeRequiredLiveHeartVisibility={
            handleChangeRequiredLiveHeartVisibility
          }
          handleDecrementMemberHeart={handleDecrementMemberHeart}
          handleDecrementRequiredLiveHeart={handleDecrementRequiredLiveHeart}
          handleIncrementMemberHeart={handleIncrementMemberHeart}
          handleIncrementRequiredLiveHeart={handleIncrementRequiredLiveHeart}
          handleResetAllHeartCounts={handleResetAllHeartCounts}
          liveResultMessage={colorfulHeartSummary.liveResultMessage}
          memberHeartColorList={colorfulHeartSummary.memberHeartColors}
          memberHeartCount={colorfulHeartSummary.memberHeartCount}
          memberHearts={memberHearts}
          requiredBladeHearts={colorfulHeartSummary.requiredBladeHearts}
          requiredLiveHeartColorList={
            colorfulHeartSummary.requiredLiveHeartColors
          }
          requiredLiveHeartCount={colorfulHeartSummary.requiredLiveHeartCount}
          requiredLiveHearts={requiredLiveHearts}
        />
      </Tabs.Content>
      <Tabs.Content
        className="TabsContent"
        style={{
          padding: '8px',
        }}
        value="tab2"
      >
        <MonochromeHeartManager
          handleChangeMemberHeartCount={handleChangeMemberHeartCount}
          handleRequiredLiveHeartCount={handleRequiredLiveHeartCount}
          handleResetHeart={handleResetHeart}
          isLiveSuccess={monochromeHeartSummary.isLiveSuccess}
          memberHeartCount={monochromeHeartSummary.memberHeartCount}
          requiredBladeHeartCount={
            monochromeHeartSummary.requiredBladeHeartCount
          }
          requiredLiveHeartCount={monochromeHeartSummary.requiredLiveHeartCount}
        />
      </Tabs.Content>
    </Tabs.Root>
  )
}
