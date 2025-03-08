'use client'

import React from 'react'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Heart, RotateCcw, Theater, UsersRound } from 'lucide-react'
import { HeartIcon } from '@atoms/HeartIcon'
import { HeartCounter } from '@molecules/HeartCounter'
import {
  calculateHeartCount,
  REQUIRED_LIVE_HEART_COLORS,
  MEMBER_HEART_COLORS,
  useColorfulManager,
} from '@organism/ColorfulManager/ColorfulManager.hooks'
import { colors } from '@constants/colors'
import { HeartSummary } from '@atoms/HeartSummary'

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

  return (
    <Flex direction="column" gap="8px">
      <Box>
        <Button
          color="red"
          onClick={handleResetHeart}
          radius="large"
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RotateCcw size="16px" />
          リセット
        </Button>
        <HeartSummary
          // NOTE: 以下の2つを出しわけたいため条件式を記述している
          // ・ライブが実行されないことによる必要ブレードハートはなし(0と表示)
          // ・ライブに必要なハートが揃ったことによる必要ブレードハートなし(ライブ成功と表示)
          count={
            requiredLiveHeartCount > 0 && requiredBladeHeartCount === 0
              ? 'ライブ成功'
              : requiredBladeHeartCount
          }
          icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
          label="必要ブレードハート数:"
        />
        <Flex {...HEART_COUNTER_STYLE} gap="0px 32px" mb="16px">
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
      <HeartSummary
        count={requiredLiveHeartCount}
        icon={<Theater size="20px" />}
        label="ライブ成功必要ハート数:"
        style={{
          marginBottom: '4px',
        }}
      />
      <Flex {...HEART_COUNTER_STYLE} mb="16px">
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
      <HeartSummary
        count={memberHeartCount}
        icon={<UsersRound size="20px" />}
        label="メンバーのハート合計数:"
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
