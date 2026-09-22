import React from 'react';
import { View } from 'react-native';
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
 * - 간단설명: 앱 루트 네비게이터 — AppTabs(하단 탭) 직접 렌더링
 * - 제약사항 및 특이사항:
 *   - 인증 플로우 미구현 상태이므로 바로 메인 화면 진입
 */
export function RootNavigator() {
  return <AppTabs />;
}
