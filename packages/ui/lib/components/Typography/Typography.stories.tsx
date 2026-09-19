import { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Typography from '.';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'body',
        'caption',
        'mono',
        'label-md',
        'label-sm',
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  render: () => (
    <View className="gap-sm">
      <Typography variant="h1">H1 — 파이어볼링</Typography>
      <Typography variant="h2">H2 — 총 자산</Typography>
      <Typography variant="h3">H3 — 보유 종목</Typography>
      <Typography variant="body">Body — 본문 텍스트입니다</Typography>
      <Typography variant="caption">Caption — 부가 설명</Typography>
      <Typography variant="mono">Mono — 158,420,000원</Typography>
      <Typography variant="label-md">Label MD — 라벨</Typography>
      <Typography variant="label-sm">Label SM — 작은 라벨</Typography>
    </View>
  ),
};
