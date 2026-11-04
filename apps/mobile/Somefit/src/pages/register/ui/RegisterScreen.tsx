import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # RegisterScreen
 * ---
 * - 간단설명: 회원가입 화면 (플레이스홀더)
 */
function RegisterScreenBase() {
  return (
    <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
      회원가입
    </Text>
  );
}

export const RegisterScreen = withLayout(RegisterScreenBase);
