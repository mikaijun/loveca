import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SegmentedControl } from './SegmentedControl'

const mockOptions = [
  { label: 'オプション1', value: 'option1' },
  { label: 'オプション2', value: 'option2' },
  { label: 'オプション3', value: 'option3' },
]

describe('SegmentedControl', () => {
  it('renders all options correctly', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        onChange={onChange}
        options={mockOptions}
        value="option1"
      />
    )

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        onChange={onChange}
        options={mockOptions}
        value="option1"
      />
    )

    fireEvent.click(screen.getByText('オプション2'))
    expect(onChange).toHaveBeenCalledWith('option2')
  })

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        disabled
        onChange={onChange}
        options={mockOptions}
        value="option1"
      />
    )

    fireEvent.click(screen.getByText('オプション2'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('handles keyboard navigation with Enter key', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        onChange={onChange}
        options={mockOptions}
        value="option1"
      />
    )

    const option2 = screen.getByText('オプション2')
    fireEvent.keyDown(option2, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith('option2')
  })

  it('handles keyboard navigation with Space key', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        onChange={onChange}
        options={mockOptions}
        value="option1"
      />
    )

    const option2 = screen.getByText('オプション2')
    fireEvent.keyDown(option2, { key: ' ' })
    expect(onChange).toHaveBeenCalledWith('option2')
  })

  it('does not handle keyboard navigation when disabled', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        disabled
        onChange={onChange}
        options={mockOptions}
        value="option1"
      />
    )

    const option2 = screen.getByText('オプション2')
    fireEvent.keyDown(option2, { key: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies correct ARIA attributes', () => {
    render(
      <SegmentedControl
        onChange={() => {}}
        options={mockOptions}
        value="option1"
      />
    )

    const container = screen.getByRole('radiogroup')
    expect(container).toBeInTheDocument()

    const options = screen.getAllByRole('radio')
    expect(options).toHaveLength(mockOptions.length)

    const selectedOption = screen.getByText('オプション1')
    expect(selectedOption).toHaveAttribute('aria-checked', 'true')
  })
})
