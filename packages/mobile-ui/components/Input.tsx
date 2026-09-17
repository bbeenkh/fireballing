import React from 'react';
import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IInputProps extends TextInputProps {
  /** 입력 필드 라벨 */
  label?: string;
  /** 추가 className (NativeWind) */
  className?: string;
  /** TextInput에 적용할 className */
  inputClassName?: string;
}

/**
 * # Input
 * ---
 * - 간단설명: 라벨 + TextInput 조합의 입력 컴포넌트
 * ---
 * @param label 입력 필드 상단 라벨
 * @param className 외부 View에 적용할 NativeWind 클래스
 * @param inputClassName TextInput에 적용할 NativeWind 클래스
 * ---
 * @example
 * <Input label="이메일" placeholder="이메일을 입력하세요" />
 */
export function Input({
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
        className={twMerge(
          'bg-surface border border-outline rounded-lg px-md py-sm text-body text-on-surface',
          inputClassName,
        )}
        placeholderTextColor="#9e928e"
        {...props}
      />
    </View>
  );
}
