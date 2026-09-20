import React from 'react';
import { Text } from 'react-native';
import { ScreenLayout } from '@/shared/ui/ScreenLayout';

/**
 * # SimulatorScreen
 * ---
 * - 간단설명: 시뮬레이터 화면 (플레이스홀더)
 */
export function SimulatorScreen() {
  return (
    <ScreenLayout>
      <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>시뮬레이터</Text>
    </ScreenLayout>
  );
}
