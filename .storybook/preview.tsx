import React from 'react'
import type { Preview } from '@storybook/react'
import { Theme } from '@radix-ui/themes'
import './global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Theme>
          <Story />
        </Theme>
      )
    },
  ],
}

export default preview
