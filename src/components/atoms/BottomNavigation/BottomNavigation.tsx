'use client'

import * as React from 'react'
import { Calculator, Heart, Theater } from 'lucide-react'
import Link from 'next/link'
import './BottomNavigation.css'
import { Box } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
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
    icon: Theater,
    path: '/live',
  },
  {
    value: 'mulligan',
    label: 'マリガン計算',
    icon: Calculator,
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
                size={24}
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
