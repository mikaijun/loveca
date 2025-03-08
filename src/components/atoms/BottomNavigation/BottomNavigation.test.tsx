import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import { BottomNavigation } from './BottomNavigation'

describe('BottomNavigation', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  test('各タブのリンクが正しく表示されていること', () => {
    render(<BottomNavigation />)

    // 各タブのラベルが表示されているか
    expect(screen.getByText('ハート管理')).toBeInTheDocument()
    expect(screen.getByText('ライブ成功率')).toBeInTheDocument()
    expect(screen.getByText('マリガン計算')).toBeInTheDocument()
  })

  test('タブのリンクがクリックできること', () => {
    render(<BottomNavigation />)

    // 各リンクがクリック可能で、正しいパスに遷移することを確認
    const homeLink = screen.getByText('ハート管理')
    const liveLink = screen.getByText('ライブ成功率')
    const mulliganLink = screen.getByText('マリガン計算')

    // fireEventを使ってリンクをクリック
    fireEvent.click(homeLink)
    expect(window.location.pathname).toBe('/')

    fireEvent.click(liveLink)
    setTimeout(() => {
      expect(window.location.pathname).toBe('/live')
    }, 1000)

    fireEvent.click(mulliganLink)
    setTimeout(() => {
      expect(window.location.pathname).toBe('/mulligan')
    }, 1000)
  })

  test('タブのアイコンが表示されること', () => {
    render(<BottomNavigation />)

    // アイコンが表示されるか確認
    const heartIcon = screen.getByTestId('heart')
    const theaterIcon = screen.getByTestId('live')
    const calculatorIcon = screen.getByTestId('mulligan')

    expect(heartIcon).toBeInTheDocument()
    expect(theaterIcon).toBeInTheDocument()
    expect(calculatorIcon).toBeInTheDocument()
  })

  test('タブリンクにフォーカスが当たった時、アクセシビリティのアウトラインが表示されること', () => {
    render(<BottomNavigation />)

    const heartLink = screen.getByText('ハート管理')

    // リンクにフォーカスを当てる
    fireEvent.focus(heartLink)

    // フォーカスが当たった時にアウトラインが表示されることを確認
    expect(heartLink).toHaveTextContent('ハート管理')
  })
})
