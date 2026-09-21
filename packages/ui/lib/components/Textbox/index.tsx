import React from 'react';
import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * Textbox 컴포넌트 Props
 * @extends TextInputProps
 */
interface ITextboxProps extends TextInputProps {
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
 * # Textbox
 * ---
 * - 간단설명: 멀티라인 텍스트 입력 컴포넌트
 * - 제약사항 및 특이사항:
 *   - placeholder 상단 좌측, 글자수 카운터 하단 우측 배치
 *   - 기본 높이 240px
 * ---
 * @param currentLength 현재 글자수
 * @param maxCharLength 최대 글자수
 * @param className 래퍼 View 클래스
 * @param inputClassName TextInput 추가 클래스
 * ---
 * @example
 * <Textbox placeholder="프로필 이름을 입력해주세요" maxCharLength={300} />
 */
export function Textbox({
  currentLength,
  maxCharLength,
  className,
  inputClassName,
  testID,
  ...props
}: ITextboxProps) {
  return (
    <View
      accessible={false}
      className={twMerge(
        'bg-surface rounded-md p-md h-[240px] justify-between',
        className,
      )}
    >
      <TextInput
        testID={testID}
        accessible
        className={twMerge(
          'text-text-primary text-body-sm flex-1',
          inputClassName,
        )}
        placeholderTextColor="#888888"
        multiline
        textAlignVertical="top"
        maxLength={maxCharLength}
        {...props}
      />
      {maxCharLength != null && (
        <View className="items-end">
          <Text className="text-text-placeholder text-body-sm">
            {currentLength ?? 0} / {maxCharLength}
          </Text>
        </View>
      )}
    </View>
  );
}

export default Textbox;
