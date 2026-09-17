import { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Tag from '.';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['profit', 'loss', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const AutoDetect: Story = {
  render: () => (
    <View className="flex-row gap-md">
      <Tag>+1.8%</Tag>
      <Tag>-1.32%</Tag>
      <Tag>0.00%</Tag>
    </View>
  ),
};

export const ExplicitIntent: Story = {
  render: () => (
    <View className="flex-row gap-md">
      <Tag intent="profit">수익</Tag>
      <Tag intent="loss">손실</Tag>
      <Tag intent="neutral">보합</Tag>
    </View>
  ),
};
