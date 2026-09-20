import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MyPageStackParamList } from '@/shared/types';
import { MyPageScreen } from '@/pages/my-page';
import { EditProfileScreen } from '@/pages/edit-profile';
import { SettingsScreen } from '@/pages/settings';

const Stack = createNativeStackNavigator<MyPageStackParamList>();

/**
 * # MyPageStack
 * ---
 * - 간단설명: 마이페이지 탭 내부 스택 네비게이터
 * - 제약사항 및 특이사항:
 *   - MyPage, EditProfile, Settings 3개 화면 포함
 */
export function MyPageStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="MyPage" component={MyPageScreen} options={{ title: '마이페이지' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: '프로필 수정' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
    </Stack.Navigator>
  );
}
