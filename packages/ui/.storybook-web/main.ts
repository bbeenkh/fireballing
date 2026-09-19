import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../lib/components/Button/**/*.stories.?(ts|tsx)',
    '../lib/components/Typography/**/*.stories.?(ts|tsx)',
    '../lib/components/Tag/**/*.stories.?(ts|tsx)',
    '../lib/components/Chip/**/*.stories.?(ts|tsx)',
    '../lib/components/Input/**/*.stories.?(ts|tsx)',
    '../lib/components/CardUI/**/*.stories.?(ts|tsx)',
    '../lib/components/Layout/**/*.stories.?(ts|tsx)',
    '../lib/components/Header/**/*.stories.?(ts|tsx)',
    '../lib/components/Footer/**/*.stories.?(ts|tsx)',
    '../lib/assets/icons/**/*.stories.?(ts|tsx)',
  ],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: config => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': resolve(__dirname, 'react-native-web-shim.tsx'),
      'react-native-svg': resolve(__dirname, 'react-native-svg-shim.tsx'),
    };
    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    return config;
  },
};
export default config;
