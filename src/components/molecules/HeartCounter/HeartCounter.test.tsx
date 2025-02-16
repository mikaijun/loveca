import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HeartCounter } from './HeartCounter'
import '@testing-library/jest-dom'

describe('HeartCounter', () => {
  it('初期状態でカウントが0で表示されること', () => {
    render(
      <HeartCounter
        color="red"
        count={0}
        onDecrement={() => {}}
        onIncrement={() => {}}
      />
    )

    const countText = screen.getByText('0')
    expect(countText).toBeInTheDocument()
  })

  it('マイナスボタンをクリックしてもカウントが0未満にはならないこと', () => {
    const onDecrement = vi.fn()
    render(
      <HeartCounter
        color="red"
        count={0}
        onDecrement={onDecrement}
        onIncrement={() => {}}
      />
    )

    const minusButton = screen.getByTestId('circle-minus')
    fireEvent.click(minusButton)
    expect(onDecrement).not.toHaveBeenCalled()
  })

  it('プラスボタンをクリックするとカウントが+1されること', () => {
    const onIncrement = vi.fn()
    render(
      <HeartCounter
        color="red"
        count={0}
        onDecrement={() => {}}
        onIncrement={onIncrement}
      />
    )

    const plusButton = screen.getByTestId('circle-plus')
    fireEvent.click(plusButton)
    expect(onIncrement).toHaveBeenCalled()
  })

  it('カウントが99のときにプラスボタンをクリックしてもカウントが100にならないこと', () => {
    const onIncrement = vi.fn()
    render(
      <HeartCounter
        color="red"
        count={99}
        onDecrement={() => {}}
        onIncrement={onIncrement}
      />
    )

    const plusButton = screen.getByTestId('circle-plus')
    fireEvent.click(plusButton)
    expect(onIncrement).not.toHaveBeenCalled()
  })
})
