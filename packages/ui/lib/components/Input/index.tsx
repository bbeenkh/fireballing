import React from 'react';
import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * Input 컴포넌트 Props
 * @extends TextInputProps
 */
interface IInputProps extends TextInputProps {
  /** 입력 필드 위 라벨 */
  label?: string;
  /** 현재 글자수 (카운터 표시용) */
  currentLength?: number;
  /** 최대 글자수 (카운터 표시용) */
  maxCharLength?: number;
  /** 래퍼 View 클래스 */
  className?: string;
  /** TextInput 추가 클래스 */
  inputClassName?: string;
}

/**
 * # Input
 * ---
 * - 간단설명: 단일 라인 텍스트 입력 컴포넌트
 * - 제약사항 및 특이사항:
 *   - placeholder와 글자수 카운터가 같은 행에 표시
 *   - 검색용은 SearchInput, 멀티라인은 Textbox 사용
 * ---
 * @param label 입력 필드 위 라벨
 * @param currentLength 현재 글자수
 * @param maxCharLength 최대 글자수
 * @param className 래퍼 View 클래스
 * @param inputClassName TextInput 추가 클래스
 * ---
 * @example
 * <Input label="이름" placeholder="프로필 이름을 입력해주세요" maxCharLength={10} />
 */
export function Input({
  label,
  currentLength,
  maxCharLength,
  className,
  inputClassName,
  testID,
  ...props
}: IInputProps) {
  return (
    <View accessible={false} className={twMerge('gap-3', className)}>
      {label && (
        <Text className="text-text-primary text-body font-medium">
          {label}
        </Text>
      )}
      <View
        accessible={false}
        className="bg-surface rounded-md p-md flex-row items-center justify-between"
      >
        <TextInput
          testID={testID}
          accessible
          className={twMerge(
            'text-text-primary text-body-sm flex-1',
            inputClassName,
          )}
          placeholderTextColor="#888888"
          maxLength={maxCharLength}
          {...props}
        />
        {maxCharLength != null && (
          <Text className="text-text-placeholder text-body-sm ml-sm">
            {currentLength ?? 0} / {maxCharLength}
          </Text>
        )}
      </View>
    </View>
  );
}

export default Input;
