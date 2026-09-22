import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@/shared/types';
import { HomeScreen } from '@/pages/home';
import { EditProfileScreen } from '@/pages/edit-profile';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * # HomeStack
 * ---
 * - 간단설명: 홈 탭 내부 스택 네비게이터
 * - 제약사항 및 특이사항:
 *   - Home 화면은 자체 TopBar 사용하므로 headerShown: false
 *   - EditProfile 화면은 기본 헤더 사용
 */
export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: '프로필 수정' }}
      />
    </Stack.Navigator>
  );
}
