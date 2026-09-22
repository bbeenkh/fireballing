import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconHome, IconUser, IconSimulator, IconNote } from '@fblg/core-ui';
import type { AppTabParamList } from '@/shared/types';
import { HomeStack } from './stacks/HomeStack';
import { ProfileStack } from './stacks/ProfileStack';
import { SimulatorStack } from './stacks/SimulatorStack';
import { SettingsStack } from './stacks/SettingsStack';

const Tab = createBottomTabNavigator<AppTabParamList>();

/**
 * # withNavigator
 * ---
 * - 간단설명: 하단 4탭 네비게이터를 감싸는 HOC
 * - 제약사항 및 특이사항:
 *   - 탭: 홈 / 내정보 / 시뮬레이션 / 설정
 *   - 각 탭은 내부 Stack Navigator를 포함
 * ---
 * @param Component 래핑할 컴포넌트 (탭 네비게이터 내부에서 사용)
 * ---
 * @example
 * const AppWithNav = withNavigator(AppContent);
 */
export function withNavigator<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
) {
  function WithNavigator(_props: P) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e3e3e3',
            height: 64,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 8,
          },
          tabBarActiveTintColor: '#1a1a1a',
          tabBarInactiveTintColor: '#363636',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: ({ color }) => <IconHome size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStack}
          options={{
            tabBarLabel: '내정보',
            tabBarIcon: ({ color }) => <IconUser size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="SimulatorTab"
          component={SimulatorStack}
          options={{
            tabBarLabel: '시뮬레이션',
            tabBarIcon: ({ color }) => (
              <IconSimulator size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStack}
          options={{
            tabBarLabel: '설정',
            tabBarIcon: ({ color }) => <IconNote size={20} color={color} />,
          }}
        />
      </Tab.Navigator>
    );
  }

  WithNavigator.displayName = `withNavigator(${Component.displayName || Component.name || 'Component'})`;
  return WithNavigator;
}
