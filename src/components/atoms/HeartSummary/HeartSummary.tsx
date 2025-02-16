import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

type HeartSummaryProps = {
  icon: React.ReactNode
  label: string
  count: number | 'ライブ成功'
}
export const HeartSummary: React.FC<HeartSummaryProps> = ({
  icon,
  label,
  count,
}) => (
  <Flex align="center" gap="8px">
    {icon}
    <Flex align="center" gap="8px">
      <Text size="2" weight="bold">
        {label}
      </Text>
      <Text size="6" weight="bold">
        {count}
      </Text>
    </Flex>
  </Flex>
)
