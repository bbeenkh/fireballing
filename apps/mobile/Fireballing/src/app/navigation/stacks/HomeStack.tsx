import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@/shared/types';
import { HomeScreen } from '@/pages/home';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * # HomeStack
 * ---
 * - 간단설명: 홈 탭 내부 스택 네비게이터
 */
export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
    </Stack.Navigator>
  );
}
