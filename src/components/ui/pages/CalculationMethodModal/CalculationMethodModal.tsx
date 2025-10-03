import React from 'react'
import { Text, IconButton } from '@radix-ui/themes'
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Modal } from '@components/ui/commons/ui/Modal'

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
      <DialogDescription asChild>
        <div style={{ marginTop: '16px' }}>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>
              <Text size="1">
                マリガン枚数を6枚に設定しても初手に欲しいカードが来る可能性があります。
              </Text>
            </li>
            <li>
              <Text size="1">
                コスト2の中須 かすみ or 葉月
                恋を設定した場合、それらを引いたら必ず登場させるものとします(1ターン目2-2進行)
              </Text>
            </li>
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
        </div>
      </DialogDescription>
    </Modal>
  )
}
