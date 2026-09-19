module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', '**/__mocks__/**'],
      env: {jest: true},
    },
  ],
};
