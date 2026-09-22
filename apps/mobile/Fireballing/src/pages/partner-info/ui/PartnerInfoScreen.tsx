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
    <View style={{ flex: 1, backgroundColor: '#fff9f5' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 96,
          gap: 16,
        }}
      >
        {/* 진행 표시 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <StepIndicator totalSteps={2} currentStep={2} />
          <Text style={{ fontSize: 12, color: '#927a76' }}>2 / 2</Text>
        </View>

        {/* 타이틀 */}
        <Text style={{ fontSize: 12, color: '#211a1a' }}>
          어떤 사람과 대화할까요?
        </Text>

        {/* 성별 */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, color: '#211a1a' }}>성별</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[
              { value: 'F' as const, label: '여성' },
              { value: 'M' as const, label: '남성' },
            ].map(g => (
              <Pressable
                key={g.value}
                testID={`gender-${g.value}`}
                onPress={() => setGender(g.value)}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 12,
                  padding: 16,
                  justifyContent: 'center',
                  backgroundColor: gender === g.value ? '#1b1b1b' : '#f5f5f5',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: -0.14,
                    color: gender === g.value ? '#f5f5f5' : '#111',
                  }}
                >
                  {g.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* MBTI */}
        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: '#211a1a' }}>MBTI</Text>
            <Text style={{ fontSize: 12, color: '#8c39fb' }}>필수</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {MBTI_TYPES.map(type => (
              <Pressable
                key={type}
                testID={`mbti-${type}`}
                onPress={() => setMbti(prev => (prev === type ? null : type))}
                style={{
                  width: '23%',
                  height: 42,
                  borderRadius: 12,
                  padding: 16,
                  justifyContent: 'center',
                  backgroundColor: mbti === type ? '#1b1b1b' : '#f5f5f5',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: -0.14,
                    color: mbti === type ? '#f5f5f5' : '#111',
                  }}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={{ fontSize: 12, color: '#8b5fa0', textAlign: 'center' }}>
            모름 · 2문항으로 찾기
          </Text>
        </View>

        {/* 나이 */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, color: '#211a1a' }}>나이</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {AGE_RELS.map(a => (
              <Pressable
                key={a.value}
                testID={`age-${a.value}`}
                onPress={() => setAgeRel(a.value)}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 12,
                  padding: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: ageRel === a.value ? '#1b1b1b' : '#f5f5f5',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: -0.14,
                    color: ageRel === a.value ? '#f5f5f5' : '#111',
                  }}
                >
                  {a.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 직업 */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, color: '#211a1a' }}>직업</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {JOBS.map(j => (
              <Pressable
                key={j.value}
                testID={`job-${j.value}`}
                onPress={() => setJob(j.value)}
                style={{
                  width: '31%',
                  height: 42,
                  borderRadius: 12,
                  padding: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: job === j.value ? '#1b1b1b' : '#f5f5f5',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: -0.14,
                    color: job === j.value ? '#f5f5f5' : '#111',
                  }}
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
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff9f5',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 24,
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
          style={{
            height: 56,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: canSubmit ? '#8c39fb' : '#e3e3e3',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              letterSpacing: -0.16,
              color: '#fff',
            }}
          >
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
