import React from 'react';
import { Text, type TextProps } from 'react-native';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'body-sm'
  | 'detail'
  | 'caption'
  | 'label-md'
  | 'label-sm';

interface ITypographyProps extends TextProps {
  /** 타이포그래피 스타일 변형 (기본값: 'body') */
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-h1 text-[#1a1a1a]',
  h2: 'text-h2 text-[#1a1a1a]',
  h3: 'text-h3 text-[#1a1a1a]',
  subtitle: 'text-subtitle text-[#1a1a1a]',
  body: 'text-body text-[#1a1a1a]',
  'body-sm': 'text-body-sm text-[#1a1a1a]',
  detail: 'text-detail text-[#1a1a1a]',
  caption: 'text-caption text-[#1a1a1a]',
  'label-md': 'text-label-md text-[#1a1a1a]',
  'label-sm': 'text-label-sm text-[#1a1a1a]',
};

/**
 * # Typography
 * ---
 * - 간단설명: 디자인 시스템 타이포그래피 토큰을 적용하는 텍스트 컴포넌트
 * - variant에 따라 폰트 크기, 굵기, 행간이 자동 적용
 * - 폰트: Pretendard
 * ---
 * @param variant 타이포그래피 변형 (h1, h2, h3, subtitle, body, body-sm, detail, caption, label-md, label-sm)
 * @param children 텍스트 콘텐츠
 * ---
 * @example
 * <Typography variant="h1">제목</Typography>
 * <Typography variant="body-sm">본문 텍스트</Typography>
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
