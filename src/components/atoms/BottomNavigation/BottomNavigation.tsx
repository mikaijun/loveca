import * as React from 'react'
import { Calculator, Heart, Theater } from 'lucide-react'
import Link from 'next/link'
import './BottomNavigation.css'
import { Box } from '@radix-ui/themes'

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
  return (
    <Box className="bottom-navigation">
      <Box className="tabs-list">
        {tabs.map((tab) => (
          <Box className="tab-item" key={tab.value}>
            <Link className="tab-link" href={tab.path}>
              <tab.icon data-testid={tab.value} size={24} />
              <span>{tab.label}</span>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
