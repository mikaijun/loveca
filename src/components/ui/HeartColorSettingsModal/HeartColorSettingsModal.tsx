import React, { useCallback } from 'react'

import { Button, CheckboxGroup, Text, Flex } from '@radix-ui/themes'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { VscWand } from 'react-icons/vsc'
import { BsPersonHearts } from 'react-icons/bs'
import { Dialog } from 'radix-ui'
import { TbSettingsHeart } from 'react-icons/tb'
import { Summary } from '@components/commons/ui/Summary'
import { Modal } from '@components/commons/ui/Modal'
import { HeartIcon } from '@components/ui/HeartIcon'
import { MemberHeartColor, memberHeartColors } from '@constants/hearts'
import './HeartColorSettingsModal.css'

export type HeartColorSettingsModalProps = {
  requiredLiveHeartColorList: MemberHeartColor[]
  memberHeartColorList: MemberHeartColor[]
  onChangeRequiredLiveHeartColor: (value: MemberHeartColor[]) => void
  onChangeMemberHeartColor: (value: MemberHeartColor[]) => void
}

export const HeartColorSettingsModal: React.FC<
  HeartColorSettingsModalProps
> = ({
  requiredLiveHeartColorList,
  memberHeartColorList,
  onChangeRequiredLiveHeartColor,
  onChangeMemberHeartColor,
}) => {
  // 単純なバリデーション処理（rules.mdc: コンポーネント内で可）
  const createHandleChange = useCallback(
    (onChange: (values: MemberHeartColor[]) => void) => {
      return (values: string[]) => {
        const validValues = memberHeartColors.filter((color) =>
          values.includes(color)
        )
        if (validValues.length === values.length) {
          onChange(validValues)
        } else {
          throw new Error('ハートの色に無効な値が指定されました')
        }
      }
    },
    []
  )

  const handleChangeRequiredLiveHeartColor = createHandleChange(
    onChangeRequiredLiveHeartColor
  )

  const handleChangeMemberHeartColor = createHandleChange(
    onChangeMemberHeartColor
  )

  const isSingleMemberHeart = memberHeartColorList.length <= 1

  return (
    <Modal
      trigger={
        <Button className="SettingsButton" color="gray" variant="outline">
          <TbSettingsHeart className="SettingsButtonIcon" />
          <Text weight="bold">ハート表示設定</Text>
        </Button>
      }
    >
      <DialogTitle>ハート表示設定</DialogTitle>
      <DialogDescription
        color="gray"
        style={{
          marginBottom: '16px',
          fontSize: '12px',
          margin: '0 0 16px 0',
        }}
      >
        チェックを入れたハートの色のみが表示されます
      </DialogDescription>
      <Summary icon={<VscWand size="20px" />} label="ライブに必要なハート" />
      <Flex
        asChild
        direction="row"
        gap="8px"
        justify="between"
        style={{ marginBottom: '32px' }}
        wrap="wrap"
      >
        <CheckboxGroup.Root
          aria-label="Heart colors"
          defaultValue={requiredLiveHeartColorList}
          onValueChange={handleChangeRequiredLiveHeartColor}
        >
          {memberHeartColors.map((color) => (
            <CheckboxGroup.Item
              key={color}
              style={{ alignItems: 'center', gap: 0 }}
              value={color}
            >
              <HeartIcon color={color} />
            </CheckboxGroup.Item>
          ))}
        </CheckboxGroup.Root>
      </Flex>
      <Summary icon={<BsPersonHearts size="20px" />} label="メンバーのハート" />
      <Flex asChild direction="row" gap="8px" justify="between" wrap="wrap">
        <CheckboxGroup.Root
          aria-label="Heart colors"
          defaultValue={memberHeartColorList}
          onValueChange={handleChangeMemberHeartColor}
        >
          {memberHeartColors.map((color) => (
            <CheckboxGroup.Item
              disabled={
                isSingleMemberHeart && memberHeartColorList.includes(color)
              }
              key={color}
              style={{ alignItems: 'center', gap: 0 }}
              value={color}
            >
              <HeartIcon color={color} />
            </CheckboxGroup.Item>
          ))}
        </CheckboxGroup.Root>
      </Flex>
      <Flex justify="end" style={{ marginTop: '16px' }}>
        <Dialog.Close asChild>
          <Button color="red" size="3" variant="outline">
            閉じる
          </Button>
        </Dialog.Close>
      </Flex>
    </Modal>
  )
}
