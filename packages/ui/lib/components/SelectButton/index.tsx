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
  /** 그룹 라벨 */
  label?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * # SelectButton
 * ---
 * - 간단설명: 선택 옵션 버튼 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 선택 시 퍼플 배경 + 체크 아이콘, 미선택 시 회색 배경
 *   - 선택 상태 관리는 부모에서 처리
 *   - SelectButton.Group으로 그룹핑하여 라벨과 수직 레이아웃 제공
 * ---
 * @param selected 선택 상태
 * @param children 버튼 라벨 텍스트
 * ---
 * @example
 * <SelectButton.Group label="질문">
 *   <SelectButton selected onPress={() => setType('에겐')}>에겐</SelectButton>
 *   <SelectButton onPress={() => setType('테토')}>테토</SelectButton>
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
        'rounded-md px-md py-md flex-row items-center justify-between h-[52px]',
        selected ? 'bg-[#f5edff] border border-[#8c39fb]' : 'bg-[#f5f5f5]',
        className,
      )}
      {...props}
    >
      <Text
        className={twMerge(
          'text-body-sm flex-1',
          selected
            ? 'text-[#8c39fb] font-semibold'
            : 'text-[#1a1a1a] font-medium',
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
 * - 간단설명: SelectButton을 수직 배치하고 라벨을 표시하는 컨테이너
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
        <Text className="text-detail font-semibold text-[#1a1a1a]">
          {label}
        </Text>
      )}
      <View className="gap-sm">{children}</View>
    </View>
  );
}

SelectButton.Group = SelectButtonGroup;

export type { ISelectButtonProps, ISelectButtonGroupProps };
export default SelectButton;
