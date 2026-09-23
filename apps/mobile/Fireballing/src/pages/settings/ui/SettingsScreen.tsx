import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # SettingsScreen
 * ---
 * - 간단설명: 설정 화면 (플레이스홀더)
 */
function SettingsScreenBase() {
  return <Text className="text-[20px] p-md text-[#1a1a1a]">설정</Text>;
}

export const SettingsScreen = withLayout(SettingsScreenBase);
