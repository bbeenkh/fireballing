import React from 'react';
import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ICardProps extends ViewProps {
  /** 추가 className (NativeWind) */
  className?: string;
  children: React.ReactNode;
}

/**
 * # Card
 * ---
 * - 간단설명: surface 배경 + 라운딩이 적용된 카드 래퍼
 * ---
 * @param className 추가 NativeWind 클래스
 * @param children 카드 내부 콘텐츠
 * ---
 * @example
 * <Card className="p-md">
 *   <Typography variant="h3">제목</Typography>
 * </Card>
 */
export function Card({ className, children, ...props }: ICardProps) {
  return (
    <View
      className={twMerge('bg-surface rounded-lg p-md', className)}
      {...props}
    >
      {children}
    </View>
  );
}
