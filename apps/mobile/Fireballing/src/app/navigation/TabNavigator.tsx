import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../pages/home/HomeScreen';
import { PortfolioScreen } from '../../pages/portfolio/PortfolioScreen';
import { SimulatorScreen } from '../../pages/simulator/SimulatorScreen';
import { MyPageScreen } from '../../pages/mypage/MyPageScreen';

const Tab = createBottomTabNavigator();

/**
 * # TabNavigator
 * ---
 * - 간단설명: 하단 4탭 네비게이터 (홈, 포트폴리오, 시뮬레이터, 마이페이지)
 * - 제약사항: 웹의 Footer BottomNav와 동일한 탭 구성
 * ---
 * @example
 * <NavigationContainer>
 *   <TabNavigator />
 * </NavigationContainer>
 */
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d0b0a',
          borderTopColor: '#261e1c',
        },
        tabBarActiveTintColor: '#ff5a26',
        tabBarInactiveTintColor: '#9e928e',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: '홈' }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ tabBarLabel: '포트폴리오' }}
      />
      <Tab.Screen
        name="Simulator"
        component={SimulatorScreen}
        options={{ tabBarLabel: '시뮬레이터' }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ tabBarLabel: '마이페이지' }}
      />
    </Tab.Navigator>
  );
}
