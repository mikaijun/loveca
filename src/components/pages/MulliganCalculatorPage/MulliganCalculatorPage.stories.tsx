import type { Meta, StoryObj } from '@storybook/react'
import { MulliganCalculatorPage } from './MulliganCalculatorPage'

const meta = {
  component: MulliganCalculatorPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MulliganCalculatorPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
