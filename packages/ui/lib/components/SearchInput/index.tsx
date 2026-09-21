import React, { useState } from 'react';
import { View, TextInput, type TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ISearchInputProps extends TextInputProps {
  /** 좌측 검색 아이콘 */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * # SearchInput
 * ---
 * - 간단설명: 검색 전용 입력 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 포커스 시 퍼플 보더로 활성 상태 표시
 *   - icon prop으로 검색 아이콘 주입
 * ---
 * @param icon 좌측 검색 아이콘
 * ---
 * @example
 * <SearchInput icon={<IconSearch />} placeholder="검색어를 입력해주세요" />
 */
export function SearchInput({ icon, className, ...props }: ISearchInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      className={twMerge(
        'flex-row items-center bg-[#f5f5f5] rounded-md px-md h-[48px] gap-sm',
        focused && 'border border-[#8c39fb] bg-white',
        className,
      )}
    >
      {icon && <View className="w-[20px] h-[20px]">{icon}</View>}
      <TextInput
        className="flex-1 text-body-sm text-[#1a1a1a]"
        placeholderTextColor="#888888"
        onFocus={e => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    </View>
  );
}

export default SearchInput;
