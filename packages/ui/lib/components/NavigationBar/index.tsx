import React from 'react';
import { View, Text, Pressable, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface INavigationBarItemProps extends PressableProps {
  /** 탭 라벨 */
  label: string;
  /** 탭 아이콘 */
  icon: React.ReactNode;
  /** 활성 상태 */
  active?: boolean;
  className?: string;
}

interface INavigationBarProps {
  /** NavigationBar.Item 컴포넌트들 */
  children: React.ReactNode;
  className?: string;
}

/**
 * # NavigationBar
 * ---
 * - 간단설명: 하단 탭 네비게이션 바 컴포넌트
 * - 제약사항 및 특이사항:
 *   - NavigationBar.Item으로 각 탭 구성
 *   - active 탭은 퍼플 텍스트+아이콘, inactive는 검정
 *   - 고정 높이 64px, 흰 배경, 상단 그림자
 * ---
 * @param children NavigationBar.Item 컴포넌트들
 * ---
 * @example
 * <NavigationBar>
 *   <NavigationBar.Item label="홈" icon={<HomeIcon />} active onPress={goHome} />
 *   <NavigationBar.Item label="QR 스캔" icon={<ScanIcon />} onPress={goScan} />
 *   <NavigationBar.Item label="보관함" icon={<BoxIcon />} onPress={goBox} />
 * </NavigationBar>
 */
function NavigationBar({ children, className }: INavigationBarProps) {
  return (
    <View
      className={twMerge('flex-row bg-white h-[64px] items-center', className)}
      // RN shadow props(shadowOffset 등)와 Android elevation은 NativeWind className으로 변환 불가
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
      }}
    >
      {children}
    </View>
  );
}

/**
 * # NavigationBar.Item
 * ---
 * - 간단설명: 하단 네비게이션 바의 개별 탭 아이템
 * ---
 * @param label 탭 라벨 텍스트
 * @param icon 탭 아이콘
 * @param active 활성 상태
 */
function NavigationBarItem({
  label,
  icon,
  active = false,
  className,
  ...props
}: INavigationBarItemProps) {
  return (
    <Pressable
      className={twMerge(
        'flex-1 items-center justify-center gap-1 py-3',
        className,
      )}
      {...props}
    >
      <View className="w-[20px] h-[20px] items-center justify-center">
        {icon}
      </View>
      <Text
        className={twMerge(
          'text-[14px] font-medium',
          active ? 'text-[#8c39fb]' : 'text-[#1a1a1a]',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

NavigationBar.Item = NavigationBarItem;

export type { INavigationBarProps, INavigationBarItemProps };
export default NavigationBar;
