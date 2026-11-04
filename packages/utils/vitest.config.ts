import { defineNodeConfig } from '@somefit/testing-config';

export default defineNodeConfig({
  test: {
    include: ['**/*.test.ts', '**/*.spec.ts'],
    exclude: ['**/node_modules/**'],
    passWithNoTests: true,
  },
});
