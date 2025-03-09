import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { MulliganCalculator } from './MulliganCalculator'

export default {
  title: 'Organisms/MulliganCalculator',
  component: MulliganCalculator,
} as Meta<typeof MulliganCalculator>

export const Default: StoryObj<typeof MulliganCalculator> = {
  render: () => <MulliganCalculator />,
}
