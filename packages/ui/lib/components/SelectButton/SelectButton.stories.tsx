import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SelectButton from '.';

const meta: Meta<typeof SelectButton> = {
  title: 'Components/SelectButton',
  component: SelectButton,
  argTypes: {
    selected: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof SelectButton>;

const OPTIONS = ['일반', 'ISA', '연금'] as const;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('일반');
    return (
      <SelectButton.Group label="계좌 유형">
        {OPTIONS.map(opt => (
          <SelectButton
            key={opt}
            selected={selected === opt}
            onPress={() => setSelected(opt)}
          >
            {opt}
          </SelectButton>
        ))}
      </SelectButton.Group>
    );
  },
};

export const Selected: Story = {
  render: () => (
    <SelectButton.Group label="계좌 유형">
      <SelectButton>일반</SelectButton>
      <SelectButton selected>ISA</SelectButton>
      <SelectButton>연금</SelectButton>
    </SelectButton.Group>
  ),
};

export const WithoutLabel: Story = {
  render: () => {
    const [selected, setSelected] = useState('일반');
    return (
      <SelectButton.Group>
        {OPTIONS.map(opt => (
          <SelectButton
            key={opt}
            selected={selected === opt}
            onPress={() => setSelected(opt)}
          >
            {opt}
          </SelectButton>
        ))}
      </SelectButton.Group>
    );
  },
};
