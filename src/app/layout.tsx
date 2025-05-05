import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@radix-ui/themes/styles.css'
import { ClientLayout } from './ClientLayout'

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
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}
