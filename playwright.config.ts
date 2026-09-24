import { defineConfig, devices } from "playwright/test"

export default defineConfig({
  testDir: 'tests',
  forbidOnly: Boolean(process.env.CI),
  use: {
    baseURL: 'http://localhost:5174'
  },
  // Boot the app before e2e tests and wait until it responds.
  // `npm run build` (in the Jenkinsfile) produces dist/, which `vite preview` serves.
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
