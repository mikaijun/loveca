import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Select } from 'radix-ui'
import { TriggerSelect } from './TriggerSelect'
import '@testing-library/jest-dom'

describe('TriggerSelect', () => {
  it('選択肢を開いて項目を選択できること', async () => {
    render(
      <TriggerSelect ariaLabel="Live Select" placeholder="ライブ選択">
        <Select.Item value="Poppin'Up!">Poppin&apos;Up!</Select.Item>
        <Select.Item value="Butterfly">Butterfly</Select.Item>
        <Select.Item value="Eutopia">Eutopia</Select.Item>
      </TriggerSelect>
    )

    const trigger = screen.getByRole('combobox', { name: /Live Select/i })
    expect(trigger).toBeInTheDocument()

    fireEvent.click(trigger)

    const option = screen.getByText(/Butterfly/i)
    expect(option).toBeInTheDocument()

    fireEvent.click(option)
  })
})
