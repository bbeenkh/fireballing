import React from 'react';
import { Pressable, View, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ICheckboxProps extends PressableProps {
  /** 체크 상태 */
  checked?: boolean;
  className?: string;
}

/**
 * # Checkbox
 * ---
 * - 간단설명: 체크박스 on/off 토글 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 체크 상태 관리는 부모에서 처리
 *   - checked=true: 퍼플 배경 + 체크마크, false: 회색 보더
 * ---
 * @param checked 체크 상태
 * ---
 * @example
 * <Checkbox checked={isChecked} onPress={() => setIsChecked(!isChecked)} />
 */
export function Checkbox({
  checked = false,
  className,
  ...props
}: ICheckboxProps) {
  return (
    <Pressable
      className={twMerge(
        'w-[24px] h-[24px] rounded-sm items-center justify-center',
        checked ? 'bg-[#8c39fb]' : 'border-2 border-[#bfbfbf] bg-white',
        className,
      )}
      {...props}
    >
      {checked && (
        <View className="w-[12px] h-[8px] border-b-2 border-l-2 border-white -rotate-45 mb-[2px]" />
      )}
    </Pressable>
  );
}

export default Checkbox;
