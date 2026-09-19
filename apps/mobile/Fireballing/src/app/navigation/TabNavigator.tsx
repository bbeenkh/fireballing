import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { DummyForm } from '../../shared/ui/DummyForm';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <ScrollView testID="home-screen" style={styles.homeScreen}>
      <Text style={styles.homeTitle}>테스트 환경 검증</Text>
      <DummyForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeScreen: { flex: 1, backgroundColor: '#0d0b0a' },
  homeTitle: { color: '#fff', fontSize: 20, padding: 16 },
});

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
    </Tab.Navigator>
  );
}
