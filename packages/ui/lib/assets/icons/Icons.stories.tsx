import { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  IconSearch,
  IconHome,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconBell,
  IconBellAlt,
  IconPlus,
  IconInfo,
  IconClose,
  IconSimulator,
  IconMore,
  IconStar,
  IconEdit,
  IconPortfolio,
  IconFlame,
} from '.';

const icons = [
  { name: 'IconSearch', Component: IconSearch },
  { name: 'IconHome', Component: IconHome },
  { name: 'IconChevronDown', Component: IconChevronDown },
  { name: 'IconChevronRight', Component: IconChevronRight },
  { name: 'IconChevronLeft', Component: IconChevronLeft },
  { name: 'IconBell', Component: IconBell },
  { name: 'IconBellAlt', Component: IconBellAlt },
  { name: 'IconPlus', Component: IconPlus },
  { name: 'IconInfo', Component: IconInfo },
  { name: 'IconClose', Component: IconClose },
  { name: 'IconSimulator', Component: IconSimulator },
  { name: 'IconMore', Component: IconMore },
  { name: 'IconStar', Component: IconStar },
  { name: 'IconEdit', Component: IconEdit },
  { name: 'IconPortfolio', Component: IconPortfolio },
  { name: 'IconFlame', Component: IconFlame },
];

const meta: Meta = {
  title: 'Assets/Icons',
};
export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <View className="flex-row flex-wrap gap-[16px] p-[24px]">
      {icons.map(({ name, Component }) => (
        <View
          key={name}
          className="items-center gap-[8px] p-[12px] border border-[#f0f0f0] rounded-[8px]"
          style={{ width: 120 }}
        >
          <Component size={24} color="#0D0B0A" />
          <Text className="text-[11px] text-[#9E928E] text-center">{name}</Text>
        </View>
      ))}
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View className="flex-row items-end gap-[24px] p-[24px]">
      {[16, 20, 24, 32, 40].map(size => (
        <View key={size} className="items-center gap-[8px]">
          <IconFlame size={size} color="#FF5A26" />
          <Text className="text-[11px] text-[#9E928E]">{size}px</Text>
        </View>
      ))}
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View className="flex-row gap-[24px] p-[24px]">
      {[
        { color: '#FF5A26', label: 'Primary' },
        { color: '#0D0B0A', label: 'Dark' },
        { color: '#9E928E', label: 'Muted' },
        { color: '#00E676', label: 'Success' },
        { color: '#FF1744', label: 'Danger' },
      ].map(({ color, label }) => (
        <View key={label} className="items-center gap-[8px]">
          <IconStar size={24} color={color} />
          <Text className="text-[11px] text-[#9E928E]">{label}</Text>
        </View>
      ))}
    </View>
  ),
};
