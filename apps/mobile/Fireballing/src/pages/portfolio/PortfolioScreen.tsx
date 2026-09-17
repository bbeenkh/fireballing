import React from 'react';
import { View } from 'react-native';
import { Typography } from '@fblg/mobile-ui';

/**
 * # PortfolioScreen
 * ---
 * - 간단설명: 포트폴리오 탭 플레이스홀더 스크린
 */
export function PortfolioScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Typography variant="h2">포트폴리오</Typography>
    </View>
  );
}
