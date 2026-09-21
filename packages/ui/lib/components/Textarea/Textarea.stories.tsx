import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Textarea from '.';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    maxCharLength: { control: 'number' },
    currentLength: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: '프로필 이름을 입력해주세요',
    maxCharLength: 300,
    currentLength: 0,
  },
};

export const WithoutCounter: Story = {
  args: {
    placeholder: '자유롭게 입력해주세요',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-lg p-md">
      <Textarea
        placeholder="프로필 이름을 입력해주세요"
        maxCharLength={300}
        currentLength={0}
      />
      <Textarea placeholder="카운터 없는 텍스트 영역" />
    </View>
  ),
};
