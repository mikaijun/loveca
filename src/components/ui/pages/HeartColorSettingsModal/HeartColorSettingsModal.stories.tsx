import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { HeartColorSettingsModal } from './HeartColorSettingsModal'
import { HeartColor } from '@domain/valueObjects/heartColor/heartColor'
import {
  liveHeartColors,
  memberHeartColors,
} from '@domain/valueObjects/heartColor/heartColor'

export default {
  component: HeartColorSettingsModal,
} as Meta<typeof HeartColorSettingsModal>

export const Default: StoryObj<typeof HeartColorSettingsModal> = {
  render: () => {
    const [requiredLiveHeartColorList, setRequiredLiveHeartColorList] =
      useState<HeartColor[]>(liveHeartColors)
    const [memberHeartColorList, setMemberHeartColorList] =
      useState<HeartColor[]>(memberHeartColors)
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
      useState<HeartColor[]>([])
    const [memberHeartColorList, setMemberHeartColorList] = useState<
      HeartColor[]
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
