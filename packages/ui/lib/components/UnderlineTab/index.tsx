import React from 'react';
import {
  View,
  Text,
  Pressable,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IUnderlineTabItemProps extends PressableProps {
  /** 탭 라벨 */
  label: string;
  /** 활성 상태 */
  active?: boolean;
  className?: string;
}

interface IUnderlineTabProps extends ViewProps {
  /** UnderlineTab.Item 컴포넌트들 */
  children: React.ReactNode;
  className?: string;
}

/**
 * # UnderlineTab
 * ---
 * - 간단설명: 밑줄 탭 네비게이션 컴포넌트
 * - 제약사항 및 특이사항:
 *   - UnderlineTab.Item으로 각 탭 구성
 *   - active 탭은 퍼플 텍스트 + 하단 퍼플 밑줄
 * ---
 * @param children UnderlineTab.Item 컴포넌트들
 * ---
 * @example
 * <UnderlineTab>
 *   <UnderlineTab.Item label="전체" active onPress={() => setTab('all')} />
 *   <UnderlineTab.Item label="진행중" onPress={() => setTab('ing')} />
 *   <UnderlineTab.Item label="완료" onPress={() => setTab('done')} />
 * </UnderlineTab>
 */
function UnderlineTab({ children, className, ...props }: IUnderlineTabProps) {
  return (
    <View className={twMerge('flex-row items-center', className)} {...props}>
      {children}
    </View>
  );
}

/**
 * # UnderlineTab.Item
 * ---
 * - 간단설명: 밑줄 탭의 개별 아이템
 * ---
 * @param label 탭 라벨
 * @param active 활성 상태
 */
function UnderlineTabItem({
  label,
  active = false,
  className,
  ...props
}: IUnderlineTabItemProps) {
  return (
    <Pressable
      className={twMerge(
        'flex-1 items-center py-3',
        active && 'border-b-2 border-[#8c39fb]',
        className,
      )}
      {...props}
    >
      <Text
        className={twMerge(
          'text-body-sm',
          active
            ? 'text-[#8c39fb] font-semibold'
            : 'text-[#888888] font-medium',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

UnderlineTab.Item = UnderlineTabItem;

export type { IUnderlineTabProps, IUnderlineTabItemProps };
export default UnderlineTab;
