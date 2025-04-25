'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'
import {
  calculateHeartCount,
  useColorfulManager,
} from './ColorfulHeartManager.hooks'
import { Summary } from '@components/commons/Summary'
import { ResetButton } from '@components/commons/ResetButton'
import { HeartIcon } from '@components/features/heartCounter/HeartIcon'
import { HeartCounter } from '@components/features/heartCounter/HeartCounter'
import { HeartColorSettingsModal } from '@components/features/heartCounter/HeartColorSettingsModal'
import { memberHeartColors, requiredLiveHeartColors } from '@constants/hearts'
import { colors } from '@constants/colors'

const HEART_COUNTER_STYLE = {
  gap: '0px 16px',
  style: {
    backgroundColor: colors.blue[2],
    borderRadius: '4px',
    padding: '4px',
  },
  wrap: 'wrap' as const,
}

export const ColorfulHeartManager: React.FC = () => {
  const {
    requiredLiveHearts,
    memberHearts,
    requiredLiveHeartColorList,
    memberHeartColorList,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetCount,
    handleChangeVisibilityRequiredLiveHeart,
    handleChangeVisibilityMemberHeart,
  } = useColorfulManager()

  const {
    requiredLiveHeartCount,
    memberHeartCount,
    requiredBladeHeart,
    requiredBladeHeartCount,
  } = calculateHeartCount({
    requiredLiveHearts,
    memberHearts,
  })

  // NOTE: 以下の2つを出しわけたいため条件式を記述している
  // ・ライブが実行されないことによる必要ブレードハートはなし(0と表示)
  // ・ライブに必要なハートが揃ったことによる必要ブレードハートなし(ライブ成功と表示)
  const requiredBladeHeartMessage =
    requiredLiveHeartCount > 0 && requiredBladeHeartCount === 0
      ? 'ライブ成功'
      : `必要ブレードハート数: ${requiredBladeHeartCount}`

  return (
    <Flex direction="column">
      <Box>
        <Flex justify="between" mb="8px" mt="8px">
          <HeartColorSettingsModal
            memberHeartColorList={memberHeartColorList}
            onChangeMemberHeartColor={handleChangeVisibilityMemberHeart}
            onChangeRequiredLiveHeartColor={
              handleChangeVisibilityRequiredLiveHeart
            }
            requiredLiveHeartColorList={requiredLiveHeartColorList}
          />
          <ResetButton
            onReset={handleResetCount}
            style={{ fontSize: '12px' }}
            text="カウントリセット"
          />
        </Flex>
        <Summary
          icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
          label={requiredBladeHeartMessage}
        />
        <Flex {...HEART_COUNTER_STYLE} gap="0px 32px" mb="4px">
          {requiredLiveHeartColors.map((color) => (
            <React.Fragment key={color}>
              {requiredLiveHearts[color].isVisible && (
                <Flex align="center" key={color} width="64px">
                  <HeartIcon color={color} />
                  <Text size="3" weight="bold">
                    {/* NOTE: 以下の2つを出しわけたいため条件式を記述している
                ・ライブに必要のないハート色(0と表示)
                ・ライブに必要なハート色が存在していて、メンバーのハートで足りている場合(達成と表示)*/}
                    {requiredLiveHearts[color].count > 0 &&
                    requiredBladeHeart[color].count === 0
                      ? '達成'
                      : requiredBladeHeart[color].count}
                  </Text>
                </Flex>
              )}
            </React.Fragment>
          ))}
        </Flex>
      </Box>
      <Summary
        icon={<VscWand size="20px" />}
        label={`ライブに必要なハート数: ${requiredLiveHeartCount}`}
        style={{
          marginBottom: '4px',
        }}
      />
      <Flex {...HEART_COUNTER_STYLE} mb="4px">
        {requiredLiveHeartColors.map((color) => (
          <React.Fragment key={color}>
            {requiredLiveHearts[color].isVisible && (
              <HeartCounter
                color={color}
                count={requiredLiveHearts[color].count}
                key={color}
                onDecrement={handleDecrementRequiredLiveHeart}
                onIncrement={handleIncrementRequiredLiveHeart}
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
      <Summary
        icon={<BsPersonHearts size="20px" />}
        label={`メンバーのハート合計数: ${memberHeartCount}`}
        style={{
          marginBottom: '4px',
        }}
      />
      <Flex {...HEART_COUNTER_STYLE}>
        {memberHeartColors.map((color) => (
          <React.Fragment key={color}>
            {memberHearts[color].isVisible && (
              <HeartCounter
                color={color}
                count={memberHearts[color].count}
                key={color}
                onDecrement={handleDecrementMemberHeart}
                onIncrement={handleIncrementMemberHeart}
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
      <Text as="p" color="gray" mt="8px" size="1">
        ※ALLハート持ちメンバーは好きな色を選択してください
      </Text>
    </Flex>
  )
}
