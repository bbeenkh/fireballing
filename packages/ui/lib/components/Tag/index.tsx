import React from 'react';
import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TagIntent = 'profit' | 'loss' | 'neutral';
type TagSize = 'sm' | 'md';

interface ITagProps extends TextProps {
  /** 'profit' | 'loss' | 'neutral' — children 텍스트에서 자동감지 (명시 시 오버라이드) */
  intent?: TagIntent;
  /** 'sm' | 'md' (기본값: 'md') */
  size?: TagSize;
  className?: string;
  children: React.ReactNode;
}

function detectIntent(children: React.ReactNode): TagIntent {
  if (typeof children === 'string') {
    if (children.startsWith('+')) return 'profit';
    if (children.startsWith('-')) return 'loss';
  }
  return 'neutral';
}

const intentStyles: Record<TagIntent, string> = {
  profit: 'text-profit',
  loss: 'text-loss',
  neutral: 'text-on-surface-variant',
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'text-label-sm',
  md: 'text-label-md',
};

/**
 * # Tag
 * ---
 * - 간단설명: 수익률/퍼센티지 표시용 태그 컴포넌트
 * - children 텍스트가 +로 시작하면 profit(녹색), -로 시작하면 loss(적색) 자동 적용
 * - intent prop으로 명시적 오버라이드 가능
 * ---
 * @param intent 의도 ('profit' | 'loss' | 'neutral')
 * @param size 크기 ('sm' | 'md')
 * @param children 표시할 텍스트
 * ---
 * @example
 * <Tag>+12.4%</Tag>
 * <Tag intent="loss">-1.32%</Tag>
 */
export function Tag({
  intent,
  size = 'md',
  className,
  children,
  ...props
}: ITagProps) {
  const resolvedIntent = intent ?? detectIntent(children);

  return (
    <Text
      className={twMerge(intentStyles[resolvedIntent], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </Text>
  );
}

export default Tag;
