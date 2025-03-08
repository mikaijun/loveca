import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Summary } from './Summary'
import { HeartIcon } from '@atoms/HeartIcon'
import '@testing-library/jest-dom'

describe('Summary component', () => {
  it('アイコン、ラベル、カウントが正しく表示されること', () => {
    const label = 'Favorites'
    const icon = <HeartIcon color="pink" />

    render(<Summary icon={icon} label={label} />)

    const labelElement = screen.getByText(label)
    const iconElement = screen.getByTestId('heart-icon')

    expect(labelElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
  })
})
