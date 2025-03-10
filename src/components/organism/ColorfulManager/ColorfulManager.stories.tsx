import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { ColorfulManager } from '@organism/ColorfulManager'

export default {
  title: 'Organisms/ColorfulManager',
  component: ColorfulManager,
} as Meta<typeof ColorfulManager>

export const Default: StoryObj<typeof ColorfulManager> = {
  render: () => (
    <Container p="8px" size="2">
      <ColorfulManager />
    </Container>
  ),
}
