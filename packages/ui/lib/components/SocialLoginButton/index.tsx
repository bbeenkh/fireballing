import React from 'react';
import { Pressable, View, Text, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * 소셜 로그인 제공자
 * - kakao = 카카오 로그인 (노란 배경)
 * - google = 구글 로그인 (흰 배경)
 * - apple = 애플 로그인 (검정 배경)
 */
type SocialProvider = 'kakao' | 'google' | 'apple';

interface ISocialLoginButtonProps extends PressableProps {
  /** 소셜 로그인 제공자 */
  provider: SocialProvider;
  /** 좌측 아이콘 (SVG 컴포넌트 등) */
  icon?: React.ReactNode;
  className?: string;
}

const providerStyles: Record<SocialProvider, string> = {
  kakao: 'bg-[#fee500]',
  google: 'bg-white border border-[#e3e3e3]',
  apple: 'bg-[#1b1b1b]',
};

const providerTextStyles: Record<SocialProvider, string> = {
  kakao: 'text-[#1a1a1a]',
  google: 'text-[#1a1a1a]',
  apple: 'text-white',
};

const providerLabels: Record<SocialProvider, string> = {
  kakao: '카카오로 로그인하기',
  google: 'Google로 로그인하기',
  apple: 'Apple로 로그인하기',
};

/**
 * # SocialLoginButton
 * ---
 * - 간단설명: 소셜 로그인 버튼 컴포넌트 (카카오/구글/애플)
 * - 제약사항 및 특이사항:
 *   - icon prop으로 로고 아이콘 주입
 *   - 각 provider별 배경색/텍스트색 자동 적용
 * ---
 * @param provider 소셜 로그인 제공자 ('kakao' | 'google' | 'apple')
 * @param icon 좌측 로고 아이콘
 * ---
 * @example
 * <SocialLoginButton provider="kakao" icon={<KakaoIcon />} onPress={handleKakao} />
 * <SocialLoginButton provider="google" icon={<GoogleIcon />} onPress={handleGoogle} />
 * <SocialLoginButton provider="apple" icon={<AppleIcon />} onPress={handleApple} />
 */
export function SocialLoginButton({
  provider,
  icon,
  className,
  ...props
}: ISocialLoginButtonProps) {
  return (
    <Pressable
      className={twMerge(
        'flex-row items-center justify-center h-[56px] rounded-md gap-[6px] active:opacity-80',
        providerStyles[provider],
        className,
      )}
      {...props}
    >
      {icon && <View className="w-[18px] h-[18px]">{icon}</View>}
      <Text
        className={twMerge(
          'text-body-sm font-medium',
          providerTextStyles[provider],
        )}
      >
        {providerLabels[provider]}
      </Text>
    </Pressable>
  );
}

export default SocialLoginButton;
