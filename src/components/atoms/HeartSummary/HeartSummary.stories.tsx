import type { Meta, StoryObj } from '@storybook/react'
import { Megaphone } from 'lucide-react'
import { HeartSummary } from './HeartSummary'

const meta: Meta<typeof HeartSummary> = {
  title: 'Atoms/HeartSummary',
  component: HeartSummary,
  argTypes: {
    icon: {
      control: 'object',
    },
    label: {
      control: 'text',
    },
    count: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof HeartSummary>

export const Default: Story = {
  args: {
    icon: <Megaphone />,
    label: '必要ブレードハート数',
    count: 12,
  },
}
