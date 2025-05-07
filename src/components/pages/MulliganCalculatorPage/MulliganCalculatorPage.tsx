'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

import { GiCardPick, GiCardPlay } from 'react-icons/gi'
import { useMulliganCalculatorPage } from './MulliganCalculatorPage.hooks'
import { Summary } from '@components/commons/ui/Summary'

import { ResetButton } from '@components/commons/ui/ResetButton'
import { NumberSelect } from '@components/commons/function/NumberSelect'
import { MulliganLineChart } from '@components/features/mulliganCalculator/MulliganLineChart'
import { CalculationMethodModal } from '@components/features/mulliganCalculator/CalculationMethodModal'
import { colors } from '@constants/colors'

export const MulliganCalculatorPage: React.FC = () => {
  const {
    mulliganCount,
    wantCardCount,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleReset,
  } = useMulliganCalculatorPage()

  return (
    <Flex direction="column" gap="8px">
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
      <Flex direction="column" gap="16px">
        <Box
          style={{
            border: `1px solid ${colors.blue[5]}`,
            padding: '16px',
          }}
        >
          <Summary
            icon={<GiCardPlay size="24px" />}
            label="マリガンで戻す枚数"
            style={{ marginBottom: '4px' }}
          />
          <NumberSelect
            ariaLabel="マリガンで戻す枚数"
            endNumber={6}
            onChangeValue={handleChangeMulliganCount}
            startNumber={0}
            value={mulliganCount}
          />
          <Summary
            icon={<GiCardPick size="24px" />}
            label="手札に来て欲しいカードの枚数"
            style={{
              marginTop: '8px',
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="手札に来て欲しいカードの枚数"
            endNumber={60}
            onChangeValue={handleChangeWantCardCount}
            startNumber={0}
            value={wantCardCount}
          />
          <Text as="p" color="gray" mt="8px" size="1">
            例) 8枚採用されているコストxのメンバーを引きたい場合は、
          </Text>
          <Text as="p" color="gray" size="1">
            「8」を選択してください。
          </Text>
        </Box>
      </Flex>
      <Flex justify="center">
        <MulliganLineChart
          mulliganCount={mulliganCount}
          wantCardCount={wantCardCount}
        />
      </Flex>
    </Flex>
  )
}
