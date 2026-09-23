import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { withLayout } from '@/shared/ui/ScreenLayout';
import { useAuthStore } from '@/entities/auth';
import type { AuthStackParamList } from '@/shared/types';

/**
 * # OnboardingScreen
 * ---
 * - 간단설명: 온보딩 화면 (개발용 내비게이션 링크 포함)
 * - 제약사항 및 특이사항:
 *   - 헤더, 하단 탭 없이 전체화면으로 표시
 *   - headerShown: false이므로 상단 SafeArea를 직접 적용
 */
function OnboardingScreenBase() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const login = useAuthStore(s => s.login);
  const insets = useSafeAreaInsets();

  return (
    // useSafeAreaInsets() 런타임 값이므로 tw 변환 불가
    <View style={{ paddingTop: insets.top }}>
      <Text className="text-[20px] font-bold p-md text-[#1a1a1a]">온보딩</Text>

      <View className="p-md gap-[12px]">
        <Text className="text-label-md text-on-surface-variant mb-xs">
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

        <Text className="text-label-md text-on-surface-variant mt-[12px] mb-xs">
          테스트
        </Text>
        <NavButton
          label="테스트 로그인 → AppTab"
          onPress={() => login({ accessToken: 'test', refreshToken: 'test' })}
          primary
        />
      </View>
    </View>
  );
}

export const OnboardingScreen = withLayout(OnboardingScreenBase);

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
      className={`py-[12px] px-md rounded border ${
        primary
          ? 'bg-primary border-primary active:bg-[#cc3300]'
          : 'bg-[#f8f8f8] border-[#e5e5e5] active:bg-[#f0f0f0]'
      }`}
    >
      <Text
        className={`text-[15px] ${primary ? 'text-white' : 'text-[#1a1a1a]'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
