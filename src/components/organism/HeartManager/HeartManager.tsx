import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { HeartIconProps } from '@atoms/HeartIcon'
import { HeartCounter } from '@molecules/HeartCounter'
import { useHeartManager } from '@organism/HeartManager/HeartManager.hooks'

type StageHeartColor = Exclude<HeartIconProps['color'], 'gray'>

const REQUIRED_HEART_COLORS: HeartIconProps['color'][] = [
  'pink',
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
  'gray',
]

const STAGE_HEART_COLORS: StageHeartColor[] = REQUIRED_HEART_COLORS.filter(
  (color): color is StageHeartColor => color !== 'gray'
)

export const HeartManager: React.FC = () => {
  const {
    requiredLiveHearts,
    liveHearts,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    handleIncrementStageHeart,
    handleDecrementStageHeart,
  } = useHeartManager()

  return (
    <Flex direction="column" gap="8px">
      <Text size="6" weight="bold">
        合計必要ハート数: 0
      </Text>
      <Text size="4" weight="bold">
        ライブに必要なハート数:
        {Object.values(requiredLiveHearts).reduce((acc, cur) => acc + cur, 0)}
      </Text>
      <Flex gap="12px" wrap="wrap">
        {REQUIRED_HEART_COLORS.map((color) => (
          <HeartCounter
            color={color}
            count={requiredLiveHearts[color]}
            key={color}
            onDecrement={handleDecrementRequiredLiveHeart}
            onIncrement={handleIncrementRequiredLiveHeart}
          />
        ))}
      </Flex>
      <Text size="4" weight="bold">
        ステージに存在するハート:
        {Object.values(liveHearts).reduce((acc, cur) => acc + cur, 0)}
      </Text>
      <Flex gap="12px" wrap="wrap">
        {STAGE_HEART_COLORS.map((color) => (
          <HeartCounter
            color={color}
            count={liveHearts[color]}
            key={color}
            onDecrement={handleDecrementStageHeart}
            onIncrement={handleIncrementStageHeart}
          />
        ))}
      </Flex>
    </Flex>
  )
}
