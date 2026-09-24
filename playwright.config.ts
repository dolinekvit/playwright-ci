import { defineConfig, devices } from "playwright/test"

export default defineConfig({
  testDir: 'tests',
  forbidOnly: Boolean(process.env.CI),
  // list = human-readable console; junit = machine-readable for Jenkins.
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/e2e-junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:5174'
  },
  // Boot the app before e2e tests and wait until it responds.
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
