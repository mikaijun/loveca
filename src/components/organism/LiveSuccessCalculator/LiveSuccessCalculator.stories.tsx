import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { LiveSuccessCalculator } from './LiveSuccessCalculator'

export default {
  title: 'Organisms/LiveSuccessCalculator',
  component: LiveSuccessCalculator,
} as Meta<typeof LiveSuccessCalculator>

export const Default: StoryObj<typeof LiveSuccessCalculator> = {
  render: () => <LiveSuccessCalculator />,
}
