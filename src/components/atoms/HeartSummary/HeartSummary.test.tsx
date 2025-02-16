import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeartSummary } from './HeartSummary'
import { HeartIcon } from '@atoms/HeartIcon'
import '@testing-library/jest-dom'

describe('HeartSummary component', () => {
  it('アイコン、ラベル、カウントが正しく表示されること', () => {
    const label = 'Favorites'
    const count = 42
    const icon = <HeartIcon color="pink" />

    render(<HeartSummary count={count} icon={icon} label={label} />)

    const labelElement = screen.getByText(label)
    const countElement = screen.getByText(count.toString())
    const iconElement = screen.getByTestId('heart-icon')

    expect(labelElement).toBeInTheDocument()
    expect(countElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
  })
})
