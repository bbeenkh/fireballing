import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StepIndicator } from '@fblg/core-ui';
import { withLayout } from '@/shared/ui/ScreenLayout';
import { useSimulatorStore } from '@/entities/simulator';
import type { Partner } from '@/entities/simulator';
import type { SimulatorStackParamList } from '@/shared/types';

type Nav = NativeStackNavigationProp<SimulatorStackParamList, 'PartnerInfo'>;

const MBTI_TYPES = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

const AGE_RELS = [
  { value: 'younger' as const, label: '연하' },
  { value: 'same' as const, label: '동갑' },
  { value: 'older' as const, label: '연상' },
];

const JOBS: { value: Partner['job']; label: string }[] = [
  { value: 'office', label: '직장인' },
  { value: 'professional', label: '전문직' },
  { value: 'creative', label: '크리에이티브' },
  { value: 'service', label: '서비스직' },
  { value: 'student', label: '학생' },
  { value: 'freelance', label: '프리랜서' },
];

/**
 * # PartnerInfoScreenBase
 * ---
 * - 간단설명: 상대 정보 입력 화면 (성별·MBTI·나이·직업 필수)
 * - 제약사항 및 특이사항:
 *   - 성별 초기값: 내 성별의 반대
 *   - 입력값은 세션에만 유지, 기기에 저장하지 않음
 * ---
 * @example
 * <PartnerInfoScreen />
 */
function PartnerInfoScreenBase() {
  const navigation = useNavigation<Nav>();
  const me = useSimulatorStore(s => s.me);
  const setPartner = useSimulatorStore(s => s.setPartner);

  const defaultGender = me?.gender === 'F' ? 'M' : 'F';
  const [gender, setGender] = useState<'M' | 'F'>(defaultGender as 'M' | 'F');
  const [mbti, setMbti] = useState<string | null>(null);
  const [ageRel, setAgeRel] = useState<Partner['ageRel'] | null>(null);
  const [job, setJob] = useState<Partner['job'] | null>(null);

  const canSubmit = mbti !== null && ageRel !== null && job !== null;

  const handleNext = () => {
    if (!mbti || !ageRel || !job) return;
    setPartner({ gender, mbti, ageRel, job });
    navigation.navigate('Simulator');
  };

  return (
    <View className="flex-1 bg-[#fff9f5]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-gutter pt-lg pb-[96px] gap-md"
      >
        {/* 진행 표시 */}
        <View className="flex-row items-center gap-sm">
          <StepIndicator totalSteps={2} currentStep={2} />
          <Text className="text-label-sm text-[#927a76]">2 / 2</Text>
        </View>

        {/* 타이틀 */}
        <Text className="text-label-sm text-[#211a1a]">
          어떤 사람과 대화할까요?
        </Text>

        {/* 성별 */}
        <View className="gap-sm">
          <Text className="text-label-sm text-[#211a1a]">성별</Text>
          <View className="flex-row gap-sm">
            {[
              { value: 'F' as const, label: '여성' },
              { value: 'M' as const, label: '남성' },
            ].map(g => (
              <Pressable
                key={g.value}
                testID={`gender-${g.value}`}
                onPress={() => setGender(g.value)}
                className={`flex-1 h-[42px] rounded-md p-md justify-center ${
                  gender === g.value ? 'bg-[#1b1b1b]' : 'bg-[#f5f5f5]'
                }`}
              >
                <Text
                  className={`text-label-md tracking-[-0.14px] ${
                    gender === g.value ? 'text-[#f5f5f5]' : 'text-[#111]'
                  }`}
                >
                  {g.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* MBTI */}
        <View className="gap-sm">
          <View className="flex-row justify-between items-center">
            <Text className="text-label-sm text-[#211a1a]">MBTI</Text>
            <Text className="text-label-sm text-[#8c39fb]">필수</Text>
          </View>
          <View className="flex-row flex-wrap gap-sm">
            {MBTI_TYPES.map(type => (
              <Pressable
                key={type}
                testID={`mbti-${type}`}
                onPress={() => setMbti(prev => (prev === type ? null : type))}
                className={`w-[23%] h-[42px] rounded-md p-md justify-center ${
                  mbti === type ? 'bg-[#1b1b1b]' : 'bg-[#f5f5f5]'
                }`}
              >
                <Text
                  className={`text-label-md tracking-[-0.14px] ${
                    mbti === type ? 'text-[#f5f5f5]' : 'text-[#111]'
                  }`}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text className="text-label-sm text-[#8b5fa0] text-center">
            모름 · 2문항으로 찾기
          </Text>
        </View>

        {/* 나이 */}
        <View className="gap-sm">
          <Text className="text-label-sm text-[#211a1a]">나이</Text>
          <View className="flex-row gap-sm">
            {AGE_RELS.map(a => (
              <Pressable
                key={a.value}
                testID={`age-${a.value}`}
                onPress={() => setAgeRel(a.value)}
                className={`flex-1 h-[42px] rounded-md p-md justify-center items-center ${
                  ageRel === a.value ? 'bg-[#1b1b1b]' : 'bg-[#f5f5f5]'
                }`}
              >
                <Text
                  className={`text-label-md tracking-[-0.14px] ${
                    ageRel === a.value ? 'text-[#f5f5f5]' : 'text-[#111]'
                  }`}
                >
                  {a.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 직업 */}
        <View className="gap-sm">
          <Text className="text-label-sm text-[#211a1a]">직업</Text>
          <View className="flex-row flex-wrap gap-sm">
            {JOBS.map(j => (
              <Pressable
                key={j.value}
                testID={`job-${j.value}`}
                onPress={() => setJob(j.value)}
                className={`w-[31%] h-[42px] rounded-md p-md justify-center items-center ${
                  job === j.value ? 'bg-[#1b1b1b]' : 'bg-[#f5f5f5]'
                }`}
              >
                <Text
                  className={`text-label-md tracking-[-0.14px] ${
                    job === j.value ? 'text-[#f5f5f5]' : 'text-[#111]'
                  }`}
                >
                  {j.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* CTA 고정 하단 */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-[#fff9f5] px-gutter pt-[12px] pb-lg"
        // RN shadow props(shadowOffset 등)와 Android elevation은 NativeWind className으로 변환 불가
        style={{
          shadowColor: '#211a1a',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Pressable
          testID="cta-next"
          disabled={!canSubmit}
          onPress={handleNext}
          className={`h-[56px] rounded-md items-center justify-center ${
            canSubmit ? 'bg-[#8c39fb]' : 'bg-[#e3e3e3]'
          }`}
        >
          <Text className="text-[16px] font-bold tracking-[-0.16px] text-white">
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const PartnerInfoScreen = withLayout(PartnerInfoScreenBase, {
  backgroundColor: '#fff9f5',
});
