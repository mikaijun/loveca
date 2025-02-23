import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ColorfulManager } from '@organism/ColorfulManager'

export default {
  title: 'Organisms/ColorfulManager',
  component: ColorfulManager,
} as Meta<typeof ColorfulManager>

export const Default: StoryObj<typeof ColorfulManager> = {
  render: () => <ColorfulManager />,
}
