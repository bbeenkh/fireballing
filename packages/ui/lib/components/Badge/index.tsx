import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * 유형별 뱃지 종류
 * - star = 슈팅스타 유형 (보라 그래디언트)
 * - galaxy = 갤럭시 유형 (블루-퍼플 그래디언트)
 * - solar = 솔라 유형 (오렌지-핑크 그래디언트)
 * - luna = 루나 유형 (골드 그래디언트)
 */
type BadgeVariant = 'star' | 'galaxy' | 'solar' | 'luna';

interface IBadgeProps extends ViewProps {
  /** 뱃지 유형 */
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  star: 'bg-[#8c39fb]',
  galaxy: 'bg-[#517be1]',
  solar: 'bg-[#ff7d37]',
  luna: 'bg-[#f3ca65]',
};

const variantLabels: Record<BadgeVariant, string> = {
  star: '슈팅스타 유형',
  galaxy: '갤럭시 유형',
  solar: '솔라 유형',
  luna: '루나 유형',
};

/**
 * # Badge
 * ---
 * - 간단설명: 사용자 유형을 표시하는 그래디언트 뱃지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - React Native에서 linear-gradient 미지원으로 단색 배경 사용
 *   - 실제 그래디언트 필요시 react-native-linear-gradient 적용 필요
 * ---
 * @param variant 뱃지 유형 ('star' | 'galaxy' | 'solar' | 'luna')
 * ---
 * @example
 * <Badge variant="star" />
 * <Badge variant="galaxy" />
 */
export function Badge({ variant = 'star', className, ...props }: IBadgeProps) {
  return (
    <View
      className={twMerge(
        'flex-row items-center justify-center px-md py-1 rounded-default gap-1',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      <Text className="text-white text-detail font-semibold">
        {variantLabels[variant]}
      </Text>
    </View>
  );
}

// ponytail: RN 단색 배경, react-native-linear-gradient로 업그레이드 가능

export default Badge;
