import React from 'react';
import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type CardVariant = 'default' | 'hero' | 'bento';

interface ICardProps extends ViewProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[#faf8f5] border border-[#e7ded6] rounded-[16px] p-md',
  // ponytail: hero gradient은 RN에서 LinearGradient 필요 — 단색 fallback 사용, gradient 필요시 expo-linear-gradient로 래핑
  hero: 'bg-[#faf8f5] border border-[#e7ded6] rounded-[16px] p-lg',
  bento: 'bg-[#faf8f5] border border-[#e7ded6] rounded-[16px] p-md',
};

/**
 * # Card
 * ---
 * - 간단설명: 디자인시스템 카드 컴포넌트
 * - variant로 스타일 변형 (default, hero, bento)
 * ---
 * @param variant 카드 스타일 변형
 * @param children 카드 내부 콘텐츠
 * ---
 * @example
 * <Card variant="default">
 *   <Typography variant="h3">총 자산</Typography>
 *   <Typography variant="mono">158,420,000원</Typography>
 * </Card>
 */
export function Card({
  variant = 'default',
  className,
  children,
  ...props
}: ICardProps) {
  return (
    <View className={twMerge(variantStyles[variant], className)} {...props}>
      {children}
    </View>
  );
}

export default Card;
