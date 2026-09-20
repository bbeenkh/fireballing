import React from 'react';
import { Text, Pressable, ScrollView, View } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { withLayout } from '@/shared/ui/ScreenLayout';
import { useAuthStore } from '@/entities/auth';
import type { AppTabParamList } from '@/shared/types';
/**
 * # HomeScreen
 * ---
 * - 간단설명: 홈 화면 (개발용 내비게이션 맵 포함)
 */
function HomeScreenBase() {
  const navigation = useNavigation<NavigationProp<AppTabParamList>>();
  const logout = useAuthStore(s => s.logout);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          padding: 16,
          color: '#1a1a1a',
        }}
      >
        홈
      </Text>

      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 14, color: '#9e928e', marginBottom: 4 }}>
          탭 네비게이션
        </Text>
        <NavButton
          label="포트폴리오 탭"
          onPress={() =>
            navigation.navigate({
              name: 'PortfolioTab',
              params: { screen: 'Portfolio' },
            })
          }
        />
        <NavButton
          label="시뮬레이터 탭"
          onPress={() =>
            navigation.navigate({
              name: 'SimulatorTab',
              params: { screen: 'Simulator' },
            })
          }
        />
        <NavButton
          label="마이페이지 탭"
          onPress={() =>
            navigation.navigate({
              name: 'MyPageTab',
              params: { screen: 'MyPage' },
            })
          }
        />

        <Text
          style={{
            fontSize: 14,
            color: '#9e928e',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          마이페이지 스택
        </Text>
        <NavButton
          label="프로필 수정"
          onPress={() =>
            navigation.navigate({
              name: 'MyPageTab',
              params: { screen: 'EditProfile' },
            })
          }
        />
        <NavButton
          label="설정"
          onPress={() =>
            navigation.navigate({
              name: 'MyPageTab',
              params: { screen: 'Settings' },
            })
          }
        />

        <Text
          style={{
            fontSize: 14,
            color: '#9e928e',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          인증
        </Text>
        <NavButton label="로그아웃 → AuthStack" onPress={logout} danger />
      </View>
    </ScrollView>
  );
}

export const HomeScreen = withLayout(HomeScreenBase);

function NavButton({
  label,
  onPress,
  danger,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: danger
          ? pressed
            ? '#cc3300'
            : '#ff5a26'
          : pressed
            ? '#f0f0f0'
            : '#f8f8f8',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: danger ? '#ff5a26' : '#e5e5e5',
      })}
    >
      <Text style={{ fontSize: 15, color: danger ? '#ffffff' : '#1a1a1a' }}>
        {label}
      </Text>
    </Pressable>
  );
}
