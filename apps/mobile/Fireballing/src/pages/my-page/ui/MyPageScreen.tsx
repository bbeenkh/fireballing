import React from 'react';
import { Text } from 'react-native';
import { ScreenLayout } from '@/shared/ui/ScreenLayout';

/**
 * # MyPageScreen
 * ---
 * - 간단설명: 마이페이지 화면 (플레이스홀더)
 */
export function MyPageScreen() {
  return (
    <ScreenLayout>
      <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>마이페이지</Text>
    </ScreenLayout>
  );
}
