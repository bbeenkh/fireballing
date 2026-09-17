import React from 'react';
import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'caption'
  | 'mono'
  | 'label-md'
  | 'label-sm';

interface ITypographyProps extends TextProps {
  /** 타이포그래피 스타일 변형 (기본값: 'body') */
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-h1 text-on-surface',
  h2: 'text-h2 text-on-surface',
  h3: 'text-h3 text-on-surface',
  body: 'text-body text-on-surface',
  caption: 'text-caption text-on-surface-variant',
  mono: 'text-mono text-on-surface',
  'label-md': 'text-label-md text-on-surface',
  'label-sm': 'text-label-sm text-on-surface-variant',
};

/**
 * # Typography
 * ---
 * - 간단설명: 디자인 시스템 타이포그래피 토큰을 적용하는 텍스트 컴포넌트
 * - variant에 따라 폰트 크기, 굵기, 행간이 자동 적용
 * ---
 * @param variant 타이포그래피 변형 (h1, h2, h3, body, caption, mono, label-md, label-sm)
 * @param children 텍스트 콘텐츠
 * ---
 * @example
 * <Typography variant="h1">제목</Typography>
 * <Typography variant="mono">$142,850.45</Typography>
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

export default Typography;
