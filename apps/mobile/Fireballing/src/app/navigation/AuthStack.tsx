import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@/shared/types';
import { OnboardingScreen } from '@/pages/onboarding';
import { LoginScreen } from '@/pages/login';
import { RegisterScreen } from '@/pages/register';
import { TermsScreen } from '@/pages/terms';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * # AuthStack
 * ---
 * - 간단설명: 비로그인 상태의 인증 플로우 스택 네비게이터
 * - 제약사항 및 특이사항:
 *   - 온보딩 → 로그인 → 회원가입 → 이용약관 순서
 */
export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ title: '온보딩' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ title: '이용약관' }}
      />
    </Stack.Navigator>
  );
}
