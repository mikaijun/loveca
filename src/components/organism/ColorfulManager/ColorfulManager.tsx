'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'
import { HeartIcon } from '@atoms/HeartIcon'
import { HeartCounter } from '@molecules/HeartCounter'
import {
  calculateHeartCount,
  REQUIRED_LIVE_HEART_COLORS,
  MEMBER_HEART_COLORS,
  useColorfulManager,
} from '@organism/ColorfulManager/ColorfulManager.hooks'
import { colors } from '@constants/colors'
import { Summary } from '@atoms/Summary'
import { ResetButton } from '@atoms/ResetButton'

const HEART_COUNTER_STYLE = {
  gap: '0px 16px',
  style: {
    backgroundColor: colors.blue[2],
    borderRadius: '4px',
    padding: '4px',
  },
  wrap: 'wrap' as const,
}

export const ColorfulManager: React.FC = () => {
  const {
    requiredLiveHearts,
    memberHearts,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    handleResetHeart,
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
        <ResetButton
          onReset={handleResetHeart}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <Summary
          icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
          label={requiredBladeHeartMessage}
        />
        <Flex {...HEART_COUNTER_STYLE} gap="0px 32px" mb="4px">
          {REQUIRED_LIVE_HEART_COLORS.map((color) => (
            <Flex align="center" key={color} width="64px">
              <HeartIcon color={color} />
              <Text size="3" weight="bold">
                {/* NOTE: 以下の2つを出しわけたいため条件式を記述している
                ・ライブに必要のないハート色(0と表示)
                ・ライブに必要なハート色が存在していて、メンバーのハートで足りている場合(達成と表示)*/}
                {requiredLiveHearts[color] > 0 &&
                requiredBladeHeart[color] === 0
                  ? '達成'
                  : requiredBladeHeart[color]}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Summary
        icon={<VscWand size="20px" />}
        label={`ライブ成功必要ハート数: ${requiredLiveHeartCount}`}
        style={{
          marginBottom: '4px',
        }}
      />
      <Flex {...HEART_COUNTER_STYLE} mb="4px">
        {REQUIRED_LIVE_HEART_COLORS.map((color) => (
          <HeartCounter
            color={color}
            count={requiredLiveHearts[color]}
            key={color}
            onDecrement={handleDecrementRequiredLiveHeart}
            onIncrement={handleIncrementRequiredLiveHeart}
          />
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
        {MEMBER_HEART_COLORS.map((color) => (
          <HeartCounter
            color={color}
            count={memberHearts[color]}
            key={color}
            onDecrement={handleDecrementMemberHeart}
            onIncrement={handleIncrementMemberHeart}
          />
        ))}
      </Flex>
      <Text as="p" color="gray" mt="8px" size="1">
        ※ALLハート持ちメンバーは好きな色を選択してください
      </Text>
    </Flex>
  )
}
