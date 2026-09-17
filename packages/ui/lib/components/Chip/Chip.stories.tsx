import { Meta, StoryObj } from '@storybook/react';
import Chip from '.';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    selected: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { selected: false, children: 'KRW' },
};

export const Selected: Story = {
  args: { selected: true, children: 'USD' },
};

export const Group: Story = {
  render: () => (
    <Chip.Group>
      <Chip selected>KRW</Chip>
      <Chip>USD</Chip>
      <Chip>JPY</Chip>
    </Chip.Group>
  ),
};
