'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { GiCardPick, GiCardPlay } from 'react-icons/gi'
import { useMulliganCalculatorPage } from './MulliganCalculatorPage.hooks'
import { CardSettingsModal } from '@components/features/mulliganCalculator/CardSettingsModal'
import { Summary } from '@components/commons/ui/Summary'
import { ResetButton } from '@components/commons/ui/ResetButton'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import { MulliganLineChart } from '@components/features/mulliganCalculator/MulliganLineChart'
import { CalculationMethodModal } from '@components/features/mulliganCalculator/CalculationMethodModal'
import { SegmentedControl } from '@components/commons/ui/SegmentedControl'
import './MulliganCalculatorPage.css'

export const MulliganCalculatorPage: React.FC = () => {
  const {
    mulliganCount,
    wantCardCount,
    deckSize,
    kasumiCount,
    renCount,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleChangeDeckSize,
    handleReset,
    handleChangeKasumiCount,
    handleChangeRenCount,
  } = useMulliganCalculatorPage()

  const deckSizeOptions = [
    { label: 'スタンダード', value: '60' },
    { label: 'ハーフデッキ', value: '30' },
  ]

  return (
    <Flex className="MulliganCalculator" direction="column" gap="2">
      <Flex align="center">
        <CalculationMethodModal />
        <ResetButton
          onReset={handleReset}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        />
      </Flex>

      <Flex className="MulliganCalculatorContent" direction="column" gap="4">
        <Box className="MulliganCalculatorSection">
          <Flex align="start" justify="between">
            <Box>
              <Summary
                className="MulliganCalculatorSummary"
                icon={<GiCardPlay size="24px" />}
                label="マリガンで戻す枚数"
              />
              <NumberSelect
                ariaLabel="マリガンで戻す枚数"
                endNumber={0}
                onChangeValue={handleChangeMulliganCount}
                startNumber={6}
                value={mulliganCount}
              />
            </Box>
            <SegmentedControl
              onChange={(value) => handleChangeDeckSize(parseInt(value, 10))}
              options={deckSizeOptions}
              value={deckSize.toString()}
            />
          </Flex>
          <Summary
            className="MulliganCalculatorSummary"
            icon={<GiCardPick size="24px" />}
            label="手札に来て欲しいカードの枚数"
            style={{
              marginTop: '8px',
              marginBottom: '4px',
            }}
          />
          <Flex align="end" justify="between">
            <NumberSelect
              ariaLabel="手札に来て欲しいカードの枚数"
              endNumber={deckSize}
              onChangeValue={handleChangeWantCardCount}
              startNumber={0}
              value={wantCardCount}
            />
            <CardSettingsModal
              kasumiCount={kasumiCount}
              onChangeKasumiCount={handleChangeKasumiCount}
              onChangeRenCount={handleChangeRenCount}
              renCount={renCount}
            />
          </Flex>
          {(kasumiCount > 0 || renCount > 0) && (
            <Box className="MulliganCalculatorSettingCards">
              <Text as="p" mb="2" size="2" weight="bold">
                特定カードの採用枚数
              </Text>
              <ul style={{ listStyle: 'inside', padding: 0, margin: 0 }}>
                {kasumiCount > 0 && (
                  <li>
                    <Text size="2">
                      中須 かすみ(コスト2):
                      <Text weight="bold">{kasumiCount}枚</Text>
                    </Text>
                  </li>
                )}
                {renCount > 0 && (
                  <li>
                    <Text size="2">
                      葉月 恋(コスト2): <Text weight="bold">{renCount}枚</Text>
                    </Text>
                  </li>
                )}
              </ul>
            </Box>
          )}
        </Box>
        <Box className="MulliganCalculatorChart">
          <MulliganLineChart
            deckSize={deckSize}
            kasumiCount={kasumiCount}
            mulliganCount={mulliganCount}
            renCount={renCount}
            wantCardCount={wantCardCount}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
