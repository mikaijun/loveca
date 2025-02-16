import React, { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { HeartIcon } from '@atoms/HeartIcon'

export const HeartCounter: React.FC = () => {
  const [count, setCount] = useState(0)

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const increment = () => {
    if (count < 99) {
      setCount(count + 1)
    }
  }

  return (
    <Flex align="center" direction="column" gap="8px" justify="center">
      <Text as="p" size="5" weight="bold">
        {count}
      </Text>
      <Flex align="center" gap="4px">
        <CircleMinus
          data-testid="circle-minus"
          onClick={decrement}
          size="28px"
        />
        <HeartIcon color="red" />
        <CirclePlus data-testid="circle-plus" onClick={increment} size="28px" />
      </Flex>
    </Flex>
  )
}
