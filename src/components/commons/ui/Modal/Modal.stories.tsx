import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '@radix-ui/themes'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    trigger: <Button>新曲を確認する</Button>,
    children: (
      <div>
        <h2>おいでよ！石川大観光</h2>
        <p>歌：蓮ノ空女学院スクールアイドルクラブ</p>
      </div>
    ),
  },
}
