import React from 'react'
import { Button, Text, Flex } from '@radix-ui/themes'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { FaCrown } from 'react-icons/fa'
import { GrUserSettings } from 'react-icons/gr'
import { Dialog } from 'radix-ui'
import { BsCupFill } from 'react-icons/bs'
import { HiExternalLink } from 'react-icons/hi'
import Link from 'next/link'
import { Modal } from '@components/commons/ui/Modal'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import { Summary } from '@components/commons/ui/Summary'
import './CardSettingsModal.css'

interface CardSettingsModalProps {
  kasumiCount: number
  renCount: number
  onChangeKasumiCount: (value: number) => void
  onChangeRenCount: (value: number) => void
}

export const CardSettingsModal: React.FC<CardSettingsModalProps> = ({
  kasumiCount,
  renCount,
  onChangeKasumiCount,
  onChangeRenCount,
}) => {
  return (
    <Modal
      trigger={
        <Button className="SettingsButton" color="gray" variant="outline">
          <GrUserSettings className="SettingsButtonIcon" />
          <Text size="1" weight="bold">
            コスト2 かすみ/恋の設定
          </Text>
        </Button>
      }
    >
      <DialogTitle>かすみ/恋の設定</DialogTitle>
      <DialogDescription
        color="gray"
        style={{
          marginBottom: '16px',
          fontSize: '12px',
          margin: '0 0 16px 0',
        }}
      >
        デッキ内の特定カードの枚数を設定してください
      </DialogDescription>
      <Summary
        icon={<FaCrown className="CrownIcon" size="20px" />}
        label="中須 かすみ(コスト2)"
      />
      <Flex
        direction="row"
        gap="8px"
        justify="between"
        style={{ marginBottom: '16px' }}
      >
        <NumberSelect
          ariaLabel="デッキ内の中須 かすみ(コスト2)の枚数"
          endNumber={4}
          onChangeValue={onChangeKasumiCount}
          startNumber={0}
          value={kasumiCount}
        />
      </Flex>
      <Summary
        icon={<BsCupFill className="CupIcon" size="20px" />}
        label="葉月 恋(コスト2)"
      />
      <Flex asChild direction="row" gap="8px" justify="between">
        <NumberSelect
          ariaLabel="デッキ内の葉月 恋(コスト2)の枚数"
          endNumber={4}
          onChangeValue={onChangeRenCount}
          startNumber={0}
          value={renCount}
        />
      </Flex>
      <Flex direction="column" gap="2" style={{ marginTop: '16px' }}>
        <Text color="gray" size="1">
          カード紹介(外部サイト)
        </Text>
        <Flex gap="2">
          <Link
            href="https://llofficial-cardgame.com/cardlist/searchresults/?cardno=PL!N-bp1-002-R%EF%BC%8B"
            rel="noopener noreferrer"
            style={{ color: 'var(--yellow-8)', textDecoration: 'underline' }}
            target="_blank"
          >
            <Flex align="center" gap="1">
              <Text size="1">中須 かすみ(コスト2)</Text>
              <HiExternalLink size="14px" />
            </Flex>
          </Link>
          <Link
            href="https://llofficial-cardgame.com/cardlist/searchresults/?cardno=PL!SP-bp1-005-R"
            rel="noopener noreferrer"
            style={{ color: 'var(--blue-11)', textDecoration: 'underline' }}
            target="_blank"
          >
            <Flex align="center" gap="1">
              <Text size="1">葉月 恋(コスト2)</Text>
              <HiExternalLink size="14px" />
            </Flex>
          </Link>
        </Flex>
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
