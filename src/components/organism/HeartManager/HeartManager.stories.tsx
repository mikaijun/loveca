import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { HeartManager } from '@organism/HeartManager'

export default {
  title: 'Organisms/HeartManager',
  component: HeartManager,
} as Meta<typeof HeartManager>

export const Default: StoryObj<typeof HeartManager> = {
  render: () => <HeartManager />,
}
