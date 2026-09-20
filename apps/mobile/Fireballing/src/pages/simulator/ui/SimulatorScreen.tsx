import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # SimulatorScreen
 * ---
 * - 간단설명: 시뮬레이터 화면 (플레이스홀더)
 */
function SimulatorScreenBase() {
  return (
    <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
      시뮬레이터
    </Text>
  );
}

export const SimulatorScreen = withLayout(SimulatorScreenBase);
