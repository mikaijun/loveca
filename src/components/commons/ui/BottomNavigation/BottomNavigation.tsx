'use client'

import * as React from 'react'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import './BottomNavigation.css'
import { Box } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import { BsCalculator } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'

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
    <Box className="BottomNavigation">
      {tabs.map((tab) => (
        <Link
          className={`NavigationItem ${pathname === tab.path ? 'active' : ''}`}
          href={tab.path}
          key={tab.value}
        >
          <tab.icon className="NavigationIcon" size={24} />
          <span>{tab.label}</span>
        </Link>
      ))}
    </Box>
  )
}
