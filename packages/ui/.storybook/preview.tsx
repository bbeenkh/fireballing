import React from 'react';
import { View } from 'react-native';
import type { Preview } from '@storybook/react-native';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;
