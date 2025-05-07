import React from 'react'
import { Button, ButtonProps, Text } from '@radix-ui/themes'
import { RotateCcw } from 'lucide-react'

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
    <Button
      color="red"
      onClick={onReset}
      radius="large"
      variant="outline"
      {...props}
    >
      <RotateCcw size="16px" />
      <Text weight="bold">{text}</Text>
    </Button>
  )
}
