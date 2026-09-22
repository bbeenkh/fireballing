import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SimulatorStackParamList } from '@/shared/types';
import { SimulatorScreen } from '@/pages/simulator';
import { MyInfoScreen } from '@/pages/my-info';
import { MyInfoDetailsScreen } from '@/pages/my-info-details';
import { PartnerInfoScreen } from '@/pages/partner-info';

const Stack = createNativeStackNavigator<SimulatorStackParamList>();

/**
 * # SimulatorStack
 * ---
 * - 간단설명: 시뮬레이터 탭 내부 스택 네비게이터
 * - 제약사항 및 특이사항:
 *   - 진입 시 MyInfo → MyInfoDetails → PartnerInfo → Simulator 순서로 진행
 */
export function SimulatorStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyInfo"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyInfo" component={MyInfoScreen} />
      <Stack.Screen name="MyInfoDetails" component={MyInfoDetailsScreen} />
      <Stack.Screen name="PartnerInfo" component={PartnerInfoScreen} />
      <Stack.Screen
        name="Simulator"
        component={SimulatorScreen}
        options={{ headerShown: true, title: '시뮬레이션' }}
      />
    </Stack.Navigator>
  );
}
