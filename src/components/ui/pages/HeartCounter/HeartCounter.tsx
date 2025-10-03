import React from 'react'
import { HeartIcon } from '@components/ui/pages/HeartIcon'
import { HeartIconProps } from '@constants/hearts'
import './HeartCounter.css'

type HeartCounterProps = {
  color: HeartIconProps['color']
  count: number
  onIncrement: (color: HeartIconProps['color']) => void
  onDecrement: (color: HeartIconProps['color']) => void
}

export const HeartCounter: React.FC<HeartCounterProps> = ({
  color,
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="HeartCounter">
      <button
        aria-label={`${color}のハートを減らす`}
        className="HeartCounterButton"
        disabled={count <= 0}
        onClick={() => onDecrement(color)}
      >
        -
      </button>
      <HeartIcon color={color} />
      <span className="HeartCounterValue">{count}</span>
      <button
        aria-label={`${color}のハートを増やす`}
        className="HeartCounterButton"
        onClick={() => onIncrement(color)}
      >
        +
      </button>
    </div>
  )
}
