'use client'

import { Box, Theme, Text, Container } from '@radix-ui/themes'
import { BottomNavigation } from '@components/features/common/BottomNavigation'
import { colors } from '@constants/colors'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      <Box
        height="44px"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.blue[9],
        }}
        width="100%"
      >
        <Text size="4" style={{ color: colors.white }} weight="bold">
          ラブカリキュレーター
        </Text>
      </Box>
      <Container p="8px" pb="44px" size="2">
        {children}
      </Container>
      <BottomNavigation />
    </Theme>
  )
}
