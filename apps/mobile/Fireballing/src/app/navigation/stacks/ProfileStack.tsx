import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '@/shared/types';
import { PortfolioScreen } from '@/pages/portfolio';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

/**
 * # ProfileStack
 * ---
 * - 간단설명: 내정보 탭 내부 스택 네비게이터
 */
export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Profile"
        component={PortfolioScreen}
        options={{ title: '내정보' }}
      />
    </Stack.Navigator>
  );
}
