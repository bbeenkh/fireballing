import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '@/shared/types';
import { SettingsScreen } from '@/pages/settings';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

/**
 * # SettingsStack
 * ---
 * - 간단설명: 설정 탭 내부 스택 네비게이터
 */
export function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: '설정' }}
      />
    </Stack.Navigator>
  );
}
