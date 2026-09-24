import { defineConfig, devices } from "playwright/test"

export default defineConfig({
  testDir: 'tests',
  forbidOnly: Boolean(process.env.CI),
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/e2e-junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:5174'
  },
  webServer: {
    command: 'npm run preview -- --port 5174 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
