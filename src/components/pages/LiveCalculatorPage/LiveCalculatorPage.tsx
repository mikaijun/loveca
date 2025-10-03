'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Heart } from 'lucide-react'
import { GiCardDraw } from 'react-icons/gi'
import { VscWand } from 'react-icons/vsc'
import { BsPersonHearts } from 'react-icons/bs'

import { useLiveCalculator } from './LiveCalculatorPage.hooks'
import { Summary } from '@components/ui/commons/ui/Summary'
import { ResetButton } from '@components/ui/commons/ui/ResetButton'
import { NumberSelect } from '@components/ui/commons/function/NumberSelect'

import './LiveCalculatorPage.css'

export const LiveCalculatorPage: React.FC = () => {
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
  } = useLiveCalculator()

  return (
    <Flex className="LiveCalculator" direction="column" gap="4">
      <Flex className="LiveCalculatorHeader" gap="4">
        {deckCount < deckBladeHeartCount ? (
          <Text as="p" className="LiveCalculatorError" color="red" size="3">
            ブレードハート枚数がデッキ枚数を超えてます
          </Text>
        ) : (
          <>
            <Text className="LiveCalculatorTitle" size="5" weight="bold">
              ライブ成功確率
            </Text>
            <Flex className="LiveCalculatorProbability" gap="1">
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
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
        }}
      />
      <Flex className="LiveCalculatorContent" direction="column" gap="4">
        <Box className="LiveCalculatorSection">
          <Summary
            className="LiveCalculatorSummary"
            icon={<Heart size="24px" />}
            label="ライブ成功に必要なハート総数"
          />
          <NumberSelect
            ariaLabel="Required Yell Heart"
            endNumber={40}
            onChangeValue={handleChangeRequiredLiveHeartCount}
            startNumber={0}
            value={requiredLiveHeartCount}
          />
          <Summary
            className="LiveCalculatorSummary"
            icon={<BsPersonHearts size="24px" />}
            label="ステージのハート総数"
          />
          <NumberSelect
            ariaLabel="Required Yell Heart"
            endNumber={40}
            onChangeValue={handleChangeMemberHeartCount}
            startNumber={0}
            value={memberHeartCount}
          />
          <Summary
            className="LiveCalculatorSummary"
            icon={<VscWand size="24px" />}
            label="エール回数"
          />
          <NumberSelect
            ariaLabel="Yell Count"
            endNumber={40}
            onChangeValue={handleChangeYellCount}
            startNumber={0}
            value={yellCount}
          />
        </Box>
        <Box className="LiveCalculatorSection">
          <Summary
            className="LiveCalculatorSummary"
            icon={<Heart className="LiveCalculatorBladeHeart" size="24px" />}
            label="デッキ内のブレードハート枚数"
          />
          <NumberSelect
            ariaLabel="Deck Blade Heart"
            endNumber={0}
            onChangeValue={handleChangeDeckBladeHeartCount}
            startNumber={60}
            value={deckBladeHeartCount}
          />
          <Summary
            className="LiveCalculatorSummary"
            icon={<GiCardDraw size="24px" />}
            label="現在のデッキ枚数"
          />
          <NumberSelect
            ariaLabel="Deck Count"
            endNumber={0}
            onChangeValue={handleChangeDeckCount}
            startNumber={60}
            value={deckCount}
          />
        </Box>
        <Text as="p" className="LiveCalculatorNote" color="gray" size="1">
          ※ハート合計数のみの計算です(ハート色別計算はしていません)
        </Text>
      </Flex>
    </Flex>
  )
}
