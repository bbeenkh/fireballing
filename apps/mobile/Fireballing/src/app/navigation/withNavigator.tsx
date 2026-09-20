import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '@/shared/types';
import { HomeStack } from './stacks/HomeStack';
import { PortfolioStack } from './stacks/PortfolioStack';
import { SimulatorStack } from './stacks/SimulatorStack';
import { MyPageStack } from './stacks/MyPageStack';

const Tab = createBottomTabNavigator<AppTabParamList>();

/**
 * # WithNavigator
 * ---
 * - 간단설명: 하단 4탭 네비게이터
 * - 제약사항 및 특이사항:
 *   - 각 탭은 내부 Stack Navigator를 포함
 *   - 아이콘은 별도 티켓에서 추가 예정
 * ---
 * @example
 * <WithNavigator />
 */
export function WithNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#ff5a26',
        tabBarInactiveTintColor: '#9e928e',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: '홈' }}
      />
      <Tab.Screen
        name="PortfolioTab"
        component={PortfolioStack}
        options={{ tabBarLabel: '포트폴리오' }}
      />
      <Tab.Screen
        name="SimulatorTab"
        component={SimulatorStack}
        options={{ tabBarLabel: '시뮬레이터' }}
      />
      <Tab.Screen
        name="MyPageTab"
        component={MyPageStack}
        options={{ tabBarLabel: '마이페이지' }}
      />
    </Tab.Navigator>
  );
}
