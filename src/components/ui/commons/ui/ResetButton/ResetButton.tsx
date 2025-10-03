import React from 'react'
import { ButtonProps } from '@radix-ui/themes'
import { RotateCcw } from 'lucide-react'
import './ResetButton.css'

type ResetButtonProps = ButtonProps & {
  onReset: () => void
  text?: string
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  text = 'リセット',
  ...props
}) => {
  return (
    <button className="ResetButton" onClick={onReset} {...props}>
      <RotateCcw className="ResetButtonIcon" />
      {text}
    </button>
  )
}
