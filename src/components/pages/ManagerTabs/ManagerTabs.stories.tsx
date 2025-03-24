import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ManagerTabs } from './ManagerTabs'

export default {
  title: 'Pages/ManagerTabs',
  component: ManagerTabs,
} as Meta<typeof ManagerTabs>

export const Default: StoryObj<typeof ManagerTabs> = {
  render: () => <ManagerTabs />,
}
