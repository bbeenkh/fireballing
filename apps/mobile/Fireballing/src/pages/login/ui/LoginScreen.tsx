import React from 'react';
import { Text } from 'react-native';
import { ScreenLayout } from '@/shared/ui/ScreenLayout';

/**
 * # LoginScreen
 * ---
 * - 간단설명: 로그인 화면 (플레이스홀더)
 */
export function LoginScreen() {
  return (
    <ScreenLayout>
      <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
        로그인
      </Text>
    </ScreenLayout>
  );
}
