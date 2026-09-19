import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'search', 'compact'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    editable: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    variant: 'default',
    label: '종목명',
    placeholder: '검색어를 입력하세요',
  },
};

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: '검색',
  },
  render: args => (
    <Input
      {...args}
      leftIcon={<Text className="text-[#9e928e] text-[14px]">🔍</Text>}
    />
  ),
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    placeholder: '0',
    keyboardType: 'numeric',
  },
  render: args => (
    <View style={{ width: 80 }}>
      <Input {...args} />
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-[24px] p-[16px]">
      <Input
        variant="default"
        label="종목명"
        placeholder="검색어를 입력하세요"
      />
      <Input
        variant="search"
        placeholder="검색"
        leftIcon={<Text className="text-[#9e928e] text-[14px]">🔍</Text>}
      />
      <View style={{ width: 80 }}>
        <Input variant="compact" placeholder="0" />
      </View>
    </View>
  ),
};
