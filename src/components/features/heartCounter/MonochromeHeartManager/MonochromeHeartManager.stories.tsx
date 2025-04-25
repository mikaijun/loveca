import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { MonochromeManager } from './MonochromeHeartManager'

export default {
  title: 'Organisms/MonochromeManager',
  component: MonochromeManager,
} as Meta<typeof MonochromeManager>

export const Default: StoryObj<typeof MonochromeManager> = {
  render: () => (
    <Container p="8px" size="2">
      <MonochromeManager />
    </Container>
  ),
}
