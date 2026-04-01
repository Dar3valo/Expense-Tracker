// @ts-check
import { defineConfig, devices } from '@playwright/test';

// Fix 4: Actually load .env variables so tests can use env-based config (e.g. VITE_API_URL)
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  // Fix 1: Only test in Chromium during development — add others back when needed
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    // Fix 2: Fail fast if the dev server doesn't start within 2 minutes
    timeout: 120000,
    // Fix 3: Pipe server output so you can debug startup failures
    stdout: 'pipe',
    stderr: 'pipe',
  },
});

