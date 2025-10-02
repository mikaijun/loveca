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
        deckSize={60}
        kasumiCount={0}
        mulliganCount={3}
        renCount={0}
        wantCardCount={8}
      />
    </Container>
  ),
}
