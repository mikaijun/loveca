import type { Meta, StoryObj } from '@storybook/react'
import { HeartIcon } from './HeartIcon'

const meta: Meta<typeof HeartIcon> = {
  component: HeartIcon,
  argTypes: {
    color: {
      control: 'select',
      options: ['pink', 'green', 'blue', 'red', 'yellow', 'purple', 'gray'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HeartIcon>

export const Pink: Story = {
  args: {
    color: 'pink',
  },
}

export const Green: Story = {
  args: {
    color: 'green',
  },
}

export const Blue: Story = {
  args: {
    color: 'blue',
  },
}

export const Red: Story = {
  args: {
    color: 'red',
  },
}

export const Yellow: Story = {
  args: {
    color: 'yellow',
  },
}

export const Purple: Story = {
  args: {
    color: 'purple',
  },
}

export const Gray: Story = {
  args: {
    color: 'gray',
  },
}
