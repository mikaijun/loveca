import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { HeartColorSettingsModal } from './HeartColorSettingsModal'
import { MemberHeartColor } from '@constants/hearts'

export default {
  title: 'Organisms/HeartColorSettingsModal',
  component: HeartColorSettingsModal,
} as Meta<typeof HeartColorSettingsModal>

const DEFAULT_HEART_COLORS: MemberHeartColor[] = [
  'pink',
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
]

export const Default: StoryObj<typeof HeartColorSettingsModal> = {
  render: () => {
    const [requiredLiveHeartColorList, setRequiredLiveHeartColorList] =
      useState<MemberHeartColor[]>(DEFAULT_HEART_COLORS)
    const [memberHeartColorList, setMemberHeartColorList] =
      useState<MemberHeartColor[]>(DEFAULT_HEART_COLORS)
    return (
      <>
        <HeartColorSettingsModal
          memberHeartColorList={memberHeartColorList}
          onChangeMemberHeartColor={setMemberHeartColorList}
          onChangeRequiredLiveHeartColor={setRequiredLiveHeartColorList}
          requiredLiveHeartColorList={requiredLiveHeartColorList}
        />
      </>
    )
  },
}

export const Empty: StoryObj<typeof HeartColorSettingsModal> = {
  render: () => {
    const [requiredLiveHeartColorList, setRequiredLiveHeartColorList] =
      useState<MemberHeartColor[]>([])
    const [memberHeartColorList, setMemberHeartColorList] = useState<
      MemberHeartColor[]
    >([])
    return (
      <>
        <HeartColorSettingsModal
          memberHeartColorList={memberHeartColorList}
          onChangeMemberHeartColor={setMemberHeartColorList}
          onChangeRequiredLiveHeartColor={setRequiredLiveHeartColorList}
          requiredLiveHeartColorList={requiredLiveHeartColorList}
        />
      </>
    )
  },
}
