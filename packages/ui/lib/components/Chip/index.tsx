import React from 'react';
import {
  Pressable,
  View,
  Text,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * 칩 컴포넌트의 변형 타입
 * - selection = 선택 칩 (기본값)
 * - filter = 필터 필 (라운드)
 * - compliance = 준수 필
 * - subtle = 정보 표시 칩
 * - value = 값 뱃지 (배경 없음)
 * - account = 계정 뱃지
 */
type ChipVariant =
  'selection' | 'filter' | 'compliance' | 'subtle' | 'value' | 'account';

interface IChipProps extends PressableProps {
  /** 선택 상태 (selection, filter 변형에서만 적용) */
  selected?: boolean;
  /** 칩 변형 타입 (기본값: 'selection') */
  variant?: ChipVariant;
  className?: string;
  children: React.ReactNode;
}

interface IChipGroupProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

const variantContainerStyles: Record<
  ChipVariant,
  { base: string; selected?: string }
> = {
  selection: {
    base: 'bg-white border border-[#e7ded6] rounded-[10px] px-[16px] py-[12px]',
    selected: 'bg-[rgba(255,90,38,0.1)] border-[#ff5a26]',
  },
  filter: {
    base: 'bg-white border border-[#e7ded6] rounded-[20px] px-[14px] py-[8px]',
    selected: 'bg-[rgba(255,90,38,0.1)] border-[#ff5a26]',
  },
  compliance: {
    base: 'bg-white border border-[#e7ded6] rounded-[30px] px-[12px] py-[6px]',
  },
  subtle: {
    base: 'bg-[rgba(255,90,38,0.1)] rounded-[8px] px-[10px] py-[6px]',
  },
  value: {
    base: '',
  },
  account: {
    base: 'bg-[rgba(255,90,38,0.1)] rounded-[6px] px-[8px] py-[4px]',
  },
};

const variantTextStyles: Record<
  ChipVariant,
  { base: string; selected?: string; unselected?: string }
> = {
  selection: {
    base: 'text-[14px] font-semibold',
    selected: 'text-[#ff5a26]',
    unselected: 'text-[#9e928e]',
  },
  filter: {
    base: 'text-[13px] font-semibold',
    selected: 'text-[#ff5a26]',
    unselected: 'text-[#9e928e]',
  },
  compliance: {
    base: 'text-[#9e928e] text-[12px]',
  },
  subtle: {
    base: 'text-[#ff5a26] text-[11px]',
  },
  value: {
    base: 'text-[#ff5a26] text-[14px] font-semibold',
  },
  account: {
    base: 'text-[#ff5a26] text-[11px] font-bold',
  },
};

/**
 * # Chip
 * ---
 * - 간단설명: 피그마 디자인 스펙 기반의 다양한 변형을 지원하는 칩/뱃지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - selected prop은 selection, filter 변형에서만 시각적으로 적용됨
 *   - value 변형은 배경/테두리 없이 텍스트만 표시
 *   - Chip.Group으로 수평 그룹핑 가능
 * ---
 * @param variant 칩 변형 타입 ('selection' | 'filter' | 'compliance' | 'subtle' | 'value' | 'account')
 * @param selected 선택 상태 (selection, filter에서만 적용)
 * @param children 칩 라벨
 * ---
 * @example
 * <Chip variant="filter" selected>전체</Chip>
 * <Chip variant="value">₩12,345</Chip>
 */
function Chip({
  selected,
  variant = 'selection',
  className,
  children,
  ...props
}: IChipProps) {
  const container = variantContainerStyles[variant];
  const text = variantTextStyles[variant];
  const hasSelection = variant === 'selection' || variant === 'filter';

  return (
    <Pressable
      className={twMerge(
        'items-center justify-center',
        container.base,
        hasSelection && selected && container.selected,
        className,
      )}
      {...props}
    >
      <Text
        className={twMerge(
          text.base,
          hasSelection && (selected ? text.selected : text.unselected),
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
    <View
      className={twMerge('flex-row items-center gap-xs', className)}
      {...props}
    >
      {children}
    </View>
  );
}

Chip.Group = ChipGroup;

export type { ChipVariant, IChipProps, IChipGroupProps };
export default Chip;
