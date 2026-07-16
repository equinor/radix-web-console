import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitest.dev/config/
export default defineConfig({
  test: {
    projects: [
      {
        // Plain unit & component tests running in jsdom.
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/setupTests.js',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
        },
      },
      {
        // Runs every *.stories.tsx as a browser test (render + a11y) via Playwright.
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
