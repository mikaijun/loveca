'use client'

import * as React from 'react'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import './BottomNavigation.css'
import { Box } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import { BsCalculator } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'
import { colors } from '@constants/colors'

const tabs = [
  {
    value: 'heart',
    label: 'ハート管理',
    icon: Heart,
    path: '/',
  },
  {
    value: 'live',
    label: 'ライブ成功率',
    icon: VscWand,
    path: '/live',
  },
  {
    value: 'mulligan',
    label: 'マリガン計算',
    icon: BsCalculator,
    path: '/mulligan',
  },
]

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname()
  return (
    <Box className="bottom-navigation">
      <Box className="tabs-list">
        {tabs.map((tab) => (
          <Box className="tab-item" key={tab.value}>
            <Link className="tab-link" href={tab.path}>
              <tab.icon
                color={
                  pathname === tab.path ? colors.blue[8] : colors.slate[11]
                }
                data-testid={tab.value}
                size={20}
              />
              <span
                style={{
                  fontWeight: pathname === tab.path ? 'bold' : 'normal',
                  color:
                    pathname === tab.path ? colors.blue[8] : colors.slate[11],
                }}
              >
                {tab.label}
              </span>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
