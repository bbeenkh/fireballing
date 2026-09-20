import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenLayout } from '@/shared/ui/ScreenLayout';
import { useAuthStore } from '@/entities/auth';
import type { AuthStackParamList } from '@/shared/types';

/**
 * # OnboardingScreen
 * ---
 * - 간단설명: 온보딩 화면 (개발용 내비게이션 링크 포함)
 */
export function OnboardingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const login = useAuthStore(s => s.login);

  return (
    <ScreenLayout>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          padding: 16,
          color: '#1a1a1a',
        }}
      >
        온보딩
      </Text>

      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 14, color: '#9e928e', marginBottom: 4 }}>
          인증 스택
        </Text>
        <NavButton
          label="로그인"
          onPress={() => navigation.navigate('Login')}
        />
        <NavButton
          label="회원가입"
          onPress={() => navigation.navigate('Register')}
        />
        <NavButton
          label="이용약관"
          onPress={() => navigation.navigate('Terms')}
        />

        <Text
          style={{
            fontSize: 14,
            color: '#9e928e',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          테스트
        </Text>
        <NavButton
          label="테스트 로그인 → AppTab"
          onPress={() => login({ accessToken: 'test', refreshToken: 'test' })}
          primary
        />
      </View>
    </ScreenLayout>
  );
}

function NavButton({
  label,
  onPress,
  primary,
}: {
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: primary
          ? pressed
            ? '#cc3300'
            : '#ff5a26'
          : pressed
            ? '#f0f0f0'
            : '#f8f8f8',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: primary ? '#ff5a26' : '#e5e5e5',
      })}
    >
      <Text style={{ fontSize: 15, color: primary ? '#ffffff' : '#1a1a1a' }}>
        {label}
      </Text>
    </Pressable>
  );
}
