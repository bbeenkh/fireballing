import { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import Header from '.';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => (
    <Header>
      <View className="flex-row gap-[8px] items-center">
        <Text className="text-[18px] font-medium tracking-[-1px] text-[#0d0b0a]">
          fireballing
        </Text>
      </View>
    </Header>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Header>
      <View className="flex-row gap-[8px] items-center">
        <Text className="text-[18px] font-medium tracking-[-1px] text-[#0d0b0a]">
          fireballing
        </Text>
      </View>
      <Text className="text-[14px] text-[#9e928e]">🔔</Text>
    </Header>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <Header styleClass={{ root: 'bg-[#0d0b0a]' }}>
      <Text className="text-[18px] font-medium tracking-[-1px] text-white">
        fireballing
      </Text>
    </Header>
  ),
};
