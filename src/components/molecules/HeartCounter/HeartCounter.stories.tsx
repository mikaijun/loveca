import { Meta, StoryObj } from '@storybook/react'
import { HeartCounter } from './HeartCounter'

const meta: Meta<typeof HeartCounter> = {
  title: 'Molecules/HeartCounter',
  component: HeartCounter,
}

export default meta

type Story = StoryObj<typeof HeartCounter>

export const Default: Story = {
  args: {},
}
