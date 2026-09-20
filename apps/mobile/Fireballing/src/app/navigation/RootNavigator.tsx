import React from 'react';
import { useAuthStore } from '@/entities/auth';
import { AuthStack } from './AuthStack';
import { WithNavigator } from './withNavigator';

/**
 * # RootNavigator
 * ---
 * - 간단설명: 인증 상태에 따라 AuthStack 또는 WithNavigator를 조건부 렌더링
 * - 제약사항 및 특이사항:
 *   - useAuthStore의 isLoggedIn 구독으로 자동 전환
 *   - 로그인 시 WithNavigator(하단 탭), 비로그인 시 AuthStack 표시
 */
export function RootNavigator() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  return isLoggedIn ? <WithNavigator /> : <AuthStack />;
}
