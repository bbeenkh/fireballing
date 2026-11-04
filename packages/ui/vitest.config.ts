import { defineReactConfig } from '@somefit/testing-config';

export default defineReactConfig({
  test: {
    setupFiles: ['@somefit/testing-config/setup/radix-polyfill'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/lib/components/original/**',
    ],
  },
});
