import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NumberSelect } from './NumberSelect'

const meta: Meta<typeof NumberSelect> = {
  title: 'Molecules/NumberSelect',
  component: NumberSelect,
}

export default meta

export const BladeHeartCount: StoryObj<typeof NumberSelect> = {
  render: () => {
    const [value, setValue] = useState(0)
    return (
      <>
        <p>エールのブレードハート数</p>
        <NumberSelect
          ariaLabel="Blade Heart"
          endNumber={60}
          onChangeValue={(newValue) => setValue(newValue)}
          startNumber={0}
          value={value}
        />
      </>
    )
  },
}

export const DeckBladeHeartCount: StoryObj<typeof NumberSelect> = {
  render: () => {
    const [value, setValue] = useState(60)
    return (
      <>
        <p>デッキの中ののブレードハート数</p>
        <NumberSelect
          ariaLabel="Deck blade Heart"
          endNumber={0}
          onChangeValue={(newValue) => setValue(newValue)}
          startNumber={60}
          value={value}
        />
      </>
    )
  },
}
