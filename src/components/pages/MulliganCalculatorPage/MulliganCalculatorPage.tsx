'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { GiCardPick, GiCardPlay } from 'react-icons/gi'
import { useMulliganCalculatorPage } from './MulliganCalculatorPage.hooks'
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
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleChangeDeckSize,
    handleReset,
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
                endNumber={6}
                onChangeValue={handleChangeMulliganCount}
                startNumber={0}
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
          <NumberSelect
            ariaLabel="手札に来て欲しいカードの枚数"
            endNumber={deckSize}
            onChangeValue={handleChangeWantCardCount}
            startNumber={0}
            value={wantCardCount}
          />

          <div className="MulliganCalculatorExample">
            例)
            8枚採用されているコストxのメンバーを引きたい場合は、「8」を選択してください。
          </div>
        </Box>

        <Box className="MulliganCalculatorChart">
          <MulliganLineChart
            deckSize={deckSize}
            mulliganCount={mulliganCount}
            wantCardCount={wantCardCount}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
