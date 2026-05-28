import { defineConfig } from '@playwright/test';

export default defineConfig({

    reporter: 'html',

  // Retry failed tests
  retries: 0,

  // Test timeout
  timeout: 30000,



  use: {

    //baseURL for all tests
    baseURL: 'https://www.amazon.in',

    // Browser
    browserName: 'chromium',

    // Headed mode
    headless: false,

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Capture trace on retry
    trace: 'on-first-retry',

    fullyParallel: false,
  },

});