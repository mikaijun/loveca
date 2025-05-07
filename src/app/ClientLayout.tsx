'use client'

import { Box, Theme, Text, Container, Flex } from '@radix-ui/themes'
import { FaHeartCircleCheck } from 'react-icons/fa6'
import { BottomNavigation } from '@components/commons/ui/BottomNavigation'
import { colors } from '@constants/colors'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      <Box
        style={{
          background: `linear-gradient(135deg, ${colors.blue[9]}, ${colors.blue[8]})`,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container size="2">
          <Flex
            align="center"
            height="56px"
            justify="between"
            style={{
              padding: '0 16px',
            }}
          >
            <Flex align="center" gap="2">
              <FaHeartCircleCheck color={colors.white} size="28px" />
              <Text size="5" style={{ color: colors.white }} weight="bold">
                ラブカリキュレーター
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container p="8px" pb="44px" size="2">
        {children}
      </Container>
      <BottomNavigation />
    </Theme>
  )
}
