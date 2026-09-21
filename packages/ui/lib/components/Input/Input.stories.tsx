import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    maxCharLength: { control: 'number' },
    currentLength: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '프로필 이름을 입력해주세요',
    maxCharLength: 10,
    currentLength: 0,
  },
};

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '프로필 이름을 입력해주세요',
    maxCharLength: 10,
    currentLength: 3,
  },
};

export const WithoutCounter: Story = {
  args: {
    placeholder: '입력해주세요',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-lg p-md">
      <Input
        placeholder="프로필 이름을 입력해주세요"
        maxCharLength={10}
        currentLength={0}
      />
      <Input
        label="이름"
        placeholder="프로필 이름을 입력해주세요"
        maxCharLength={10}
        currentLength={3}
      />
      <Input placeholder="카운터 없는 입력" />
    </View>
  ),
};
