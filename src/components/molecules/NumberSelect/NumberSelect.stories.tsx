import { Meta, StoryObj } from '@storybook/react'
import { NumberSelect } from './NumberSelect'

const meta: Meta<typeof NumberSelect> = {
  title: 'Molecules/NumberSelect',
  component: NumberSelect,
}

export default meta

export const BladeHeartCount: StoryObj<typeof NumberSelect> = {
  render: () => (
    <NumberSelect
      ariaLabel="Blade Heart"
      endNumber={60}
      label="エールのブレードハート数"
      onChangeValue={() => {}}
      startNumber={0}
    />
  ),
}

export const DeckBladeHeartCount: StoryObj<typeof NumberSelect> = {
  render: () => (
    <NumberSelect
      ariaLabel="Deck blade Heart"
      endNumber={0}
      label="デッキ内のブレードハート数"
      onChangeValue={() => {}}
      startNumber={60}
    />
  ),
}
