import React from 'react';
import { Text, type TextProps } from 'react-native';

type TypographyVariant =
  'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono' | 'label-md' | 'label-sm';

interface ITypographyProps extends TextProps {
  /** 타이포그래피 스타일 변형 (기본값: 'body') */
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-h1 text-black',
  h2: 'text-h2 text-black',
  h3: 'text-h3 text-black',
  body: 'text-body text-black',
  caption: 'text-caption text-black',
  mono: 'text-mono text-black',
  'label-md': 'text-label-md text-black',
  'label-sm': 'text-label-sm text-black',
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
export function _Typography({
  variant = 'body',
  className,
  children,
  ...props
}: ITypographyProps) {
  return (
    <Text
      className={[variantStyles[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Text>
  );
}

export default _Typography;
