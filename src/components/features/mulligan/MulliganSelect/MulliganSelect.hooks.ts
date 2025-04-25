import { useCallback, useState } from 'react'

/**
 * MulliganSelect のロジック
 */
export const useMulliganSelect = () => {
  const [mulliganCount, setMulliganCount] = useState<number>(0)
  const [wantCardCount, setWantCardCount] = useState<number>(0)

  const handleChangeMulliganCount = useCallback((count: number) => {
    setMulliganCount(count)
  }, [])

  const handleChangeWantCardCount = useCallback((count: number) => {
    setWantCardCount(count)
  }, [])

  const handleReset = useCallback(() => {
    setMulliganCount(0)
    setWantCardCount(0)
  }, [])

  return {
    mulliganCount,
    wantCardCount,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleReset,
  }
}
