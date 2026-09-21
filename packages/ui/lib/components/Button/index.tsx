import React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface IButtonProps extends PressableProps {
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼 크기 (기본값: 'md') */
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#8c39fb] rounded-md active:bg-[#742bd5]',
  secondary: 'bg-white border border-[#8c39fb] rounded-md active:bg-[#f5edff]',
  ghost: 'bg-[#40403f] border border-[#8c39fb] rounded-md active:opacity-80',
  dark: 'bg-[#1b1b1b] rounded-md active:opacity-80',
  link: 'active:opacity-70',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-sm py-xs',
  md: 'px-md py-md h-[56px]',
  lg: 'px-lg py-md h-[56px]',
};

/**
 * # Button
 * ---
 * - 간단설명: 디자인시스템 버튼 컴포넌트
 * - variant로 스타일 변형, size로 크기 조절
 * - 제약사항: children에 텍스트를 직접 넣지 말고 Typography 등을 사용할 것
 * ---
 * @param variant 버튼 스타일 변형 (primary, secondary, ghost, dark, link)
 * @param size 버튼 크기 (sm, md, lg)
 * @param children 버튼 내부 콘텐츠
 * ---
 * @example
 * <Button variant="primary" size="lg" onPress={handleSubmit}>
 *   <Typography variant="label-md" className="text-white">확인</Typography>
 * </Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: IButtonProps) {
  return (
    <Pressable
      className={twMerge(
        'items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'bg-[#e3e3e3]',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export default Button;
