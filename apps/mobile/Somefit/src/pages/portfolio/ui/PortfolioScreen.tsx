import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # PortfolioScreen
 * ---
 * - 간단설명: 포트폴리오 화면 (플레이스홀더)
 */
function PortfolioScreenBase() {
  return (
    <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
      포트폴리오
    </Text>
  );
}

export const PortfolioScreen = withLayout(PortfolioScreenBase);
