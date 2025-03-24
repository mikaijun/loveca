import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { MulliganCalculator } from './MulliganCalculator'

export default {
  title: 'Pages/MulliganCalculator',
  component: MulliganCalculator,
} as Meta<typeof MulliganCalculator>

export const Default: StoryObj<typeof MulliganCalculator> = {
  render: () => (
    <Container p="8px" size="2">
      <MulliganCalculator />
    </Container>
  ),
}
