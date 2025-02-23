'use client'

import React from 'react'
import { Box, Button, Flex } from '@radix-ui/themes'
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
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,
  } = useMonochromeManager()
  return (
    <Flex direction="column" gap="8px">
      <Box>
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
        <Flex direction="column" gap="32px">
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
              ariaLabel="Deck blade Heart"
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
        </Flex>
      </Box>
    </Flex>
  )
}
