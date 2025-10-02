export type HeartColor = Readonly<{
  value: 'pink' | 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'gray'
}>

export type MemberHeartColor = Exclude<HeartColor['value'], 'gray'>

export const createHeartColor = (value: string): HeartColor => {
  const validColors: HeartColor['value'][] = [
    'pink',
    'green',
    'blue',
    'red',
    'yellow',
    'purple',
    'gray',
  ]

  if (!validColors.includes(value as HeartColor['value'])) {
    throw new Error(`無効なハートの色です: ${value}`)
  }

  return { value: value as HeartColor['value'] }
}

export const getHeartColorValue = (color: HeartColor): HeartColor['value'] => {
  return color.value
}

/**
 * 全てのライブ用ハート色を取得
 */
export const getAllLiveHeartColors = (): HeartColor[] => {
  return [
    createHeartColor('pink'),
    createHeartColor('green'),
    createHeartColor('blue'),
    createHeartColor('red'),
    createHeartColor('yellow'),
    createHeartColor('purple'),
    createHeartColor('gray'),
  ]
}

export const getAllMemberHeartColors = (): HeartColor[] => {
  return [
    createHeartColor('pink'),
    createHeartColor('green'),
    createHeartColor('blue'),
    createHeartColor('red'),
    createHeartColor('yellow'),
    createHeartColor('purple'),
  ]
}
