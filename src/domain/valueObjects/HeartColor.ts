export type HeartColor = Readonly<{
  value: 'pink' | 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'gray'
}>

export type MemberHeartColor = Exclude<HeartColor['value'], 'gray'>

export function createHeartColor(value: string): HeartColor {
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

export function getHeartColorValue(color: HeartColor): HeartColor['value'] {
  return color.value
}

/**
 * 全てのライブ用ハート色を取得
 */
export function getAllLiveHeartColors(): HeartColor[] {
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

export function getAllMemberHeartColors(): HeartColor[] {
  return [
    createHeartColor('pink'),
    createHeartColor('green'),
    createHeartColor('blue'),
    createHeartColor('red'),
    createHeartColor('yellow'),
    createHeartColor('purple'),
  ]
}
