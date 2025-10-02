export type HeartColor =
  | 'pink'
  | 'green'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'gray'

export type MemberHeartColor = Exclude<HeartColor, 'gray'>

export const createHeartColor = (value: string): HeartColor => {
  const validColors: HeartColor[] = [
    'pink',
    'green',
    'blue',
    'red',
    'yellow',
    'purple',
    'gray',
  ]

  if (!validColors.includes(value as HeartColor)) {
    throw new Error(`無効なハートの色です: ${value}`)
  }

  return value as HeartColor
}

export const getAllLiveHeartColors = (): HeartColor[] => {
  return ['pink', 'green', 'blue', 'red', 'yellow', 'purple', 'gray']
}

export const getAllMemberHeartColors = (): HeartColor[] => {
  return ['pink', 'green', 'blue', 'red', 'yellow', 'purple']
}

export const isGrayHeart = (color: HeartColor): boolean => {
  return color === 'gray'
}
