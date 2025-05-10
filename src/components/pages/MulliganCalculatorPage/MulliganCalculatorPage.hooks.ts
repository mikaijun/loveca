import { useState } from 'react'

/**
 * MulliganCalculatorPage のロジック
 */
export const useMulliganCalculatorPage = () => {
  const [mulliganCount, setMulliganCount] = useState<number>(0)
  const [wantCardCount, setWantCardCount] = useState<number>(0)
  const [deckSize, setDeckSize] = useState<number>(60)
  const [kasumiCount, setKasumiCount] = useState<number>(0)
  const [renCount, setRenCount] = useState<number>(0)

  const handleChangeMulliganCount = (value: number) => {
    setMulliganCount(value)
  }

  const handleChangeWantCardCount = (value: number) => {
    setWantCardCount(value)
  }

  const handleChangeDeckSize = (value: number) => {
    setDeckSize(value)
  }

  const handleChangeKasumiCount = (value: number) => {
    setKasumiCount(value)
  }

  const handleChangeRenCount = (value: number) => {
    setRenCount(value)
  }

  const handleReset = () => {
    setMulliganCount(0)
    setWantCardCount(0)
    setDeckSize(60)
    setKasumiCount(0)
    setRenCount(0)
  }

  return {
    mulliganCount,
    wantCardCount,
    deckSize,
    kasumiCount,
    renCount,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleChangeDeckSize,
    handleChangeKasumiCount,
    handleChangeRenCount,
    handleReset,
  }
}
