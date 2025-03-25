import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { HeartManagerPage } from './HeartManagerPage'

export default {
  title: 'Pages/HeartManagerPage',
  component: HeartManagerPage,
} as Meta<typeof HeartManagerPage>

export const Default: StoryObj<typeof HeartManagerPage> = {
  render: () => <HeartManagerPage />,
}
