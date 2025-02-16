import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeartCounter } from './HeartCounter'
import '@testing-library/jest-dom'

describe('HeartCounter', () => {
  it('初期状態でカウントが0で表示されること', () => {
    render(<HeartCounter />)

    const countText = screen.getByText('0')
    expect(countText).toBeInTheDocument()
  })

  it('CircleMinusをクリックしてもカウントが0未満にはならないこと', () => {
    render(<HeartCounter />)

    // CircleMinus アイコンを取得
    const minusButton = screen.getByTestId('circle-minus')
    fireEvent.click(minusButton) // 一度クリック

    const countText = screen.getByText('0')
    expect(countText).toBeInTheDocument() // カウントが0のままであること
  })

  it('CirclePlusをクリックするとカウントが+1されること', () => {
    render(<HeartCounter />)

    // CirclePlus アイコンを取得
    const plusButton = screen.getByTestId('circle-plus')
    fireEvent.click(plusButton)

    const countText = screen.getByText('1')
    expect(countText).toBeInTheDocument() // カウントが1に増えていること
  })

  it('カウントが99のときにCirclePlusをクリックしてもカウントが100にならないこと', () => {
    render(<HeartCounter />)

    // まずカウントを99にする
    const plusButton = screen.getByTestId('circle-plus')
    for (let i = 0; i < 99; i++) {
      fireEvent.click(plusButton)
    }

    const countText = screen.getByText('99')
    expect(countText).toBeInTheDocument() // カウントが99のままであること

    // さらにCirclePlusをクリックしてもカウントは増えない
    fireEvent.click(plusButton)
    expect(countText).toBeInTheDocument() // まだ99のままであること
  })
})
