'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Heart, Theater, UsersRound } from 'lucide-react'

import { Summary } from '@atoms/Summary'
import { NumberSelect } from '@molecules/NumberSelect'
import { useMonochromeManager } from '@organism/MonochromeManager/MonochromeManager.hooks'
import { colors } from '@constants/colors'
import { ResetButton } from '@atoms/ResetButton'

export const MonochromeManager: React.FC = () => {
  const {
    memberHeartCount,
    requiredLiveHeartCount,
    requiredBladeHeartCount,
    yellCount,
    deckBladeHeartCount,
    liveSuccessProbability,
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleChangeYellCount,
    handleChangeDeckBladeHeartCount,
    handleResetHeart,
  } = useMonochromeManager()
  return (
    <Flex direction="column" gap="8px">
      <ResetButton
        onReset={handleResetHeart}
        style={{
          marginBottom: '4px',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Flex direction="column" gap="16px">
        <Summary
          icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
          label={`必要ブレードハート数: ${requiredBladeHeartCount}`}
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        />
        <Box
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        >
          <Summary
            icon={<Theater size="20px" />}
            label={`ライブ成功必要ハート数: ${requiredLiveHeartCount}`}
            style={{
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Required Live Heart"
            endNumber={40}
            onChangeValue={handleRequiredLiveHeartCount}
            startNumber={0}
            value={requiredLiveHeartCount}
          />
        </Box>
        <Box
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        >
          <Summary
            icon={<UsersRound size="20px" />}
            label={`メンバーのハート合計数: ${memberHeartCount}`}
            style={{
              marginBottom: '4px',
            }}
          />
          <NumberSelect
            ariaLabel="Member Heart"
            endNumber={40}
            onChangeValue={handleChangeMemberHeartCount}
            startNumber={0}
            value={memberHeartCount}
          />
        </Box>
        <Box
          style={{
            border: `1px solid ${colors.blue[8]}`,
            padding: '16px',
          }}
        >
          <Box p="0 8px">
            <Text as="p" mb="8px" size="3" weight="bold">
              ライブ成功確率
            </Text>
            <Flex align="end" justify="between" mb="16px">
              <Box>
                <Text as="p" mb="8px" size="1">
                  エール回数
                </Text>
                <NumberSelect
                  ariaLabel="Deck blade Heart"
                  endNumber={40}
                  onChangeValue={handleChangeYellCount}
                  startNumber={0}
                  value={yellCount}
                />
              </Box>
              <Box>
                <Text as="p" mb="8px" size="1">
                  デッキ内のブレードハート枚数
                </Text>
                <Box
                  style={{
                    marginLeft: 'auto',
                    width: '100px',
                    marginRight: '32px',
                  }}
                >
                  <NumberSelect
                    ariaLabel="Deck blade Heart"
                    endNumber={0}
                    onChangeValue={handleChangeDeckBladeHeartCount}
                    startNumber={60}
                    value={deckBladeHeartCount}
                  />
                </Box>
              </Box>
            </Flex>
            <Flex gap="16px">
              <Text mb="16px" size="5" weight="bold">
                ライブ成功確率
              </Text>
              <Flex gap="4px">
                <Text mb="16px" size="5" weight="bold">
                  {liveSuccessProbability}
                </Text>
                <Text mb="16px" size="5" weight="bold">
                  %
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}
