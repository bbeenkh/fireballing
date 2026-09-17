import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: [
    '../lib/components/Button/**/*.stories.?(ts|tsx)',
    '../lib/components/Typography/**/*.stories.?(ts|tsx)',
    '../lib/components/Tag/**/*.stories.?(ts|tsx)',
    '../lib/components/Chip/**/*.stories.?(ts|tsx)',
    '../lib/components/Input/**/*.stories.?(ts|tsx)',
    '../lib/components/CardUI/**/*.stories.?(ts|tsx)',
  ],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
    };
    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    return config;
  },
};
export default config;
