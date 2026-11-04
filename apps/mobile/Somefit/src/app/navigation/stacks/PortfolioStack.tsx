import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PortfolioStackParamList } from '@/shared/types';
import { PortfolioScreen } from '@/pages/portfolio';

const Stack = createNativeStackNavigator<PortfolioStackParamList>();

/**
 * # PortfolioStack
 * ---
 * - 간단설명: 포트폴리오 탭 내부 스택 네비게이터
 */
export function PortfolioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ title: '포트폴리오' }}
      />
    </Stack.Navigator>
  );
}
