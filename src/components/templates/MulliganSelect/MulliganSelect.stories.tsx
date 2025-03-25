import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { MulliganSelect } from './MulliganSelect'

export default {
  title: 'Templates/MulliganSelect',
  component: MulliganSelect,
} as Meta<typeof MulliganSelect>

export const Default: StoryObj<typeof MulliganSelect> = {
  render: () => (
    <Container p="8px" size="2">
      <MulliganSelect />
    </Container>
  ),
}
