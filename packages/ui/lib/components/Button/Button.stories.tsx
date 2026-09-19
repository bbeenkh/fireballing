import { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
  render: (args) => (
    <Button {...args}>
      <Text className="text-on-primary text-label-md">매수하기</Text>
    </Button>
  ),
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => (
    <Button {...args}>
      <Text className="text-on-surface text-label-md">취소</Text>
    </Button>
  ),
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => (
    <Button {...args}>
      <Text className="text-primary text-label-md">더보기</Text>
    </Button>
  ),
};

export const Link: Story = {
  args: { variant: 'link' },
  render: (args) => (
    <Button {...args}>
      <Text className="text-primary text-label-md">전체보기</Text>
    </Button>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
  render: (args) => (
    <Button {...args} disabled>
      <Text className="text-on-primary text-label-md">비활성화</Text>
    </Button>
  ),
};
