import React from 'react';
import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * Input 변형 타입
 * - default = 라벨 포함 기본 입력
 * - search = 아이콘 슬롯 포함 검색 입력
 * - compact = 숫자 등 소형 입력
 */
type InputVariant = 'default' | 'search' | 'compact';

/**
 * Input 컴포넌트 Props
 * @extends TextInputProps
 */
interface IInputProps extends TextInputProps {
  /** 디자인시스템 스타일 변형 */
  variant?: InputVariant;
  /** 입력 필드 위 라벨 (default 변형용) */
  label?: string;
  /** 좌측 아이콘 슬롯 (search 변형용) */
  leftIcon?: React.ReactNode;
  /** 래퍼 View 클래스 */
  className?: string;
  /** TextInput 추가 클래스 */
  inputClassName?: string;
}

const containerStyles: Record<InputVariant, string> = {
  default: 'bg-white border border-[#e7ded6] rounded-[12px] p-[16px]',
  search:
    'bg-white border border-[#e7ded6] rounded-[12px] px-[16px] py-[14px] flex-row items-center gap-[12px]',
  compact: 'bg-white border border-[#e7ded6] rounded-[8px] p-[8px]',
};

const inputStyles: Record<InputVariant, string> = {
  default: 'text-[#0d0b0a] text-[15px]',
  search: 'text-[#0d0b0a] text-[15px] flex-1',
  compact: 'text-[#ff5a26] text-[13px] font-bold',
};

/**
 * # Input
 * ---
 * - 간단설명: 피그마 디자인 시스템 기반 텍스트 입력 컴포넌트
 * - 제약사항 및 특이사항:
 *   - default: 상단 라벨 지원
 *   - search: leftIcon 슬롯으로 검색 아이콘 등 배치
 *   - compact: 숫자 입력 등 소형 중앙정렬 스타일
 * ---
 * @param variant 입력 스타일 변형 ('default' | 'search' | 'compact')
 * @param label 입력 필드 위 라벨 (default 변형)
 * @param leftIcon 좌측 아이콘 (search 변형)
 * @param className 래퍼 View 클래스
 * @param inputClassName TextInput 추가 클래스
 * ---
 * @example
 * <Input variant="default" label="종목명" placeholder="검색어 입력" />
 * <Input variant="search" leftIcon={<SearchIcon />} placeholder="검색" />
 * <Input variant="compact" placeholder="0" keyboardType="numeric" />
 */
export function Input({
  variant = 'default',
  label,
  leftIcon,
  className,
  inputClassName,
  ...props
}: IInputProps) {
  return (
    <View className={twMerge('gap-[4px]', className)}>
      {label && variant === 'default' && (
        <Text className="text-[#9e928e] text-[13px]">{label}</Text>
      )}
      <View className={containerStyles[variant]}>
        {leftIcon && variant === 'search' && leftIcon}
        <TextInput
          className={twMerge(inputStyles[variant], inputClassName)}
          placeholderTextColor="#9e928e"
          {...props}
        />
      </View>
    </View>
  );
}

export default Input;
