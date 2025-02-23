import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { MonochromeManager } from './MonochromeManager'

export default {
  title: 'Organisms/MonochromeManager',
  component: MonochromeManager,
} as Meta<typeof MonochromeManager>

export const Default: StoryObj<typeof MonochromeManager> = {
  render: () => <MonochromeManager />,
}
