import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { MulliganCalculatorPage } from '.'

export default {
  component: MulliganCalculatorPage,
} as Meta<typeof MulliganCalculatorPage>

export const Default: StoryObj<typeof MulliganCalculatorPage> = {
  render: () => (
    <Container p="8px" size="2">
      <MulliganCalculatorPage />
    </Container>
  ),
}
