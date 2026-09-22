import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * # withLayout
 * ---
 * - 간단설명: SafeArea insets를 패딩으로 적용하는 화면 공통 레이아웃 HOC
 * - 제약사항 및 특이사항:
 *   - SafeAreaView 대신 useSafeAreaInsets 훅 사용 (Android 이슈 회피)
 *   - 기본 배경색 #ffffff
 * ---
 * @param Component 래핑할 화면 컴포넌트
 * ---
 * @example
 * const MyScreenWithLayout = withLayout(MyScreen);
 */
export function withLayout<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  style?: ViewStyle,
) {
  function WithLayout(props: P) {
    const insets = useSafeAreaInsets();

    return (
      <View
        style={[
          {
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: '#ffffff',
          },
          style,
        ]}
      >
        <Component {...props} />
      </View>
    );
  }

  WithLayout.displayName = `withLayout(${Component.displayName || Component.name || 'Component'})`;
  return WithLayout;
}
