import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SimulatorStackParamList } from '@/shared/types';
import { SimulatorScreen } from '@/pages/simulator';

const Stack = createNativeStackNavigator<SimulatorStackParamList>();

/**
 * # SimulatorStack
 * ---
 * - 간단설명: 시뮬레이터 탭 내부 스택 네비게이터
 */
export function SimulatorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Simulator" component={SimulatorScreen} options={{ title: '시뮬레이터' }} />
    </Stack.Navigator>
  );
}
