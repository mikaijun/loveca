import { useCallback, useMemo, useState } from 'react'

export const useMonochromeManager = () => {
  const [memberHeartCount, setMemberHeartCount] = useState<number>(0)
  const [requiredLiveHeartCount, setRequiredLiveHeart] = useState<number>(0)

  const requiredBladeHeartCount = useMemo((): number | 'ライブ成功' => {
    const diffCount = requiredLiveHeartCount - memberHeartCount

    // NOTE: 以下の2つを出しわけたいため条件式を記述している
    // ・ライブが実行されないことによる必要ブレードハートはなし(0と表示)
    // ・ライブに必要なハートが揃ったことによる必要ブレードハートなし(ライブ成功と表示)
    if (requiredLiveHeartCount > 0 && diffCount <= 0) return 'ライブ成功'
    return Math.max(requiredLiveHeartCount - memberHeartCount, 0)
  }, [requiredLiveHeartCount, memberHeartCount])

  const handleChangeMemberHeartCount = useCallback((count: number) => {
    setMemberHeartCount(count)
  }, [])

  const handleRequiredLiveHeartCount = useCallback((count: number) => {
    setRequiredLiveHeart(count)
  }, [])

  const handleResetHeart = useCallback(() => {
    setMemberHeartCount(0)
    setRequiredLiveHeart(0)
  }, [])

  return {
    memberHeartCount,
    requiredLiveHeartCount,
    requiredBladeHeartCount,
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,
  }
}
