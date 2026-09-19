import { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

const colors = {
  'Primary Hot Core': [
    { name: 'primary', var: '--color-primary', hex: '#ff5a26' },
    { name: 'primary-deep', var: '--color-primary-deep', hex: '#ff2e00' },
    { name: 'primary-amber', var: '--color-primary-amber', hex: '#ff9f1c' },
    { name: 'on-primary', var: '--color-on-primary', hex: '#0d0b0a' },
  ],
  Surface: [
    { name: 'background', var: '--color-background', hex: '#0d0b0a' },
    { name: 'surface', var: '--color-surface', hex: '#171311' },
    { name: 'surface-dim', var: '--color-surface-dim', hex: '#0d0b0a' },
    { name: 'on-surface', var: '--color-on-surface', hex: '#f4efef' },
    {
      name: 'on-surface-variant',
      var: '--color-on-surface-variant',
      hex: '#9e928e',
    },
  ],
  Border: [
    { name: 'outline', var: '--color-outline', hex: '#261e1c' },
    { name: 'outline-variant', var: '--color-outline-variant', hex: '#261e1c' },
  ],
  'Neutral Tones': [
    { name: 'white-smoke', var: '--color-white-smoke', hex: '#f4efef' },
    { name: 'cream-soft', var: '--color-cream-soft', hex: '#faf8f5' },
    { name: 'cool-charcoal', var: '--color-cool-charcoal', hex: '#9e928e' },
  ],
  'Yield Semantics': [
    { name: 'profit', var: '--color-profit', hex: '#00e676' },
    { name: 'loss', var: '--color-loss', hex: '#ff1744' },
    { name: 'info', var: '--color-info', hex: '#2979ff' },
  ],
  Error: [
    { name: 'error', var: '--color-error', hex: '#ff1744' },
    { name: 'on-error', var: '--color-on-error', hex: '#ffffff' },
  ],
  Legacy: [
    { name: 'black', var: '--color-black', hex: '#0d0b0a' },
    { name: 'white', var: '--color-white', hex: '#f4efef' },
    { name: 'card', var: '--color-card', hex: '#171311' },
  ],
};

function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}

function Swatch({ name, hex }: { name: string; hex: string; var: string }) {
  const textColor = isLightColor(hex) ? '#0d0b0a' : '#f4efef';
  return (
    <View
      style={{
        backgroundColor: hex,
        borderRadius: 8,
        padding: 16,
        minWidth: 160,
        borderWidth: 1,
        borderColor: '#261e1c',
      }}
    >
      <Text style={{ color: textColor, fontWeight: '600', fontSize: 14 }}>
        {name}
      </Text>
      <Text
        style={{ color: textColor, fontSize: 12, opacity: 0.8, marginTop: 4 }}
      >
        {hex}
      </Text>
    </View>
  );
}

const meta: Meta = {
  title: 'Design Tokens/ColorPalette',
};
export default meta;

type Story = StoryObj;

export const AllColors: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      {Object.entries(colors).map(([group, swatches]) => (
        <View key={group} style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#333' }}>
            {group}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {swatches.map(s => (
              <Swatch key={s.name} {...s} />
            ))}
          </View>
        </View>
      ))}
    </View>
  ),
};
