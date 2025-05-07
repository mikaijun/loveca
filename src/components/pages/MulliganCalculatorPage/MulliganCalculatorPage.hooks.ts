import { useState } from 'react'

/**
 * MulliganCalculatorPage のロジック
 */
export const useMulliganCalculatorPage = () => {
  const [mulliganCount, setMulliganCount] = useState<number>(0)
  const [wantCardCount, setWantCardCount] = useState<number>(0)

  const handleChangeMulliganCount = (value: number) => {
    setMulliganCount(value)
  }

  const handleChangeWantCardCount = (value: number) => {
    setWantCardCount(value)
  }

  const handleReset = () => {
    setMulliganCount(0)
    setWantCardCount(0)
  }

  return {
    mulliganCount,
    wantCardCount,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleReset,
  }
}
