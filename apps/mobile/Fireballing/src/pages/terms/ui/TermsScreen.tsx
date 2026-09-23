import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # TermsScreen
 * ---
 * - 간단설명: 이용약관 화면 (플레이스홀더)
 */
function TermsScreenBase() {
  return <Text className="text-[20px] p-md text-[#1a1a1a]">이용약관</Text>;
}

export const TermsScreen = withLayout(TermsScreenBase);
