import { defineConfig, devices } from '@playwright/test';
require('dotenv').config()

const isHeadless = process.env.HEADLESS !== 'false';
export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 30_000 },
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  outputDir: 'videos',
  use: {
    ignoreHTTPSErrors: true,
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: {
      mode: 'on',
      size: { width: 1024, height: 768 }
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...(isHeadless ? {} : devices['Desktop Chrome']), // Apply 'Desktop Chrome' only in headed mode
        viewport: null, // Enables full-screen behavior
        headless: isHeadless, // Ensures correct mode
        launchOptions: {
          args: isHeadless ? ['--window-size=1920,1080'] : [], // Forces 1080p fullscreen in headless mode
        },
      },
    },
  ],
});
