import { useCallback } from 'react'
import { HeartColorSettingsModalProps } from '.'
import { MemberHeartColor, memberHeartColors } from '@constants/hearts'

export const useHeartColorSettingsModal = ({
  onChangeRequiredLiveHeartColor,
  onChangeMemberHeartColor,
}: Pick<
  HeartColorSettingsModalProps,
  'onChangeMemberHeartColor' | 'onChangeRequiredLiveHeartColor'
>) => {
  const createHandleChange = useCallback(
    (onChange: (values: MemberHeartColor[]) => void) => {
      return (values: string[]) => {
        const validValues = memberHeartColors.filter((color) =>
          values.includes(color)
        )
        if (validValues.length === values.length) {
          onChange(validValues)
        } else {
          throw new Error('ハートの色に無効な値が指定されました')
        }
      }
    },
    []
  )

  const handleChangeRequiredLiveHeartColor = createHandleChange(
    onChangeRequiredLiveHeartColor
  )

  const handleChangeMemberHeartColor = createHandleChange(
    onChangeMemberHeartColor
  )

  return {
    handleChangeRequiredLiveHeartColor,
    handleChangeMemberHeartColor,
  }
}
