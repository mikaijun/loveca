import type { Meta, StoryObj } from '@storybook/react'
import { Megaphone } from 'lucide-react'
import { Summary } from './Summary'

const meta: Meta<typeof Summary> = {
  component: Summary,
  argTypes: {
    icon: {
      control: 'object',
    },
    label: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Summary>

export const Default: Story = {
  args: {
    icon: <Megaphone />,
    label: '必要ブレードハート数: 12',
  },
}
