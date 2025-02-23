import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import { NumberSelect } from './NumberSelect'

describe('NumberSelect', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  test('昇順の選択肢が正しく表示されること', async () => {
    render(
      <NumberSelect
        ariaLabel="Number Select"
        endNumber={3}
        onChangeValue={() => {}}
        startNumber={1}
      />
    )

    fireEvent.click(screen.getByRole('combobox'))

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('降順の選択肢が正しく表示されること', async () => {
    render(
      <NumberSelect
        ariaLabel="Number Select"
        endNumber={1}
        onChangeValue={() => {}}
        startNumber={3}
      />
    )

    fireEvent.click(screen.getByRole('combobox'))

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('デフォルト値で0が表示されること', () => {
    render(
      <NumberSelect
        ariaLabel="Number Select"
        endNumber={5}
        onChangeValue={() => {}}
        startNumber={0}
        value={0}
      />
    )
  })

  test('onChangeValue が適切に呼ばれ、選択した値が渡されること', () => {
    const mockOnChange = vi.fn()

    render(
      <NumberSelect
        ariaLabel="Number Select"
        endNumber={3}
        onChangeValue={mockOnChange}
        startNumber={1}
      />
    )

    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('2'))

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(2)
  })
})
