import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Select } from 'radix-ui'
import classnames from 'classnames'
import { CheckIcon } from 'lucide-react'
import { TriggerSelect } from '@components/features/settings/TriggerSelect'

export default {
  title: 'Atoms/TriggerSelect',
  component: TriggerSelect,
} as Meta<typeof TriggerSelect>

export const Default: StoryObj<typeof TriggerSelect> = {
  render: () => (
    <TriggerSelect ariaLabel="Live Select" placeholder="ライブ選択">
      <>
        <Select.Group>
          <Select.Label className="SelectLabel">
            虹ヶ咲学園スクールアイドル同好会
          </Select.Label>
          <SelectItem value="Poppin'Up!">Poppin&apos;Up!</SelectItem>
          <SelectItem value="Butterfly">Butterfly</SelectItem>
          <SelectItem value="Eutopia">Eutopia</SelectItem>
        </Select.Group>
        <Select.Separator className="SelectSeparator" />
        <Select.Group>
          <Select.Label className="SelectLabel">
            ラブライブ！スーパースター!!
          </Select.Label>
          <SelectItem value="Starlight Prologue">Starlight Prologue</SelectItem>
          <SelectItem value="未来予報ハレルヤ！">未来予報ハレルヤ！</SelectItem>
          <SelectItem value="Sing！Shine！Smile！">
            Sing！Shine！Smile！
          </SelectItem>
        </Select.Group>
        <Select.Separator className="SelectSeparator" />
        <Select.Group>
          <Select.Label className="SelectLabel">
            蓮ノ空女学院スクールアイドルクラブ
          </Select.Label>
          <SelectItem value="アイデンティティ">アイデンティティ</SelectItem>
          <SelectItem value="ド！ド！ド！">ド！ド！ド！</SelectItem>
          <SelectItem value="Holiday∞Holiday">Holiday∞Holiday</SelectItem>
        </Select.Group>
      </>
    </TriggerSelect>
  ),
}

const SelectItem: React.FC<{
  children: React.ReactNode
  className?: string
  value: string
}> = ({ children, className, ...props }) => {
  return (
    <Select.Item className={classnames('SelectItem', className)} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
