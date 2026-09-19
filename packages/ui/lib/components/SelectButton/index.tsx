import React from 'react';
import {
  Pressable,
  View,
  Text,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ISelectButtonProps extends PressableProps {
  /** 선택 상태 */
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ISelectButtonGroupProps extends ViewProps {
  /** 그룹 라벨 (예: "계좌 유형") */
  label?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * # SelectButton
 * ---
 * - 간단설명: 상호 배타적 선택을 위한 토글 버튼 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 선택 상태 관리는 부모에서 처리
 *   - SelectButton.Group으로 그룹핑하여 라벨과 수평 레이아웃 제공
 * ---
 * @param selected 선택 상태
 * @param children 버튼 라벨 텍스트
 * ---
 * @example
 * <SelectButton.Group label="계좌 유형">
 *   <SelectButton selected onPress={() => setType('일반')}>일반</SelectButton>
 *   <SelectButton onPress={() => setType('ISA')}>ISA</SelectButton>
 *   <SelectButton onPress={() => setType('연금')}>연금</SelectButton>
 * </SelectButton.Group>
 */
function SelectButton({
  selected,
  className,
  children,
  ...props
}: ISelectButtonProps) {
  return (
    <Pressable
      className={twMerge(
        'rounded-[10px] px-[16px] py-[12px] border items-center justify-center',
        selected
          ? 'bg-[rgba(255,90,38,0.1)] border-[#ff5a26]'
          : 'bg-white border-[#e7ded6]',
        className,
      )}
      {...props}
    >
      <Text
        className={twMerge(
          'text-label-md',
          selected ? 'text-[#ff5a26]' : 'text-[#9e928e]',
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}

/**
 * # SelectButton.Group
 * ---
 * - 간단설명: SelectButton을 수평 배치하고 라벨을 표시하는 컨테이너
 * ---
 * @param label 그룹 상단에 표시할 라벨
 * @param children SelectButton 컴포넌트들
 */
function SelectButtonGroup({
  label,
  className,
  children,
  ...props
}: ISelectButtonGroupProps) {
  return (
    <View className={twMerge('gap-sm', className)} {...props}>
      {label && (
        <Text className="text-[13px] font-semibold text-[#9e928e]">
          {label}
        </Text>
      )}
      <View className="flex-row items-center gap-xs">{children}</View>
    </View>
  );
}

SelectButton.Group = SelectButtonGroup;

export type { ISelectButtonProps, ISelectButtonGroupProps };
export default SelectButton;
