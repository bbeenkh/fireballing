import React from 'react';
import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * 타이포그래피 variant 타입
 * - h1 = 대제목 (48px/800)
 * - h2 = 중제목 (32px/700)
 * - h3 = 소제목 (20px/600)
 * - body = 본문 (15px/400)
 * - caption = 캡션 (11px/600)
 * - label-md = 중간 라벨 (14px/600)
 * - label-sm = 작은 라벨 (12px/500)
 */
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'caption'
  | 'label-md'
  | 'label-sm';

interface ITypographyProps extends TextProps {
  /** 타이포그래피 스타일 variant */
  variant?: TypographyVariant;
  /** 추가 className (NativeWind) */
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-h1 text-on-surface',
  h2: 'text-h2 text-on-surface',
  h3: 'text-h3 text-on-surface',
  body: 'text-body text-on-surface',
  caption: 'text-caption text-on-surface-variant',
  'label-md': 'text-label-md text-on-surface',
  'label-sm': 'text-label-sm text-on-surface-variant',
};

/**
 * # Typography
 * ---
 * - 간단설명: 디자인 토큰 기반 텍스트 컴포넌트
 * ---
 * @param variant 타이포그래피 스타일 (h1/h2/h3/body/caption/label-md/label-sm)
 * @param className 추가 NativeWind 클래스
 * @param children 텍스트 내용
 * ---
 * @example
 * <Typography variant="h2">포트폴리오</Typography>
 * <Typography variant="body" className="text-on-surface-variant">설명 텍스트</Typography>
 */
export function Typography({
  variant = 'body',
  className,
  children,
  ...props
}: ITypographyProps) {
  return (
    <Text className={twMerge(variantStyles[variant], className)} {...props}>
      {children}
    </Text>
  );
}
