import React from 'react'
import styles from './SegmentedControl.module.css'

interface SegmentedControlProps {
  value: string
  onChange: (value: string) => void
  options: {
    label: string
    value: string
  }[]
  disabled?: boolean
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  value,
  onChange,
  options,
  disabled = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!disabled) {
        onChange(optionValue)
      }
    }
  }

  return (
    <div
      className={`${styles.segmentedControl} ${disabled ? styles.disabled : ''}`}
      role="radiogroup"
    >
      {options.map((option) => (
        <div
          aria-checked={value === option.value}
          className={`${styles.segment} ${
            value === option.value ? styles.selected : ''
          }`}
          key={option.value}
          onClick={() => !disabled && onChange(option.value)}
          onKeyDown={(e) => handleKeyDown(e, option.value)}
          role="radio"
          tabIndex={disabled ? -1 : 0}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}
