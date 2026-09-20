import React from 'react';
import { Text } from 'react-native';
import { ScreenLayout } from '@/shared/ui/ScreenLayout';

/**
 * # TermsScreen
 * ---
 * - 간단설명: 이용약관 화면 (플레이스홀더)
 */
export function TermsScreen() {
  return (
    <ScreenLayout>
      <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
        이용약관
      </Text>
    </ScreenLayout>
  );
}
