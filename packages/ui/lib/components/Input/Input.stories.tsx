import { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled'],
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
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    variant: 'default',
    label: '종목명',
    placeholder: '검색어 입력',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: '금액을 입력하세요',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    placeholder: '비활성화된 입력창',
    editable: false,
  },
};
