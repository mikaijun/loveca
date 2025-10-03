export type HeartColor =
  | 'pink'
  | 'green'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'gray'
  | 'all'

export type MemberHeartColor = Exclude<HeartColor, 'gray'>
export type RequiredLiveHeartColor = Exclude<HeartColor, 'all'>

export const liveHeartColors: HeartColor[] = [
  'pink',
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
  'gray',
]

export const memberHeartColors: MemberHeartColor[] = [
  'pink',
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
]

export const isGrayHeart = (color: HeartColor): boolean => {
  return color === 'gray'
}
