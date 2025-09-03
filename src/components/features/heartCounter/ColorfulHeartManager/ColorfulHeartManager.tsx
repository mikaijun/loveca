'use client'

import React, { useCallback, useMemo } from 'react'
import { Heart } from 'lucide-react'
import { BsPersonHearts } from 'react-icons/bs'
import { VscWand } from 'react-icons/vsc'
import {
  useRequiredLiveHeartState,
  useMemberHeartState,
  calculateRequiredBladeHeart,
  calculateMemberHeartCount,
  calculateRequiredLiveHeartCount,
  getRequiredLiveHeartColorList,
  getMemberHeartColorList,
} from './ColorfulHeartManager.hooks'
import { Summary } from '@components/commons/ui/Summary'
import { ResetButton } from '@components/commons/ui/ResetButton'
import { HeartIcon } from '@components/features/heartCounter/HeartIcon'
import { HeartCounter } from '@components/features/heartCounter/HeartCounter'
import { HeartColorSettingsModal } from '@components/features/heartCounter/HeartColorSettingsModal'
import { memberHeartColors, requiredLiveHeartColors } from '@constants/hearts'
import './ColorfulHeartManager.css'

export const ColorfulHeartManager: React.FC = () => {
  const {
    requiredLiveHearts,
    handleIncrementRequiredLiveHeart,
    handleDecrementRequiredLiveHeart,
    resetRequiredLiveHeart,
    handleChangeVisibilityRequiredLiveHeart,
  } = useRequiredLiveHeartState()

  const {
    memberHearts,
    handleIncrementMemberHeart,
    handleDecrementMemberHeart,
    resetMemberHeart,
    handleChangeVisibilityMemberHeart,
  } = useMemberHeartState()

  const requiredLiveHeartColorList = useMemo(
    () => getRequiredLiveHeartColorList(requiredLiveHearts),
    [requiredLiveHearts]
  )

  const memberHeartColorList = useMemo(
    () => getMemberHeartColorList(memberHearts),
    [memberHearts]
  )

  const handleResetCount = useCallback(() => {
    resetRequiredLiveHeart()
    resetMemberHeart()
  }, [resetRequiredLiveHeart, resetMemberHeart])

  const requiredLiveHeartCount =
    calculateRequiredLiveHeartCount(requiredLiveHearts)

  const memberHeartCount = calculateMemberHeartCount(memberHearts)

  const requiredBladeHeart = calculateRequiredBladeHeart({
    requiredLiveHearts,
    memberHearts,
  })

  const requiredBladeHeartCount = Object.values(requiredBladeHeart).reduce(
    (acc, cur) => acc + cur.count,
    0
  )

  const requiredBladeHeartMessage =
    requiredLiveHeartCount > 0 && requiredBladeHeartCount === 0
      ? 'ライブ成功'
      : `必要ブレードハート数: ${requiredBladeHeartCount}`

  return (
    <div className="HeartManagerContainer">
      <div className="HeartManagerHeader">
        <HeartColorSettingsModal
          memberHeartColorList={memberHeartColorList}
          onChangeMemberHeartColor={handleChangeVisibilityMemberHeart}
          onChangeRequiredLiveHeartColor={
            handleChangeVisibilityRequiredLiveHeart
          }
          requiredLiveHeartColorList={requiredLiveHeartColorList}
        />
        <ResetButton onReset={handleResetCount} text="カウントリセット" />
      </div>

      <Summary
        icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
        label={requiredBladeHeartMessage}
      />

      <div className="HeartCounterGroup">
        {requiredLiveHeartColors.map((color) => (
          <React.Fragment key={color}>
            {requiredLiveHearts[color].isVisible && (
              <div className="HeartCounterItem">
                <HeartIcon color={color} />
                <span className="HeartCounterValue">
                  {requiredLiveHearts[color].count > 0 &&
                  requiredBladeHeart[color].count === 0
                    ? '達成'
                    : requiredBladeHeart[color].count}
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Summary
        icon={<VscWand size="20px" />}
        label={`ライブに必要なハート数: ${requiredLiveHeartCount}`}
      />

      <div className="HeartCounterGroup">
        {requiredLiveHeartColors.map((color) => (
          <React.Fragment key={color}>
            {requiredLiveHearts[color].isVisible && (
              <HeartCounter
                color={color}
                count={requiredLiveHearts[color].count}
                key={color}
                onDecrement={handleDecrementRequiredLiveHeart}
                onIncrement={handleIncrementRequiredLiveHeart}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <Summary
        icon={<BsPersonHearts size="20px" />}
        label={`メンバーのハート合計数: ${memberHeartCount}`}
      />

      <div className="HeartCounterGroup">
        {memberHeartColors.map((color) => (
          <React.Fragment key={color}>
            {memberHearts[color].isVisible && (
              <HeartCounter
                color={color}
                count={memberHearts[color].count}
                key={color}
                onDecrement={handleDecrementMemberHeart}
                onIncrement={handleIncrementMemberHeart}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="HeartManagerFooter">
        ※ALLハート持ちメンバーは好きな色を選択してください
      </div>
    </div>
  )
}
