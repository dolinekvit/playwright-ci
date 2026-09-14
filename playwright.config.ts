import { defineConfig, devices } from "playwright/test"

export default defineConfig({
  testDir: 'tests',
  forbidOnly: Boolean(process.env.CI),
  use: {
    baseURL: 'http://localhost:5174'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
