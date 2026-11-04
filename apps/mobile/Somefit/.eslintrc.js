module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['vendor/**'],
  overrides: [
    {
      files: ['jest.setup.js', '**/__mocks__/**'],
      env: {jest: true},
    },
  ],
};
