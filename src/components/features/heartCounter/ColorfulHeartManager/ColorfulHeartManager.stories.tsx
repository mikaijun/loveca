import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { ColorfulHeartManager } from '@components/features/heartCounter/ColorfulHeartManager'

export default {
  component: ColorfulHeartManager,
} as Meta<typeof ColorfulHeartManager>

export const Default: StoryObj<typeof ColorfulHeartManager> = {
  render: () => (
    <Container p="8px" size="2">
      <ColorfulHeartManager />
    </Container>
  ),
}
