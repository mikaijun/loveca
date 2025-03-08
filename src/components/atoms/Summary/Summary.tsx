import React from 'react'
import { Flex, FlexProps, Text } from '@radix-ui/themes'

type SummaryProps = FlexProps & {
  icon: React.ReactNode
  label: string
}
export const Summary: React.FC<SummaryProps> = ({ icon, label, ...props }) => (
  <Flex align="center" gap="8px" {...props}>
    {icon}
    <Flex align="center" gap="8px">
      <Text size="4" weight="bold">
        {label}
      </Text>
    </Flex>
  </Flex>
)
