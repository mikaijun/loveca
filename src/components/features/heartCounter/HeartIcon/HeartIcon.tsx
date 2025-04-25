import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Heart, Plus, Asterisk, Minus, Sparkle, Diamond } from 'lucide-react'
import { colors } from '@constants/colors'
import { HeartIconProps } from '@constants/hearts'

const iconMap = {
  pink: Plus,
  green: Asterisk,
  blue: Minus,
  red: Heart,
  yellow: Sparkle,
  purple: Diamond,
  gray: null,
}

const colorMap = {
  pink: colors.crimson[9],
  green: colors.grass[9],
  blue: colors.blue[8],
  red: colors.tomato[9],
  yellow: colors.amber[9],
  purple: colors.purple[10],
  gray: colors.slate[11],
}

export const HeartIcon: React.FC<HeartIconProps> = ({ color }) => {
  const Icon = iconMap[color]
  const iconColor = colorMap[color]
  // NOTE: ハートの中のアイコンは種類によってサイズが異なるため、サイズを調整する
  const iconSize = ['red', 'purple', 'yellow'].includes(color) ? '8px' : '14px'

  return (
    <Flex
      align="center"
      data-testid="heart-icon"
      height="32px"
      justify="center"
      position="relative"
      width="32px"
    >
      <Heart
        color={colors.white}
        fill={colors.white}
        size="28px"
        style={{ position: 'absolute' }}
      />
      <Heart
        color={iconColor}
        fill={iconColor}
        size="24px"
        style={{ position: 'absolute' }}
      />
      {Icon && (
        <Flex
          align="center"
          data-testid="heart-icon-inner-icon"
          display="flex"
          height="100%"
          justify="center"
          position="absolute"
          width="100%"
        >
          <Icon color={colors.white} fill={colors.white} size={iconSize} />
        </Flex>
      )}
    </Flex>
  )
}
