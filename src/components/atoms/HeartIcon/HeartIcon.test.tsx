import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeartIcon } from './HeartIcon'
import '@testing-library/jest-dom'

describe('HeartIcon component', () => {
  it('ハートが表示されるか確認', () => {
    const color = 'red'

    render(<HeartIcon color={color} />)

    const heartIcon = screen.getByTestId('heart-icon')
    const icon = screen.getByTestId('heart-icon-inner-icon')

    expect(heartIcon).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })
})
