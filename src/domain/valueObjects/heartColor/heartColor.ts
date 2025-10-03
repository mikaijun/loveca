export type HeartColor =
  | 'pink'
  | 'green'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'gray'

export type MemberHeartColor = Exclude<HeartColor, 'gray'>

export const liveHeartColors: HeartColor[] = [
  'pink',
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
  'gray',
]

export const allMemberHeartColors: HeartColor[] = [
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
