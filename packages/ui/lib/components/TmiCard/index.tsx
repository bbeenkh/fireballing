import React from 'react';
import { View, Text, Pressable, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ITmiCardProps extends PressableProps {
  /** 선택 상태 */
  selected?: boolean;
  /** 태그 텍스트 */
  tag: string;
  /** TMI 질문/제목 */
  title: string;
  /** 미리보기 답변 (3번 variant) */
  preview?: string;
  /** 체크박스 표시 여부 (기본값: true) */
  showCheckbox?: boolean;
  className?: string;
}

/**
 * # TmiCard
 * ---
 * - 간단설명: TMI 질문 카드 컴포넌트 (체크박스+태그+본문)
 * - 제약사항 및 특이사항:
 *   - selected=true: 퍼플 보더, 체크박스 체크 상태
 *   - preview 있으면 답변 미리보기 텍스트 표시
 *   - 상태 관리는 부모에서 처리
 * ---
 * @param selected 선택 상태
 * @param tag 태그 텍스트
 * @param title TMI 질문/제목
 * @param preview 미리보기 답변
 * ---
 * @example
 * <TmiCard tag="빈칸채우기" title='내가 가장 자주 듣는 말 "너는 진짜 ______ 같아"' />
 * <TmiCard selected tag="빈칸채우기" title="..." preview="너는 진짜 짱이고..." />
 */
export function TmiCard({
  selected = false,
  tag,
  title,
  preview,
  showCheckbox = true,
  className,
  ...props
}: ITmiCardProps) {
  return (
    <Pressable
      className={twMerge('flex-row items-start gap-3', className)}
      {...props}
    >
      {showCheckbox && (
        <View
          className={twMerge(
            'w-[24px] h-[24px] rounded-sm items-center justify-center mt-md',
            selected ? 'bg-[#8c39fb]' : 'border-2 border-[#bfbfbf] bg-white',
          )}
        >
          {selected && (
            <View className="w-[12px] h-[8px] border-b-2 border-l-2 border-white -rotate-45 mb-[2px]" />
          )}
        </View>
      )}
      <View
        className={twMerge(
          'flex-1 bg-white border rounded-md p-md gap-sm',
          selected ? 'border-[#8c39fb]' : 'border-[#e3e3e3]',
        )}
      >
        <View className="bg-[#f5edff] rounded-full px-3 py-2 self-start">
          <Text className="text-[#8c39fb] text-caption font-medium">{tag}</Text>
        </View>
        <Text
          className={twMerge(
            'text-body-sm',
            selected
              ? 'text-[#1a1a1a] font-medium'
              : 'text-[#888888] font-medium',
          )}
        >
          {title}
        </Text>
        {preview && (
          <Text className="text-caption text-[#888888]" numberOfLines={2}>
            {preview}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default TmiCard;
