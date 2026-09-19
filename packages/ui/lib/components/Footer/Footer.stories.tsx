import { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import Footer from '.';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => (
    <Footer>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#ff5a26]">홈</Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">
          포트폴리오
        </Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">
          시뮬레이터
        </Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">
          마이페이지
        </Text>
      </View>
    </Footer>
  ),
};

export const ActivePortfolio: Story = {
  render: () => (
    <Footer>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">홈</Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#ff5a26]">
          포트폴리오
        </Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">
          시뮬레이터
        </Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">
          마이페이지
        </Text>
      </View>
    </Footer>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <Footer styleClass={{ root: 'bg-[#0d0b0a] border-[#261e1c]' }}>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#ff5a26]">홈</Text>
      </View>
      <View className="flex-1 items-center py-xs">
        <Text className="text-label-sm font-medium text-[#9e928e]">
          포트폴리오
        </Text>
      </View>
    </Footer>
  ),
};
