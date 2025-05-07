import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '600px',
          height: '400px',
          margin: '2rem',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  args: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    lineData: [25, 40, 35, 60, 80, 55],
    xText: 'Month',
    yText: 'Growth (%)',
    yMin: 0,
    height: 400,
    padding: {
      top: 0,
      bottom: 0,
    },
  },
}
