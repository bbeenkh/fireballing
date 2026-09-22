import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IconMore, IconChevronDown } from '@fblg/core-ui';
import { withLayout } from '@/shared/ui/ScreenLayout';
import { useProfileStore } from '@/entities/profile';
import type { IProfileData } from '@/entities/profile';
import type { HomeStackParamList } from '@/shared/types';

/**
 * MBTI 궁합 매핑
 * - 각 MBTI 유형별 잘 맞는 유형 목록
 */
const MBTI_COMPATIBILITY: Record<string, string[]> = {
  INFJ: ['ENFP', 'ENTP'],
  INFP: ['ENFJ', 'ENTJ'],
  INTJ: ['ENFP', 'ENTP'],
  INTP: ['ENTJ', 'ESTJ'],
  ENFJ: ['INFP', 'ISFP'],
  ENFP: ['INFJ', 'INTJ'],
  ENTJ: ['INFP', 'INTP'],
  ENTP: ['INFJ', 'INTJ'],
  ISFJ: ['ESFP', 'ESTP'],
  ISFP: ['ENFJ', 'ESFJ'],
  ISTJ: ['ESFP', 'ESTP'],
  ISTP: ['ESFJ', 'ESTJ'],
  ESFJ: ['ISFP', 'ISTP'],
  ESFP: ['ISFJ', 'ISTJ'],
  ESTJ: ['INTP', 'ISTP'],
  ESTP: ['ISFJ', 'ISTJ'],
};

/**
 * # HomeScreen
 * ---
 * - 간단설명: 홈 화면 — 프로필 미등록 시 빈 상태, 등록 시 요약 카드 표시
 * - 제약사항 및 특이사항:
 *   - 자체 TopBar 사용 (Stack header 숨김)
 *   - 배경색 #fff9f5
 * ---
 * @example
 * <HomeScreen />
 */
function HomeScreenBase() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const hasProfile = useProfileStore(s => s.hasProfile);
  const profileData = useProfileStore(s => s.profileData);

  return (
    <View style={{ flex: 1 }}>
      {/* TopBar */}
      <View
        style={{
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1a1a1a',
            letterSpacing: -0.18,
          }}
        >
          앱이름
        </Text>
        <Pressable hitSlop={8}>
          <IconMore size={24} color="#1a1a1a" />
        </Pressable>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        {hasProfile && profileData ? (
          <ProfileFilledContent
            profileData={profileData}
            onEdit={() => navigation.navigate('EditProfile')}
          />
        ) : (
          <ProfileEmptyCard
            onRegister={() => navigation.navigate('EditProfile')}
          />
        )}
      </View>
    </View>
  );
}

export const HomeScreen = withLayout(HomeScreenBase, {
  backgroundColor: '#fff9f5',
});

/**
 * # ProfileFilledContent
 * ---
 * - 간단설명: 프로필 등록 완료 시 표시되는 요약 컨텐츠
 */
function ProfileFilledContent({
  profileData,
  onEdit,
}: {
  profileData: IProfileData;
  onEdit: () => void;
}) {
  const compatibleTypes = MBTI_COMPATIBILITY[profileData.mbti] ?? [];

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* 프로필 요약 카드 */}
      <View
        testID="profile-summary-card"
        style={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#f1ddd7',
          borderRadius: 20,
          padding: 20,
          gap: 16,
        }}
      >
        {/* 카드 헤더 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: '#888', letterSpacing: -0.12 }}>
            내 정보
          </Text>
          <Pressable testID="btn-edit-profile" onPress={onEdit} hitSlop={8}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#8b5fa0',
                letterSpacing: -0.14,
              }}
            >
              수정
            </Text>
          </Pressable>
        </View>

        {/* 칩 Row */}
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            paddingTop: 12,
          }}
        >
          <InfoChip label={profileData.mbti} />
          <InfoChip label={profileData.gender} />
          <InfoChip label={`${profileData.age}세`} />
        </View>

        {/* 구분선 */}
        <View style={{ paddingVertical: 16 }}>
          <View style={{ height: 1, backgroundColor: '#f1ddd7' }} />
        </View>

        {/* 궁합 섹션 */}
        {compatibleTypes.length > 0 && (
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, color: '#888', letterSpacing: -0.12 }}>
              {profileData.mbti}와 잘 맞는 유형
            </Text>
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              {compatibleTypes.map(type => (
                <MatchChip key={type} label={`${type} ›`} />
              ))}
            </View>
          </View>
        )}
      </View>

      {/* 최근 결과 카드 */}
      <View
        testID="recent-result-card"
        style={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#f1ddd7',
          borderRadius: 20,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, color: '#888', letterSpacing: -0.12 }}>
            최근 결과
          </Text>
          <View style={{ height: 6 }} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#1a1a1a',
              letterSpacing: -0.14,
            }}
          >
            아직 결과가 없어요
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: '#888' }}>›</Text>
      </View>

      {/* 체크 Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          height: 48,
          marginTop: 16,
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 1.5,
            borderColor: '#e3e3e3',
            borderRadius: 4,
          }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '500',
            color: '#1a1a1a',
            letterSpacing: -0.16,
          }}
        >
          연애 스타일 정보 등록하기
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#888',
            letterSpacing: -0.12,
            textDecorationLine: 'underline',
          }}
        >
          보기
        </Text>
      </View>

      {/* 프로필 전체보기 */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 16,
        }}
      >
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          hitSlop={8}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#111',
              letterSpacing: -0.14,
            }}
          >
            프로필 전체보기
          </Text>
          <IconChevronDown size={20} color="#111" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

/**
 * # InfoChip
 * ---
 * - 간단설명: 회색 배경 정보 표시 칩
 */
function InfoChip({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: '#888',
          letterSpacing: -0.12,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

/**
 * # MatchChip
 * ---
 * - 간단설명: 보라색 테두리 궁합 유형 칩
 */
function MatchChip({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#8c39fb',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: '#8c39fb',
          letterSpacing: -0.12,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

/**
 * # ProfileEmptyCard
 * ---
 * - 간단설명: 프로필 미등록 시 표시되는 안내 카드
 */
function ProfileEmptyCard({ onRegister }: { onRegister: () => void }) {
  return (
    <View
      style={{
        backgroundColor: '#f5edff',
        borderWidth: 1,
        borderColor: '#8c39fb',
        borderRadius: 20,
        padding: 20,
        gap: 20,
      }}
    >
      {/* 카드 헤더 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 12, color: '#888', letterSpacing: -0.12 }}>
          내 정보
        </Text>
        <View
          style={{
            backgroundColor: '#f5edff',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 12, color: '#1a1a1a', letterSpacing: -0.12 }}
          >
            미등록
          </Text>
        </View>
      </View>

      {/* 안내 텍스트 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 12, color: '#1a1a1a' }}>
          아직 등록된 정보가 없어요
        </Text>
        <Text style={{ fontSize: 12, color: '#888' }}>
          이름, MBTI, 연애 스타일 등 내 정보를 등록하면 더 정확한 결과를
          알려드릴게요.
        </Text>
      </View>

      {/* CTA 버튼 */}
      <Pressable
        testID="cta-register-profile"
        onPress={onRegister}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#7a31e0' : '#8c39fb',
          height: 56,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ffffff',
            letterSpacing: -0.16,
          }}
        >
          내 정보 등록하기
        </Text>
      </Pressable>
    </View>
  );
}
