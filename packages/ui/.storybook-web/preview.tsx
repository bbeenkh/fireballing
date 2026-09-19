import type { Preview } from '@storybook/react';
import '../lib/index.css';
import './storybook-rn-compat.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0d0b0a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
