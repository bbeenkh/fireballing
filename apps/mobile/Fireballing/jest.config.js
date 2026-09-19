module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '^(?!.*node_modules/(@react-native|react-native|react-native-.*|@react-navigation|@react-native-async-storage|@react-native-community|@react-native-google-signin|@revopush|@sentry|@gorhom|@tanstack|@lukemorales|nativewind|react-native-css-interop|@fblg|react-error-boundary|zustand|immer|zod|axios)/).*node_modules/',
  ],
};
