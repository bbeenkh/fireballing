import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * 팁 컴포넌트 변형 타입
 * - guidance = 가이드 박스 (기본값)
 * - info = 정보 하이라이트
 * - insight = 인사이트 카드
 */
type TipVariant = 'guidance' | 'info' | 'insight';

interface ITipProps extends ViewProps {
  /** 변형 타입 ('guidance' | 'info' | 'insight', 기본값: 'guidance') */
  variant?: TipVariant;
  /** 제목 (guidance, insight 변형에서 사용) */
  title?: string;
  /** 본문 텍스트 (info 변형에서는 메인 텍스트로 사용) */
  description?: string;
  /** 추가 스타일 클래스 */
  className?: string;
  /** description 대신 사용할 수 있는 자식 요소 */
  children?: React.ReactNode;
}

const containerStyles: Record<TipVariant, string> = {
  guidance: 'bg-white border border-[#e7ded6] rounded-md p-md',
  info: 'bg-white border-l-[3px] border-[#ff5a26] rounded p-3',
  insight: 'bg-white border border-[#ff5a26] border-l-4 rounded-md px-7 py-lg',
};

/**
 * # Tip
 * ---
 * - 간단설명: 가이드, 정보, 인사이트 등 다양한 형태의 팁 메시지를 표시하는 컴포넌트
 * - 제약사항 및 특이사항:
 *   - guidance/insight 변형은 title + description 구조
 *   - info 변형은 description만 사용 (title 무시)
 *   - children은 description 대신 사용 가능
 * ---
 * @param variant 변형 타입 ('guidance' | 'info' | 'insight')
 * @param title 제목 텍스트
 * @param description 본문 텍스트
 * @param children description 대체 자식 요소
 * ---
 * @example
 * <Tip variant="guidance" title="알고 계셨나요?" description="이 기능은..." />
 * <Tip variant="info" description="참고: 이 설정은 저장됩니다." />
 * <Tip variant="insight" title="인사이트" description="데이터에 따르면..." />
 */
function Tip({
  variant = 'guidance',
  title,
  description,
  className,
  children,
  ...props
}: ITipProps) {
  const body =
    children ??
    (description ? (
      <Text className={descriptionStyle(variant)}>{description}</Text>
    ) : null);

  if (variant === 'info') {
    return (
      <View className={twMerge(containerStyles.info, className)} {...props}>
        {body}
      </View>
    );
  }

  return (
    <View
      className={twMerge(containerStyles[variant], 'gap-sm', className)}
      {...props}
    >
      {title && (
        <Text className={titleStyle(variant)}>
          {variant === 'guidance' ? `\u{1F4A1} ${title}` : title}
        </Text>
      )}
      {body}
    </View>
  );
}

function titleStyle(variant: TipVariant): string {
  if (variant === 'guidance') return 'text-[#ff5a26] text-label-sm font-bold';
  return 'text-[#0d0b0a] text-label-md font-medium';
}

function descriptionStyle(variant: TipVariant): string {
  if (variant === 'info') return 'text-[#9e928e] text-label-sm leading-4';
  if (variant === 'insight')
    return 'text-[#9e928e] text-label-md font-medium leading-5';
  return 'text-[#9e928e] text-caption leading-4';
}

export default Tip;
