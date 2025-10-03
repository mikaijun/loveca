import type { Meta, StoryObj } from '@storybook/react'
import { ResetButton } from './ResetButton'

const meta: Meta<typeof ResetButton> = {
  component: ResetButton,
}

export default meta
type Story = StoryObj<typeof ResetButton>

export const Default: Story = {
  args: {
    onReset: () => alert('リセットが実行されました！'),
  },
}
