import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # MyPageScreen
 * ---
 * - 간단설명: 마이페이지 화면 (플레이스홀더)
 */
function MyPageScreenBase() {
  return (
    <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
      마이페이지
    </Text>
  );
}

export const MyPageScreen = withLayout(MyPageScreenBase);
