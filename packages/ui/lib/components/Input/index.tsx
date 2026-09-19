import React from 'react';
import { TextInput, View, Text, type TextInputProps, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type InputVariant = 'default' | 'filled';

interface IInputProps extends TextInputProps {
  /** 디자인시스템 스타일 변형 */
  variant?: InputVariant;
  /** 입력 필드 위 라벨 */
  label?: string;
  className?: string;
  inputClassName?: string;
}

const variantStyles: Record<InputVariant, string> = {
  default: 'bg-surface border border-outline rounded-lg px-md py-sm text-body text-on-surface',
  filled: 'bg-outline/30 rounded-lg px-md py-sm text-body text-on-surface',
};

/**
 * # Input
 * ---
 * - 간단설명: 디자인시스템 텍스트 입력 컴포넌트
 * - variant로 스타일 변형, label로 상단 라벨 표시
 * ---
 * @param variant 입력 스타일 변형 ('default' | 'filled')
 * @param label 입력 필드 위 라벨
 * @param className 래퍼 View 클래스
 * @param inputClassName TextInput 클래스
 * ---
 * @example
 * <Input variant="default" label="종목명" placeholder="검색어 입력" />
 * <Input variant="filled" placeholder="금액" keyboardType="numeric" />
 */
export function Input({
  variant = 'default',
  label,
  className,
  inputClassName,
  ...props
}: IInputProps) {
  return (
    <View className={twMerge('gap-xs', className)}>
      {label && (
        <Text className="text-label-sm text-on-surface-variant">{label}</Text>
      )}
      <TextInput
        className={[variantStyles[variant], inputClassName].filter(Boolean).join(' ')}
        placeholderTextColor="#9e928e"
        {...props}
      />
    </View>
  );
}

export default Input;
