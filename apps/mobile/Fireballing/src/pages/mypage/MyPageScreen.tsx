import React from 'react';
import { View } from 'react-native';
import { Typography } from '@fblg/mobile-ui';

/**
 * # MyPageScreen
 * ---
 * - 간단설명: 마이페이지 탭 플레이스홀더 스크린
 */
export function MyPageScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Typography variant="h2">마이페이지</Typography>
    </View>
  );
}
