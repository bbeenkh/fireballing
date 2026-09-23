import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # LoginScreen
 * ---
 * - 간단설명: 로그인 화면 (플레이스홀더)
 */
function LoginScreenBase() {
  return <Text className="text-[20px] p-md text-[#1a1a1a]">로그인</Text>;
}

export const LoginScreen = withLayout(LoginScreenBase);
