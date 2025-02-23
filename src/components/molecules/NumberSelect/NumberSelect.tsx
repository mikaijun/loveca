import React, { useCallback } from 'react'
import classnames from 'classnames'
import { CheckIcon } from 'lucide-react'
import { Select } from 'radix-ui'
import { Label } from '@radix-ui/react-label'
import { TriggerSelect } from '@atoms/TriggerSelect'

type NumberSelectProps = {
  startNumber: number
  endNumber: number
  ariaLabel: string
  label?: string
  placeholder?: string
  className?: string
  onChangeValue: (value: number) => void
}

export const NumberSelect: React.FC<NumberSelectProps> = ({
  startNumber,
  endNumber,
  ariaLabel,
  placeholder,
  label,
  className,
  onChangeValue,
  ...props
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
    <>
      {label && (
        <Label
          htmlFor={label}
          style={{
            display: 'block',
            fontSize: '12px',
            marginBottom: '4px',
          }}
        >
          {label}
        </Label>
      )}
      <TriggerSelect
        ariaLabel={ariaLabel}
        id={label}
        onValueChange={handleChangeValue}
        placeholder={placeholder ?? '選択'}
      >
        <Select.Group>
          {numbers.map((number, i) => (
            <Select.Item
              className={classnames('SelectItem', className)}
              key={i}
              value={String(number)}
              {...props}
            >
              <Select.ItemText>{number}</Select.ItemText>
              <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Group>
      </TriggerSelect>
    </>
  )
}
