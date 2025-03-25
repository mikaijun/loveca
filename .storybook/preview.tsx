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
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
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
