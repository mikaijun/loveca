import React, { useCallback } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { HeartIcon } from '@features/heart/HeartIcon'
import { colors } from '@constants/colors'
import { HeartIconProps } from '@constants/hearts'

type HeartCounterProps = HeartIconProps & {
  count: number
  onDecrement: (color: HeartIconProps['color']) => void
  onIncrement: (color: HeartIconProps['color']) => void
}

export const HeartCounter: React.FC<HeartCounterProps> = ({
  count,
  color,
  onDecrement,
  onIncrement,
}) => {
  const handleDecrement = useCallback(() => {
    if (count > 0) {
      onDecrement(color)
    }
  }, [count, color, onDecrement])

  const handleIncrement = useCallback(() => {
    if (count < 99) {
      onIncrement(color)
    }
  }, [count, color, onIncrement])

  return (
    <Flex align="center" direction="column" justify="center">
      <Text as="p" size="5" weight="bold">
        {count}
      </Text>
      <Flex align="center">
        <CircleMinus
          color={count === 0 ? colors.sage[5] : colors.black}
          data-testid="circle-minus"
          onClick={handleDecrement}
          size="32px"
        />
        <HeartIcon color={color} />
        <CirclePlus
          color={count >= 99 ? colors.sage[5] : colors.black}
          data-testid="circle-plus"
          onClick={handleIncrement}
          size="32px"
        />
      </Flex>
    </Flex>
  )
}
