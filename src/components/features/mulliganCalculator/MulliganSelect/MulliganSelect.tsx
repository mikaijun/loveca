'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

import { GiCardPick, GiCardPlay } from 'react-icons/gi'
import { Accordion } from 'radix-ui'
import { useMulliganSelect } from './MulliganSelect.hooks'
import { Summary } from '@components/commons/Summary'

import { ResetButton } from '@components/commons/ResetButton'
import {
  AccordionContent,
  AccordionTrigger,
  AccordionWrapper,
} from '@components/commons/AccordionWrapper'
import { NumberSelect } from '@components/features/common/NumberSelect'
import { MulliganLineChart } from '@components/features/mulliganCalculator/MulliganLineChart'
import { colors } from '@constants/colors'

export const MulliganSelect: React.FC = () => {
  const {
    mulliganCount,
    wantCardCount,
    handleChangeMulliganCount,
    handleChangeWantCardCount,
    handleReset,
  } = useMulliganSelect()

  return (
    <Flex direction="column" gap="8px">
      <ResetButton
        onReset={handleReset}
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      />
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
      <AccordionWrapper>
        <Accordion.Item className="AccordionItem" value="item-1">
          <AccordionTrigger>
            <Text size="1">※ 計算方法について</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text as="p" mb="2px" size="1">
              - 「マリガン後」とは、マリガン後の初手6枚を指します。
            </Text>
            <Text as="p" size="1">
              -
              「ドローx枚」とは、マリガン後にx枚ドローした後の手札に欲しいカードが1枚以上来る確率を指します。
            </Text>
            <Text as="p" size="1">
              -
              マリガンで「手札に来て欲しいカード」を戻すことは考慮していません。
            </Text>
          </AccordionContent>
        </Accordion.Item>
      </AccordionWrapper>
      <Flex justify="center">
        <MulliganLineChart
          mulliganCount={mulliganCount}
          wantCardCount={wantCardCount}
        />
      </Flex>
    </Flex>
  )
}
