import React from 'react'
import { HeartIcon } from '@components/ui/pages/HeartIcon'
import { HeartColor } from '@domain/valueObjects/heartColor/heartColor'
import './HeartCounter.css'

type HeartCounterProps = {
  color: HeartColor
  count: number
  onIncrement: (color: HeartColor) => void
  onDecrement: (color: HeartColor) => void
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
