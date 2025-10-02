'use client'

import React from 'react'
import { Tabs, Flex, Box } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'

import { useHeartManager } from './HeartManagerPage.hooks'
import { ColorfulHeartState } from '@domain/services/colorfulHeartService'
import {
  getHeartStateByColor,
  getTotalEffectiveCount,
} from '@domain/entities/heart/collection'
import {
  allLiveHeartColors,
  allMemberHeartColors,
} from '@domain/valueObjects/heartColor'
import { getEffectiveCount, getDisplayCount } from '@domain/entities/heart'
import { MemberHeartColor } from '@domain/valueObjects/heartColor'
import { HeartColorSettingsModal } from '@components/ui/HeartColorSettingsModal'
import { HeartCounter } from '@components/ui/HeartCounter'
import { HeartIcon } from '@components/ui/HeartIcon'
import { ResetButton } from '@components/commons/ui/ResetButton'
import { Summary } from '@components/commons/ui/Summary'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import { colors } from '@constants/colors'
import {
  calculateAllRequiredBladeHearts,
  HeartCollection,
} from '@domain/entities/heart/collection'
import { getVisibleColorNames } from '@domain/entities/heart/collection'
import { calculateTotalRequiredBladeHearts } from '@domain/entities/heart/collection'

import './HeartManagerPage.css'

interface ColorfulHeartManagerProps {
  requiredLiveHearts: ColorfulHeartState['requiredLiveHearts']
  memberHearts: ColorfulHeartState['memberHearts']
  requiredLiveHeartCount: number
  memberHeartCount: number
  requiredBladeHearts: HeartCollection
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
  const totalRequiredBladeHearts =
    getTotalEffectiveCount(requiredLiveHearts) === 0
      ? 0
      : calculateTotalRequiredBladeHearts(requiredLiveHearts, memberHearts)

  const liveResultMessage = totalRequiredBladeHearts
    ? `必要ブレードハート数: ${totalRequiredBladeHearts}`
    : 'ライブ成功'

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

      <div className="HeartCounterGroup">
        {allLiveHeartColors.map((color) => {
          const colorValue = color
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

      <div className="HeartCounterGroup">
        {allLiveHeartColors.map((color) => {
          const colorValue = color
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

      <div className="HeartCounterGroup">
        {allMemberHeartColors.map((color) => {
          const colorValue = color
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

export default function HeartManagerPage() {
  const { colorful, monochrome } = useHeartManager()

  const { requiredLiveHearts, memberHearts } = colorful.colorfulHeartState
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
          handleChangeMemberHeartVisibility={
            colorful.handleChangeMemberHeartVisibility
          }
          handleChangeRequiredLiveHeartVisibility={
            colorful.handleChangeRequiredLiveHeartVisibility
          }
          handleDecrementMemberHeart={colorful.handleDecrementMemberHeart}
          handleDecrementRequiredLiveHeart={
            colorful.handleDecrementRequiredLiveHeart
          }
          handleIncrementMemberHeart={colorful.handleIncrementMemberHeart}
          handleIncrementRequiredLiveHeart={
            colorful.handleIncrementRequiredLiveHeart
          }
          handleResetAllHeartCounts={colorful.handleResetAllHeartCounts}
          memberHeartColorList={getVisibleColorNames(
            colorful.colorfulHeartState.memberHearts
          )}
          memberHeartCount={getTotalEffectiveCount(
            colorful.colorfulHeartState.memberHearts
          )}
          memberHearts={memberHearts}
          requiredBladeHearts={calculateAllRequiredBladeHearts(
            colorful.colorfulHeartState.requiredLiveHearts,
            memberHearts
          )}
          requiredLiveHeartColorList={getVisibleColorNames(
            colorful.colorfulHeartState.requiredLiveHearts
          )}
          requiredLiveHeartCount={getTotalEffectiveCount(
            colorful.colorfulHeartState.requiredLiveHearts
          )}
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
          handleChangeMemberHeartCount={monochrome.handleChangeMemberHeartCount}
          handleRequiredLiveHeartCount={monochrome.handleRequiredLiveHeartCount}
          handleResetHeart={monochrome.handleResetHeart}
          isLiveSuccess={monochrome.monochromeHeartSummary.isLiveSuccess}
          memberHeartCount={monochrome.monochromeHeartSummary.memberHeartCount}
          requiredBladeHeartCount={
            monochrome.monochromeHeartSummary.requiredBladeHeartCount
          }
          requiredLiveHeartCount={
            monochrome.monochromeHeartSummary.requiredLiveHeartCount
          }
        />
      </Tabs.Content>
    </Tabs.Root>
  )
}
