import React from 'react';
import { Pressable, View, Text, type PressableProps, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ChipSize = 'sm' | 'md';

interface IChipProps extends PressableProps {
  /** 선택 상태 */
  selected?: boolean;
  /** 'sm' | 'md' (기본값: 'md') */
  size?: ChipSize;
  className?: string;
  children: React.ReactNode;
}

interface IChipGroupProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<ChipSize, string> = {
  sm: 'px-sm py-xs',
  md: 'px-md py-xs',
};

/**
 * # Chip
 * ---
 * - 간단설명: 세그먼트 컨트롤/토글 칩 컴포넌트
 * - selected 상태에 따라 스타일 변경
 * - Chip.Group으로 그룹핑 가능
 * ---
 * @param selected 선택 상태
 * @param size 크기 ('sm' | 'md')
 * @param children 칩 라벨
 * ---
 * @example
 * <Chip.Group>
 *   <Chip selected onPress={() => setCurrency('KRW')}>KRW</Chip>
 *   <Chip onPress={() => setCurrency('USD')}>USD</Chip>
 * </Chip.Group>
 */
function Chip({
  selected,
  size = 'md',
  className,
  children,
  ...props
}: IChipProps) {
  return (
    <Pressable
      className={twMerge(
        'rounded-full items-center justify-center',
        selected
          ? 'bg-primary'
          : 'bg-transparent border border-outline',
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      <Text
        className={twMerge(
          'text-label-md',
          selected ? 'text-on-primary' : 'text-on-surface-variant',
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}

/**
 * # Chip.Group
 * ---
 * - 간단설명: Chip 컴포넌트들을 수평 배치하는 컨테이너
 * ---
 * @param children Chip 컴포넌트들
 */
function ChipGroup({ className, children, ...props }: IChipGroupProps) {
  return (
    <View className={twMerge('flex-row items-center gap-xs', className)} {...props}>
      {children}
    </View>
  );
}

Chip.Group = ChipGroup;

export default Chip;
