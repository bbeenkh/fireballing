import type { Meta, StoryObj } from '@storybook/react';
import Chip from '.';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    selected: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: [
        'selection',
        'filter',
        'compliance',
        'subtle',
        'value',
        'account',
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Selection: Story = {
  args: { variant: 'selection', selected: false, children: 'KRW' },
};

export const SelectionSelected: Story = {
  name: 'Selection (Selected)',
  args: { variant: 'selection', selected: true, children: 'USD' },
};

export const Filter: Story = {
  render: () => (
    <Chip.Group>
      <Chip variant="filter" selected>
        전체
      </Chip>
      <Chip variant="filter">최신순</Chip>
      <Chip variant="filter">인기순</Chip>
    </Chip.Group>
  ),
};

export const Compliance: Story = {
  args: { variant: 'compliance', children: 'KYC 인증 완료' },
};

export const Subtle: Story = {
  args: { variant: 'subtle', children: '추가 정보' },
};

export const Value: Story = {
  args: { variant: 'value', children: '₩12,345' },
};

export const Account: Story = {
  args: { variant: 'account', children: 'Pro 계정' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#9e928e', width: 100, fontSize: 12 }}>
          Selection
        </span>
        <Chip variant="selection">미선택</Chip>
        <Chip variant="selection" selected>
          선택됨
        </Chip>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#9e928e', width: 100, fontSize: 12 }}>
          Filter
        </span>
        <Chip variant="filter">미선택</Chip>
        <Chip variant="filter" selected>
          선택됨
        </Chip>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#9e928e', width: 100, fontSize: 12 }}>
          Compliance
        </span>
        <Chip variant="compliance">KYC 인증</Chip>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#9e928e', width: 100, fontSize: 12 }}>
          Subtle
        </span>
        <Chip variant="subtle">추가 정보</Chip>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#9e928e', width: 100, fontSize: 12 }}>
          Value
        </span>
        <Chip variant="value">₩12,345</Chip>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#9e928e', width: 100, fontSize: 12 }}>
          Account
        </span>
        <Chip variant="account">Pro 계정</Chip>
      </div>
    </div>
  ),
};
