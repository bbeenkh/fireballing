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
    <View className="flex-1">
      {/* TopBar */}
      <View className="h-[56px] flex-row items-center justify-between px-gutter">
        <Text className="text-[18px] font-bold text-[#1a1a1a] tracking-[-0.18px]">
          앱이름
        </Text>
        <Pressable hitSlop={8}>
          <IconMore size={24} color="#1a1a1a" />
        </Pressable>
      </View>

      {/* Content */}
      <View className="flex-1 p-gutter">
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
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* 프로필 요약 카드 */}
      <View
        testID="profile-summary-card"
        className="bg-white border border-[#f1ddd7] rounded-[20px] p-gutter gap-md"
      >
        {/* 카드 헤더 */}
        <View className="flex-row justify-between items-center">
          <Text className="text-label-sm text-[#888] tracking-[-0.12px]">
            내 정보
          </Text>
          <Pressable testID="btn-edit-profile" onPress={onEdit} hitSlop={8}>
            <Text className="text-label-md text-[#8b5fa0] tracking-[-0.14px]">
              수정
            </Text>
          </Pressable>
        </View>

        {/* 칩 Row */}
        <View className="flex-row gap-sm items-center pt-[12px]">
          <InfoChip label={profileData.mbti} />
          <InfoChip label={profileData.gender} />
          <InfoChip label={`${profileData.age}세`} />
        </View>

        {/* 구분선 */}
        <View className="py-md">
          <View className="h-[1px] bg-[#f1ddd7]" />
        </View>

        {/* 궁합 섹션 */}
        {compatibleTypes.length > 0 && (
          <View className="gap-sm">
            <Text className="text-label-sm text-[#888] tracking-[-0.12px]">
              {profileData.mbti}와 잘 맞는 유형
            </Text>
            <View className="flex-row gap-sm items-center">
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
        className="bg-white border border-[#f1ddd7] rounded-[20px] p-gutter flex-row items-center justify-between mt-md"
      >
        <View className="flex-1">
          <Text className="text-label-sm text-[#888] tracking-[-0.12px]">
            최근 결과
          </Text>
          <View className="h-[6px]" />
          <Text className="text-label-md text-[#1a1a1a] tracking-[-0.14px]">
            아직 결과가 없어요
          </Text>
        </View>
        <Text className="text-[16px] text-[#888]">›</Text>
      </View>

      {/* 체크 Row */}
      <View className="flex-row items-center gap-[12px] h-[48px] mt-md">
        <View className="w-[24px] h-[24px] border-[1.5px] border-[#e3e3e3] rounded-sm" />
        <Text className="flex-1 text-[16px] font-medium text-[#1a1a1a] tracking-[-0.16px]">
          연애 스타일 정보 등록하기
        </Text>
        <Text className="text-label-sm text-[#888] tracking-[-0.12px] underline">
          보기
        </Text>
      </View>

      {/* 프로필 전체보기 */}
      <View className="items-center justify-center mt-md">
        <Pressable className="flex-row items-center gap-xs" hitSlop={8}>
          <Text className="text-label-md text-[#111] tracking-[-0.14px]">
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
    <View className="bg-[#f5f5f5] rounded-[20px] px-[12px] py-[6px]">
      <Text className="text-label-sm text-[#888] tracking-[-0.12px]">
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
    <View className="bg-white border border-[#8c39fb] rounded-[20px] px-[12px] py-[6px]">
      <Text className="text-label-sm text-[#8c39fb] tracking-[-0.12px]">
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
    <View className="bg-[#f5edff] border border-[#8c39fb] rounded-[20px] p-gutter gap-gutter">
      {/* 카드 헤더 */}
      <View className="flex-row justify-between items-center">
        <Text className="text-label-sm text-[#888] tracking-[-0.12px]">
          내 정보
        </Text>
        <View className="bg-[#f5edff] px-[12px] py-sm rounded-[20px]">
          <Text className="text-label-sm text-[#1a1a1a] tracking-[-0.12px]">
            미등록
          </Text>
        </View>
      </View>

      {/* 안내 텍스트 */}
      <View className="gap-sm">
        <Text className="text-label-sm text-[#1a1a1a]">
          아직 등록된 정보가 없어요
        </Text>
        <Text className="text-label-sm text-[#888]">
          이름, MBTI, 연애 스타일 등 내 정보를 등록하면 더 정확한 결과를
          알려드릴게요.
        </Text>
      </View>

      {/* CTA 버튼 */}
      <Pressable
        testID="cta-register-profile"
        onPress={onRegister}
        className="bg-[#8c39fb] h-[56px] rounded-md items-center justify-center active:bg-[#7a31e0]"
      >
        <Text className="text-[16px] font-bold text-white tracking-[-0.16px]">
          내 정보 등록하기
        </Text>
      </Pressable>
    </View>
  );
}
