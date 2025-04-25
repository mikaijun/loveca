import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { useCallback } from 'react'
import { HeartCounter } from './HeartCounter'

const meta: Meta<typeof HeartCounter> = {
  component: HeartCounter,
  args: {
    color: 'red',
  },
  argTypes: {
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof HeartCounter>

const createStory = (initialCount: number): Story => ({
  render: (args) => {
    const [count, setCount] = useState(initialCount)
    const handleDecrement = useCallback(() => {
      setCount((prev) => Math.max(prev - 1, 0))
    }, [])
    const handleIncrement = useCallback(() => {
      setCount((prev) => Math.min(prev + 1, 99))
    }, [])

    return (
      <HeartCounter
        {...args}
        count={count}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
    )
  },
})

export const Interactive = createStory(0)

export const WithMaxCount = createStory(99)
