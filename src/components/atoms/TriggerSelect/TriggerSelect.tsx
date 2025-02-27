import * as React from 'react'
import { Select } from 'radix-ui'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import './TriggerSelect.css'

type TriggerSelectProps = Select.SelectProps & {
  ariaLabel: string
  children: React.ReactNode
  id?: string
  placeholder?: string
}
export const TriggerSelect: React.FC<TriggerSelectProps> = ({
  ariaLabel,
  placeholder,
  children,
  id,
  ...props
}) => (
  <Select.Root {...props}>
    <Select.Trigger aria-label={ariaLabel} className="SelectTrigger" id={id}>
      <Select.Value placeholder={placeholder ?? '選択'} />
      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">{children}</Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)
