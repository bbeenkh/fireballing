import React from 'react';
import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IProgressIndicatorProps extends ViewProps {
  /** 진행률 (0~100) */
  progress: number;
  className?: string;
}

/**
 * # ProgressIndicator
 * ---
 * - 간단설명: 가입 등 단계별 진행률 바 컴포넌트
 * - 제약사항 및 특이사항:
 *   - progress 값은 0~100 사이
 *   - 높이 4px, 퍼플 색상 진행 바
 * ---
 * @param progress 진행률 (0~100)
 * ---
 * @example
 * <ProgressIndicator progress={40} />
 */
export function ProgressIndicator({
  progress,
  className,
  ...props
}: IProgressIndicatorProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View
      className={twMerge('h-[4px] bg-[#e3e3e3] rounded-full w-full', className)}
      {...props}
    >
      <View
        className="h-full bg-[#8c39fb] rounded-full"
        style={{ width: `${clampedProgress}%` }}
      />
    </View>
  );
}

export default ProgressIndicator;
