import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { Button } from '@radix-ui/themes'
import { Dialog } from 'radix-ui'
import { Modal } from '@components/commons/ui/Modal'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import './KasumiSettingsModal.css'

interface KasumiSettingsModalProps {
  kasumiCount: number
  onChangeKasumiCount: (value: number) => void
}

export const KasumiSettingsModal: React.FC<KasumiSettingsModalProps> = ({
  kasumiCount,
  onChangeKasumiCount,
}) => {
  return (
    <Modal
      trigger={
        <button className="KasumiSettingsModalButton">
          <FaCrown />
          かすみの採用枚数設定
        </button>
      }
    >
      <div className="KasumiSettingsModalContent">
        <div className="KasumiSettingsModalTitle">中須かすみの設定</div>
        <div className="KasumiSettingsModalDescription">
          デッキ内の中須かすみ(コスト2)の枚数を設定してください。
        </div>
        <NumberSelect
          ariaLabel="デッキ内の中須かすみ(コスト2)の枚数"
          endNumber={4}
          onChangeValue={onChangeKasumiCount}
          startNumber={0}
          value={kasumiCount}
        />
        <Dialog.Close asChild>
          <Button
            className="KasumiSettingsModalCloseButton"
            color="red"
            size="3"
            variant="outline"
          >
            閉じる
          </Button>
        </Dialog.Close>
      </div>
    </Modal>
  )
}
