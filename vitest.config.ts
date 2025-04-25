import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // Make sure jsdom is being used for browser-like tests
    globals: true, // This ensures globals like `expect` are available
  },
  resolve: {
    alias: {
      '@templates/': path.join(__dirname, 'src/components/templates/'),
      '@constants/': path.join(__dirname, 'src/constants/'),
      '@components/': path.join(__dirname, 'src/components/'),
    },
  },
})
