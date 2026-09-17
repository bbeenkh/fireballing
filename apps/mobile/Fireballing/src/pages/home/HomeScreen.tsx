import React from 'react';
import { View } from 'react-native';
import { Typography } from '@fblg/mobile-ui';

/**
 * # HomeScreen
 * ---
 * - 간단설명: 홈 탭 플레이스홀더 스크린
 */
export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Typography variant="h2">Fireballing</Typography>
      <Typography variant="body" className="mt-sm text-on-surface-variant">
        홈 화면
      </Typography>
    </View>
  );
}
