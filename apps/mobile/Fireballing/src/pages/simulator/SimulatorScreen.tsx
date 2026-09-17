import React from 'react';
import { View } from 'react-native';
import { Typography } from '@fblg/mobile-ui';

/**
 * # SimulatorScreen
 * ---
 * - 간단설명: 시뮬레이터 탭 플레이스홀더 스크린
 */
export function SimulatorScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Typography variant="h2">시뮬레이터</Typography>
    </View>
  );
}
