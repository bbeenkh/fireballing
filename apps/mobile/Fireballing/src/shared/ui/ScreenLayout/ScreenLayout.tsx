import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * # ScreenLayout
 * ---
 * - 간단설명: SafeArea insets를 패딩으로 적용하는 화면 공통 레이아웃
 * - 제약사항 및 특이사항:
 *   - SafeAreaView 대신 useSafeAreaInsets 훅 사용 (Android 이슈 회피)
 *   - 기본 배경색 #ffffff
 * ---
 * @param children 화면 내용
 * @param style 추가 스타일 (선택)
 * ---
 * @example
 * <ScreenLayout>
 *   <Text>화면 내용</Text>
 * </ScreenLayout>
 */
export function ScreenLayout({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingBottom: insets.bottom,
          backgroundColor: '#ffffff',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
