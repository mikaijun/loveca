'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Heart } from 'lucide-react'

import { GiCardDraw } from 'react-icons/gi'
import { VscWand } from 'react-icons/vsc'
import { BsPersonHearts } from 'react-icons/bs'
import { Summary } from '@atoms/Summary'
import { NumberSelect } from '@molecules/NumberSelect'

import { colors } from '@constants/colors'
import { ResetButton } from '@atoms/ResetButton'
import { useLiveSuccessCalculator } from './LiveSuccessCalculator.hooks'

export const LiveSuccessCalculator: React.FC = () => {
  const {
    memberHeartCount,
    requiredLiveHeartCount,
    yellCount,
    deckBladeHeartCount,
    deckCount,
    liveSuccessProbability,
    handleChangeMemberHeartCount,
    handleChangeRequiredLiveHeartCount,
    handleChangeYellCount,
    handleChangeDeckBladeHeartCount,
    handleChangeDeckCount,
    handleResetHeart,
  } = useLiveSuccessCalculator()
  return (
    <Flex direction="column" gap="8px">
      <Flex
        gap="16px"
        style={{
          backgroundColor: colors.blue[5],
          padding: '8px',
        }}
      >
        {deckCount < deckBladeHeartCount ? (
          <Text as="p" color="red" size="3">
            ブレードハート枚数がデッキ枚数を超えてます
          </Text>
        ) : (
          <>
            <Text size="5" weight="bold">
              ライブ成功確率
            </Text>
            <Flex gap="4px">
              <Text size="5" weight="bold">
                {liveSuccessProbability}
              </Text>
              <Text size="5" weight="bold">
                %
              </Text>
            </Flex>
          </>
        )}
      </Flex>
      <ResetButton
        onReset={handleResetHeart}
        style={{
          marginBottom: '4px',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Flex direction="column" gap="8px">
        <Box
          style={{
            border: `1px solid ${colors.blue[5]}`,
            padding: '16px',
          }}
        >
          <Summary
            icon={<Heart size="24px" />}
            label="ライブ成功に必要なハート総数"
            style={{ marginBottom: '4px' }}
          />
          <NumberSelect
            ariaLabel="Required Yell Heart"
            endNumber={40}
            onChangeValue={handleChangeRequiredLiveHeartCount}
            startNumber={0}
            value={requiredLiveHeartCount}
          />
          <Summary
            icon={<BsPersonHearts size="24px" />}
            label="ステージのハート総数"
            style={{
              marginTop: '16px',
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Required Yell Heart"
            endNumber={40}
            onChangeValue={handleChangeMemberHeartCount}
            startNumber={0}
            value={memberHeartCount}
          />
          <Summary
            icon={<VscWand size="24px" />}
            label="エール回数"
            style={{
              marginTop: '16px',
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Yell Count"
            endNumber={40}
            onChangeValue={handleChangeYellCount}
            startNumber={0}
            value={yellCount}
          />
        </Box>
        <Box
          style={{
            border: `1px solid ${colors.blue[5]}`,
            padding: '16px',
          }}
        >
          <Summary
            icon={<Heart size="24px" style={{ transform: 'rotate(-90deg)' }} />}
            label="デッキ内のブレードハート枚数"
            style={{
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Deck Blade Heart"
            endNumber={0}
            onChangeValue={handleChangeDeckBladeHeartCount}
            startNumber={60}
            value={deckBladeHeartCount}
          />
          <Summary
            icon={<GiCardDraw size="24px" />}
            label="現在のデッキ枚数"
            style={{
              marginTop: '16px',
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Deck Count"
            endNumber={0}
            onChangeValue={handleChangeDeckCount}
            startNumber={60}
            value={deckCount}
          />
        </Box>
        <Text as="p" color="gray" size="1">
          ※ハート合計数のみの計算です(ハート色別計算はしていません)
        </Text>
      </Flex>
    </Flex>
  )
}
