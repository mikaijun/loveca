'use client'

import React from 'react'
import { Tabs, Flex, Box } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'

import {
  useColorfulHeartManager,
  useMonochromeHeartManager,
} from './HeartManagerPage.hooks'
import {
  getHeartStateByColor,
  getTotalEffectiveCount,
  calculateAllRequiredBladeHearts,
  getVisibleColorNames,
} from '@domain/entities/heart/collection'
import {
  liveHeartColors,
  allMemberHeartColors,
} from '@domain/valueObjects/heartColor/heartColor'
import { getEffectiveCount, getDisplayCount } from '@domain/entities/heart'
import { HeartColorSettingsModal } from '@components/ui/pages/HeartColorSettingsModal'
import { HeartCounter } from '@components/ui/pages/HeartCounter'
import { HeartIcon } from '@components/ui/pages/HeartIcon'
import { ResetButton } from '@components/ui/commons/ui/ResetButton'
import { Summary } from '@components/ui/commons/ui/Summary'
import { NumberSelect } from '@components/ui/commons/function/NumberSelect'
import { colors } from '@constants/colors'

import './HeartManagerPage.css'

export default function HeartManagerPage() {
  const {
    colorfulHeartState,
    liveResultMessage,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetAllHeartCounts,
    handleChangeRequiredLiveHeartVisibility,
    handleChangeMemberHeartVisibility,
  } = useColorfulHeartManager()

  const {
    memberHeartCount,
    requiredLiveHeartCount,
    bladeHeartDisplayMessage,
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,
  } = useMonochromeHeartManager()

  const { requiredLiveHearts, memberHearts } = colorfulHeartState

  const colorfulRequiredLiveHeartCount =
    getTotalEffectiveCount(requiredLiveHearts)
  const colorfulMemberHeartCount = getTotalEffectiveCount(memberHearts)
  const requiredBladeHearts = calculateAllRequiredBladeHearts(
    requiredLiveHearts,
    memberHearts
  )
  const requiredLiveHeartColorList = getVisibleColorNames(requiredLiveHearts)
  const memberHeartColorList = getVisibleColorNames(memberHearts)

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
            {liveHeartColors.map((color) => {
              const colorValue = color
              const requiredState = getHeartStateByColor(
                requiredLiveHearts,
                color
              )
              const bladeState = getHeartStateByColor(
                requiredBladeHearts,
                color
              )

              if (!requiredState || !requiredState.visibility) {
                return null
              }

              const requiredCount = getEffectiveCount(requiredState)
              const bladeCount = bladeState ? getEffectiveCount(bladeState) : 0

              return (
                <div className="HeartCounterItem" key={colorValue}>
                  <HeartIcon color={colorValue} />
                  <span className="HeartCounterValue">
                    {requiredCount > 0 && bladeCount === 0
                      ? '達成'
                      : bladeCount}
                  </span>
                </div>
              )
            })}
          </div>

          <Summary
            icon={<VscWand size="20px" />}
            label={`ライブに必要なハート数: ${colorfulRequiredLiveHeartCount}`}
          />

          <div className="HeartCounterGroup">
            {liveHeartColors.map((color) => {
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
            label={`メンバーのハート合計数: ${colorfulMemberHeartCount}`}
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
      </Tabs.Content>

      <Tabs.Content
        className="TabsContent"
        style={{
          padding: '8px',
        }}
        value="tab2"
      >
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
              icon={
                <Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />
              }
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
      </Tabs.Content>
    </Tabs.Root>
  )
}
