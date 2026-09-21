import React, { useState } from 'react';
import { View, Text, Pressable, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IAccordionProps extends ViewProps {
  /** 카테고리 태그 텍스트 */
  tag?: string;
  /** 질문/제목 텍스트 */
  title: string;
  /** 답변/내용 텍스트 */
  content: string;
  /** 초기 열림 상태 (기본값: false) */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * # Accordion
 * ---
 * - 간단설명: FAQ 접기/펼치기 아코디언 컴포넌트
 * - 제약사항 및 특이사항:
 *   - tag로 카테고리 표시 (퍼플 아웃라인 태그)
 *   - 터치 시 content 영역 토글
 *   - 열림 시 chevron 방향 변경
 * ---
 * @param tag 카테고리 태그
 * @param title 질문/제목
 * @param content 답변/내용
 * @param defaultOpen 초기 열림 상태
 * ---
 * @example
 * <Accordion tag="계정" title="회원가입은 어떻게 하나요?" content="앱에서 간편하게..." />
 */
export function Accordion({
  tag,
  title,
  content,
  defaultOpen = false,
  className,
  ...props
}: IAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View className={twMerge('bg-white px-gutter py-7', className)} {...props}>
      <Pressable className="gap-sm" onPress={() => setIsOpen(!isOpen)}>
        {tag && (
          <View className="border border-[#8c39fb] rounded-full px-3 py-2 self-start">
            <Text className="text-[#8c39fb] text-caption">{tag}</Text>
          </View>
        )}
        <View className="flex-row items-center justify-between">
          <Text
            className="text-detail font-semibold text-[#1a1a1a] flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="text-[#8c39fb] text-body ml-sm">
            {isOpen ? '∧' : '∨'}
          </Text>
        </View>
      </Pressable>
      {isOpen && (
        <View className="mt-md">
          <Text className="text-body-sm text-[#888888] leading-relaxed">
            {content}
          </Text>
        </View>
      )}
    </View>
  );
}

export default Accordion;
