import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { LiveCalculatorPage } from './LiveCalculatorPage'

export default {
  title: 'Pages/LiveCalculatorPage',
  component: LiveCalculatorPage,
} as Meta<typeof LiveCalculatorPage>

export const Default: StoryObj<typeof LiveCalculatorPage> = {
  render: () => (
    <Container p="8px" size="2">
      <LiveCalculatorPage />
    </Container>
  ),
}
