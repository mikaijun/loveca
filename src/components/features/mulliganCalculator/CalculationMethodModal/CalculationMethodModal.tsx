import React from 'react'
import { Text, IconButton } from '@radix-ui/themes'
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Modal } from '@components/commons/Modal'

export const CalculationMethodModal: React.FC = () => {
  return (
    <Modal
      trigger={
        <IconButton
          color="blue"
          size="2"
          style={{ gap: '4px' }}
          variant="ghost"
        >
          <InfoCircledIcon height="16" width="16" />
          <Text size="1">計算方法について</Text>
        </IconButton>
      }
    >
      <DialogTitle>計算方法について</DialogTitle>
      <DialogDescription>
        <span style={{ display: 'block' }}>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>
              <Text size="1">
                「マリガン後」とは、マリガン後の初手6枚を指します。
              </Text>
            </li>
            <li>
              <Text size="1">
                「ドローx枚」とは、マリガン後にx枚ドローした後の手札に欲しいカードが1枚以上来る確率を指します。
              </Text>
            </li>
            <li>
              <Text size="1">
                マリガンで「手札に来て欲しいカード」を戻すことは考慮していません。
              </Text>
            </li>
          </ul>
        </span>
      </DialogDescription>
    </Modal>
  )
}
