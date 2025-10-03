import type { Meta, StoryObj } from '@storybook/react'
import { CalculationMethodModal } from './CalculationMethodModal'

const meta: Meta<typeof CalculationMethodModal> = {
  component: CalculationMethodModal,
}

export default meta
type Story = StoryObj<typeof CalculationMethodModal>

export const Default: Story = {
  args: {},
}
