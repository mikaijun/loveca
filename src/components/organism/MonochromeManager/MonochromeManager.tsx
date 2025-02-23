'use client'

import React from 'react'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Heart, RotateCcw, Theater, UsersRound } from 'lucide-react'

import { HeartSummary } from '@atoms/HeartSummary'
import { NumberSelect } from '@molecules/NumberSelect'
import { useMonochromeManager } from '@organism/MonochromeManager/MonochromeManager.hooks'
import { colors } from '@constants/colors'

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
      <Button
        color="red"
        onClick={handleResetHeart}
        radius="large"
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <RotateCcw size="16px" />
        リセット
      </Button>
      <Flex direction="column" gap="16px">
        <HeartSummary
          count={requiredBladeHeartCount}
          icon={<Heart size="20px" style={{ transform: 'rotate(-90deg)' }} />}
          label="必要ブレードハート数:"
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
          <HeartSummary
            count={requiredLiveHeartCount}
            icon={<Theater size="20px" />}
            label="ライブ成功必要ハート数:"
          />
          <NumberSelect
            ariaLabel="Required Live Heart"
            endNumber={40}
            mt="2"
            onChangeValue={handleRequiredLiveHeartCount}
            startNumber={0}
            style={{
              width: '56px',
            }}
            value={requiredLiveHeartCount}
          />
        </Box>
        <Box
          style={{
            backgroundColor: colors.blue[2],
            padding: '16px',
          }}
        >
          <HeartSummary
            count={memberHeartCount}
            icon={<UsersRound size="20px" />}
            label="メンバーのハート合計数:"
          />
          <NumberSelect
            ariaLabel="Member Heart"
            endNumber={40}
            mt="2"
            onChangeValue={handleChangeMemberHeartCount}
            startNumber={0}
            style={{
              width: '56px',
            }}
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
                  style={{
                    width: '60px',
                  }}
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
