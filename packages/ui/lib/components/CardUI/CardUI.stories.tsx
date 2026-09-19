import { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import Card from '.';
import Typography from '../Typography';

const meta: Meta<typeof Card> = {
  title: 'Components/CardUI',
  component: Card,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'hero', 'bento'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card variant="default">
      <Typography variant="h3">총 자산</Typography>
      <Typography variant="mono">158,420,000원</Typography>
    </Card>
  ),
};

export const Hero: Story = {
  render: () => (
    <Card variant="hero">
      <Typography variant="h2">배당 수익률</Typography>
      <Typography variant="mono">+3.2%</Typography>
      <Text className="text-caption text-on-surface-variant">
        연간 배당금 기준
      </Text>
    </Card>
  ),
};

export const Bento: Story = {
  render: () => (
    <Card variant="bento">
      <Typography variant="label-md">보유 종목</Typography>
      <Typography variant="h3">12개</Typography>
    </Card>
  ),
};
