import { Meta, StoryObj } from '@storybook/react';
import Tip from '.';

const meta: Meta<typeof Tip> = {
  title: 'Components/Tip',
  component: Tip,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['guidance', 'info', 'insight'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tip>;

export const Guidance: Story = {
  args: {
    variant: 'guidance',
    title: '알고 계셨나요?',
    description: '이 기능을 사용하면 작업 효율이 30% 향상됩니다.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    description: '참고: 이 설정은 다음 세션부터 적용됩니다.',
  },
};

export const Insight: Story = {
  args: {
    variant: 'insight',
    title: '주간 인사이트',
    description: '지난 7일간 방문자 수가 15% 증가했습니다.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Tip
        variant="guidance"
        title="알고 계셨나요?"
        description="이 기능을 사용하면 작업 효율이 30% 향상됩니다."
      />
      <Tip
        variant="info"
        description="참고: 이 설정은 다음 세션부터 적용됩니다."
      />
      <Tip
        variant="insight"
        title="주간 인사이트"
        description="지난 7일간 방문자 수가 15% 증가했습니다."
      />
    </>
  ),
};
