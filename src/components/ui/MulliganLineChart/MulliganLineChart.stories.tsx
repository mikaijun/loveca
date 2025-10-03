import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { MulliganLineChart } from './MulliganLineChart'

export default {
  component: MulliganLineChart,
} as Meta<typeof MulliganLineChart>

export const Default: StoryObj<typeof MulliganLineChart> = {
  render: () => (
    <Container p="8px" size="2">
      <MulliganLineChart
        probabilities={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      />
    </Container>
  ),
}
