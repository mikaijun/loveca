/**
 * ラブカに存在するハートの色
 */
export type HeartIconProps = {
  color: 'pink' | 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'gray'
}

type MemberHeartColor = Exclude<HeartIconProps['color'], 'gray'>

/**
 * ライブに必要なハートの色の配列
 */
export const requiredLiveHeartColors: HeartIconProps['color'][] = [
  'pink',
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
  'gray',
]

/**
 * メンバーが持っているハートの色の配列
 *
 * ("pink" | "green" | "blue" | "red" | "yellow" | "purple")[]
 */
export const memberHeartColors: MemberHeartColor[] =
  requiredLiveHeartColors.filter(
    (color): color is MemberHeartColor => color !== 'gray'
  )
