import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { HeartManagerPage } from '.'

export default {
  component: HeartManagerPage,
} as Meta<typeof HeartManagerPage>

export const Default: StoryObj<typeof HeartManagerPage> = {
  render: () => (
    <Container p="8px" size="2">
      <HeartManagerPage />
    </Container>
  ),
}
