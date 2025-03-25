import React from 'react'
import { Button, ButtonProps } from '@radix-ui/themes'
import { RotateCcw } from 'lucide-react'

type ResetButtonProps = ButtonProps & {
  onReset: () => void
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  ...props
}) => {
  return (
    <Button color="red" onClick={onReset} radius="large" {...props}>
      <RotateCcw size="16px" />
      リセット
    </Button>
  )
}
