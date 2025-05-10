import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SegmentedControl } from './SegmentedControl'

const meta: Meta<typeof SegmentedControl> = {
  title: 'UI/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

const deckSizeOptions = [
  { label: 'スタンダード', value: '60' },
  { label: 'ハーフデッキ', value: '30' },
]

// 基本的な使用例
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('60')
    return (
      <SegmentedControl
        onChange={setValue}
        options={deckSizeOptions}
        value={value}
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('60')
    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <SegmentedControl
          disabled
          onChange={setValue}
          options={deckSizeOptions}
          value={value}
        />
      </div>
    )
  },
}

// カスタムオプション
export const CustomOptions: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <SegmentedControl
        onChange={setValue}
        options={[
          { label: 'オプション1', value: 'option1' },
          { label: 'オプション2', value: 'option2' },
          { label: 'オプション3', value: 'option3' },
        ]}
        value={value}
      />
    )
  },
}
