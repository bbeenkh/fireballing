import React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * 버튼 variant 타입
 * - primary = 메인 액션 버튼
 * - secondary = 보조 액션 버튼
 * - ghost = 배경 없는 투명 버튼
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface IButtonProps extends PressableProps {
  /** 버튼 스타일 variant */
  variant?: ButtonVariant;
  /** 추가 className (NativeWind) */
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary rounded-lg px-md py-sm active:bg-primary-deep',
  secondary: 'bg-surface border border-outline rounded-lg px-md py-sm active:bg-background',
  ghost: 'px-md py-sm active:opacity-70',
};

/**
 * # Button
 * ---
 * - 간단설명: NativeWind 기반 모바일 버튼 컴포넌트
 * - 제약사항: variant별 기본 스타일 제공, className으로 오버라이드 가능
 * ---
 * @param variant 버튼 스타일 (primary/secondary/ghost)
 * @param className 추가 NativeWind 클래스
 * @param children 버튼 내부 콘텐츠
 * ---
 * @example
 * <Button variant="primary" onPress={handlePress}>
 *   <Typography variant="label-md">확인</Typography>
 * </Button>
 */
export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: IButtonProps) {
  return (
    <Pressable
      className={twMerge(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Pressable>
  );
}
