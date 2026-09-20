import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '@/entities/auth';
import { AuthStack } from './AuthStack';
import { withNavigator } from './withNavigator';

/**
 * # AppTabs
 * ---
 * - 간단설명: withNavigator HOC로 감싼 탭 네비게이터 컴포넌트
 */
const AppTabs = withNavigator(View);

/**
 * # RootNavigator
 * ---
 * - 간단설명: 인증 상태에 따라 AuthStack 또는 AppTabs를 조건부 렌더링
 * - 제약사항 및 특이사항:
 *   - useAuthStore의 isLoggedIn 구독으로 자동 전환
 *   - 로그인 시 AppTabs(하단 탭), 비로그인 시 AuthStack 표시
 */
export function RootNavigator() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  return isLoggedIn ? <AppTabs /> : <AuthStack />;
}
