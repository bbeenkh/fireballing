import React from 'react';
import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IStepIndicatorProps extends ViewProps {
  /** 총 단계 수 */
  totalSteps: number;
  /** 현재 단계 (1부터 시작) */
  currentStep: number;
  className?: string;
}

/**
 * # StepIndicator
 * ---
 * - 간단설명: 단계 진행 도트 표시 컴포넌트
 * - 제약사항 및 특이사항:
 *   - currentStep까지 퍼플, 이후는 회색 도트
 *   - 도트 사이 연결선 포함
 * ---
 * @param totalSteps 총 단계 수
 * @param currentStep 현재 단계 (1부터)
 * ---
 * @example
 * <StepIndicator totalSteps={4} currentStep={2} />
 */
export function StepIndicator({
  totalSteps,
  currentStep,
  className,
  ...props
}: IStepIndicatorProps) {
  return (
    <View
      className={twMerge('flex-row items-center gap-sm', className)}
      {...props}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= currentStep;
        return (
          <React.Fragment key={stepNum}>
            <View
              className={twMerge(
                'w-[8px] h-[8px] rounded-full',
                isActive ? 'bg-[#8c39fb]' : 'bg-[#e3e3e3]',
              )}
            />
            {stepNum < totalSteps && (
              <View
                className={twMerge(
                  'flex-1 h-[2px]',
                  stepNum < currentStep ? 'bg-[#8c39fb]' : 'bg-[#e3e3e3]',
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

export default StepIndicator;
