import type { Metadata } from 'next'
import { Box, Theme, Text, Container } from '@radix-ui/themes'
import { Analytics } from '@vercel/analytics/next'
import '@radix-ui/themes/styles.css'
import { BottomNavigation } from '@components/features/navigation/BottomNavigation'
import { colors } from '@constants/colors'

export const metadata: Metadata = {
  title: 'ラブカリキュレーター',
  description:
    'ラブカのカードゲームにおけるハート管理、ライブ成功率、マリガン計算を行うためのツールです。',
  openGraph: {
    title: 'ラブカリキュレーター',
    description:
      'ラブカのカードゲームにおけるハート管理、ライブ成功率、マリガン計算を行うためのツールです。',
    images: [
      {
        url: '/ogp.png',
        width: 600,
        height: 600,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body style={{ margin: '0px', padding: '0px' }}>
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
        <Analytics />
      </body>
    </html>
  )
}
