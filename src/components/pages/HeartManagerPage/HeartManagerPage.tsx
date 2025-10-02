'use client'

import React from 'react'
import { Tabs, Flex, Box } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'

import { useHeartManager } from './HeartManagerPage.hooks'
import {
  getHeartStateByColor,
  getTotalEffectiveCount,
  calculateAllRequiredBladeHearts,
  getVisibleColorNames,
} from '@domain/entities/heart/collection'
import {
  allLiveHeartColors,
  allMemberHeartColors,
} from '@domain/valueObjects/heartColor'
import { getEffectiveCount, getDisplayCount } from '@domain/entities/heart'
import { HeartColorSettingsModal } from '@components/ui/HeartColorSettingsModal'
import { HeartCounter } from '@components/ui/HeartCounter'
import { HeartIcon } from '@components/ui/HeartIcon'
import { ResetButton } from '@components/commons/ui/ResetButton'
import { Summary } from '@components/commons/ui/Summary'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import { colors } from '@constants/colors'

import './HeartManagerPage.css'

export default function HeartManagerPage() {
  const { colorful, monochrome } = useHeartManager()

  const { requiredLiveHearts, memberHearts } = colorful.colorfulHeartState

  const requiredLiveHeartCount = getTotalEffectiveCount(requiredLiveHearts)
  const memberHeartCount = getTotalEffectiveCount(memberHearts)
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
              onChangeMemberHeartColor={
                colorful.handleChangeMemberHeartVisibility
              }
              onChangeRequiredLiveHeartColor={
                colorful.handleChangeRequiredLiveHeartVisibility
              }
              requiredLiveHeartColorList={requiredLiveHeartColorList}
            />
            <ResetButton
              onReset={colorful.handleResetAllHeartCounts}
              text="カウントリセット"
            />
          </div>

          <Summary
            icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
            label={colorful.liveResultMessage}
          />

          <div className="HeartCounterGroup">
            {allLiveHeartColors.map((color) => {
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
                  onDecrement={colorful.handleDecrementRequiredLiveHeart}
                  onIncrement={colorful.handleIncrementRequiredLiveHeart}
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
                  onDecrement={colorful.handleDecrementMemberHeart}
                  onIncrement={colorful.handleIncrementMemberHeart}
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
        {/* MonochromeHeartManager の内容 */}
        <Flex direction="column" gap="8px">
          <ResetButton
            onReset={monochrome.handleResetHeart}
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
              label={monochrome.bladeHeartDisplayMessage}
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
                label={`ライブに必要なハート数: ${monochrome.requiredLiveHeartCount}`}
                style={{
                  marginBottom: '4px',
                }}
              />
              <NumberSelect
                ariaLabel="Required Live Heart"
                endNumber={40}
                onChangeValue={monochrome.handleRequiredLiveHeartCount}
                startNumber={0}
                value={monochrome.requiredLiveHeartCount}
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
                label={`メンバーのハート合計数: ${monochrome.memberHeartCount}`}
                style={{
                  marginBottom: '4px',
                }}
              />
              <NumberSelect
                ariaLabel="Member Heart"
                endNumber={40}
                onChangeValue={monochrome.handleChangeMemberHeartCount}
                startNumber={0}
                value={monochrome.memberHeartCount}
              />
            </Box>
          </Flex>
        </Flex>
      </Tabs.Content>
    </Tabs.Root>
  )
}
