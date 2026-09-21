import React from 'react';
import { Text, View, type ViewProps } from 'react-native';

type TagVariant = 'filled' | 'outlined' | 'light';

interface ITagProps extends ViewProps {
  /** 'filled' | 'outlined' | 'light' (기본값: 'filled') */
  variant?: TagVariant;
  className?: string;
  children: React.ReactNode;
}

const containerStyles: Record<TagVariant, string> = {
  filled: 'bg-[#f5edff] rounded-full px-3 py-2',
  outlined: 'border border-[#8c39fb] rounded-full px-3 py-2',
  light: 'bg-[#f5edff] rounded-full px-3 py-2',
};

const textStyles: Record<TagVariant, string> = {
  filled: 'text-[#1a1a1a] text-caption tracking-tight',
  outlined: 'text-[#8c39fb] text-caption tracking-tight',
  light: 'text-[#8c39fb] text-caption tracking-tight',
};

/**
 * # Tag
 * ---
 * - 간단설명: 카테고리/상태 표시용 태그 컴포넌트
 * - variant로 filled(연보라 배경), outlined(보더), light(연보라+퍼플 텍스트) 선택
 * ---
 * @param variant 태그 스타일 ('filled' | 'outlined' | 'light')
 * @param children 표시할 텍스트
 * ---
 * @example
 * <Tag variant="filled">텍스트</Tag>
 * <Tag variant="outlined">계정</Tag>
 */
export function Tag({
  variant = 'filled',
  className,
  children,
  ...props
}: ITagProps) {
  return (
    <View
      className={[containerStyles[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Text className={textStyles[variant]}>{children}</Text>
    </View>
  );
}

export default Tag;
