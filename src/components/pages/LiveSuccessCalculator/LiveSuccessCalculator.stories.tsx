import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { LiveSuccessCalculator } from './LiveSuccessCalculator'

export default {
  title: 'Pages/LiveSuccessCalculator',
  component: LiveSuccessCalculator,
} as Meta<typeof LiveSuccessCalculator>

export const Default: StoryObj<typeof LiveSuccessCalculator> = {
  render: () => (
    <Container p="8px" size="2">
      <LiveSuccessCalculator />
    </Container>
  ),
}
