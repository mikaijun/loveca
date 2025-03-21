'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { Heart } from 'lucide-react'

import { VscWand } from 'react-icons/vsc'
import { BsPersonHearts } from 'react-icons/bs'
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
    handleChangeMemberHeartCount,
    handleRequiredLiveHeartCount,
    handleResetHeart,
  } = useMonochromeManager()
  return (
    <Flex direction="column" gap="8px">
      <ResetButton
        onReset={handleResetHeart}
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Flex direction="column" gap="24px">
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
            icon={<VscWand size="20px" />}
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
            icon={<BsPersonHearts size="20px" />}
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
      </Flex>
    </Flex>
  )
}
