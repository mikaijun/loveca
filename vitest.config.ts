import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // Make sure jsdom is being used for browser-like tests
    globals: true, // This ensures globals like `expect` are available
  },
  resolve: {
    alias: {
      '@atoms/': path.join(__dirname, 'src/components/atoms/'),
      '@molecules/': path.join(__dirname, 'src/components/molecules/'),
      '@organism/': path.join(__dirname, 'src/components/organism/'),
      '@templates/': path.join(__dirname, 'src/components/templates/'),
      '@pages/': path.join(__dirname, 'src/components/pages/'),
      '@constants/': path.join(__dirname, 'src/constants/'),
    },
  },
})
