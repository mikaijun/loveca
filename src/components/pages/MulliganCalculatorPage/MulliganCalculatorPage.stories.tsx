import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '@radix-ui/themes'
import { MulliganCalculatorPage } from './MulliganCalculatorPage'

const meta = {
  component: MulliganCalculatorPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MulliganCalculatorPage>

export default meta

export const Default: StoryObj<typeof MulliganCalculatorPage> = {
  render: () => (
    <Container p="8px" size="2">
      <MulliganCalculatorPage />
    </Container>
  ),
}
