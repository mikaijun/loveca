import { useState } from 'react'

/**
 * MulliganCalculatorPage のロジック
 */
export const useMulliganCalculatorPage = () => {
  const [mulliganCount, setMulliganCount] = useState<number>(0)
  const [wantCardCount, setWantCardCount] = useState<number>(0)
  const [deckSize, setDeckSize] = useState<number>(60)

  const handleChangeMulliganCount = (value: number) => {
    setMulliganCount(value)
  }

  const handleChangeWantCardCount = (value: number) => {
    setWantCardCount(value)
  }

  const handleChangeDeckSize = (value: number) => {
    setDeckSize(value)
  }

  const handleReset = () => {
    setMulliganCount(0)
    setWantCardCount(0)
    setDeckSize(60)
  }

  return {
    mulliganCount,
    wantCardCount,
    deckSize,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleChangeDeckSize,
    handleReset,
  }
}
