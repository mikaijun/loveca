import React, { useCallback } from 'react'
import classnames from 'classnames'
import { CheckIcon } from 'lucide-react'
import { Select } from 'radix-ui'
import { TriggerSelect } from '@components/features/settings/TriggerSelect'

type NumberSelectProps = {
  startNumber: number
  endNumber: number
  ariaLabel: string
  value?: number
  className?: string
  onChangeValue: (value: number) => void
}

export const NumberSelect: React.FC<NumberSelectProps> = ({
  startNumber,
  endNumber,
  ariaLabel,
  value,
  className,
  onChangeValue,
}) => {
  const isAscending = endNumber >= startNumber
  const length = Math.abs(endNumber - startNumber) + 1
  // NOTE: startNumberがendNumberより大きい場合は降順になる
  const numbers = Array.from({ length }, (_, i) =>
    isAscending ? startNumber + i : startNumber - i
  )

  const handleChangeValue = useCallback(
    (value: string) => {
      onChangeValue(Number(value))
    },
    [onChangeValue]
  )

  return (
    <TriggerSelect
      ariaLabel={ariaLabel}
      onValueChange={handleChangeValue}
      selectWidth="120px"
      value={String(value)}
    >
      <Select.Group>
        {numbers.map((number, i) => (
          <Select.Item
            className={classnames('SelectItem', className)}
            key={i}
            value={String(number)}
          >
            {/* NOTE: 数値の0は選択後表示されないので文字列に変換している */}
            <Select.ItemText>{number === 0 ? '0' : number}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
              <CheckIcon />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Group>
    </TriggerSelect>
  )
}
