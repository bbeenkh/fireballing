import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { StepIndicator } from '@fblg/core-ui';
import { withLayout } from '@/shared/ui/ScreenLayout';
import { useSimulatorStore } from '@/entities/simulator';
import type { Me } from '@/entities/simulator';
import type { SimulatorStackParamList } from '@/shared/types';

type Nav = NativeStackNavigationProp<SimulatorStackParamList, 'MyInfoDetails'>;
type Route = RouteProp<SimulatorStackParamList, 'MyInfoDetails'>;

const STYLES: { value: Me['style']; label: string }[] = [
  { value: 'lead', label: '리드형' },
  { value: 'follow', label: '맞춤형' },
  { value: 'both', label: '반반' },
];

const JOBS: { value: Me['job']; label: string }[] = [
  { value: 'student', label: '학생' },
  { value: 'office', label: '직장인' },
  { value: 'unemployed', label: '무직' },
  { value: 'professional', label: '전문직' },
  { value: 'freelance', label: '프리랜서' },
];

/**
 * # MyInfoDetailsScreenBase
 * ---
 * - 간단설명: 내 정보 입력 2단계 (이름, 생년월일, 연애 스타일, 직업)
 * - 제약사항 및 특이사항:
 *   - step 1(성별+MBTI)에서 params로 전달받은 값과 합쳐 저장
 *   - CTA는 모든 필수 항목 입력 시 활성화
 * ---
 * @example
 * <MyInfoDetailsScreen />
 */
function MyInfoDetailsScreenBase() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const setMe = useSimulatorStore(s => s.setMe);

  const { gender, mbti } = route.params;

  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [style, setStyle] = useState<Me['style'] | null>(null);
  const [job, setJob] = useState<Me['job'] | null>(null);

  const canSubmit =
    name.trim().length > 0 &&
    birthYear.length > 0 &&
    birthDate.length > 0 &&
    style !== null &&
    job !== null;

  const handleSave = async () => {
    if (!canSubmit || !style || !job) return;
    await setMe({
      gender,
      ...(mbti ? { mbti } : {}),
      name: name.trim(),
      birthYear,
      birthDate,
      style,
      job,
    });
    navigation.navigate('PartnerInfo');
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
          조금 더 알려주세요
        </Text>

        {/* 이름 */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, color: '#211a1a' }}>이름</Text>
          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                letterSpacing: -0.16,
                color: '#1a1a1a',
              }}
            >
              이름
            </Text>
            <View
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                testID="input-name"
                placeholder="이름을 입력해 주세요"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                maxLength={10}
                style={{
                  flex: 1,
                  fontSize: 14,
                  letterSpacing: -0.14,
                  color: '#1a1a1a',
                  padding: 0,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: -0.14,
                  color: '#bfbfbf',
                }}
              >
                {name.length} / 10
              </Text>
            </View>
          </View>
        </View>

        {/* 생년월일 */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, color: '#211a1a' }}>생년월일</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1, gap: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  letterSpacing: -0.16,
                  color: '#1a1a1a',
                }}
              >
                년도
              </Text>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  testID="input-birthYear"
                  placeholder="년도 선택"
                  placeholderTextColor="#888"
                  value={birthYear}
                  onChangeText={setBirthYear}
                  keyboardType="number-pad"
                  maxLength={4}
                  style={{
                    fontSize: 14,
                    letterSpacing: -0.14,
                    color: '#1a1a1a',
                    padding: 0,
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 1, gap: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  letterSpacing: -0.16,
                  color: '#1a1a1a',
                }}
              >
                날짜
              </Text>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  testID="input-birthDate"
                  placeholder="날짜 선택"
                  placeholderTextColor="#888"
                  value={birthDate}
                  onChangeText={setBirthDate}
                  maxLength={5}
                  style={{
                    fontSize: 14,
                    letterSpacing: -0.14,
                    color: '#1a1a1a',
                    padding: 0,
                    width: '100%',
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* 연애 스타일 */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, color: '#211a1a' }}>연애 스타일</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {STYLES.map(s => (
              <Pressable
                key={s.value}
                testID={`style-${s.value}`}
                onPress={() => setStyle(s.value)}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  backgroundColor:
                    style === s.value ? '#f5edff' : '#f5f5f5',
                  borderWidth: style === s.value ? 1 : 0,
                  borderColor: style === s.value ? '#8c39fb' : 'transparent',
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: -0.14,
                    color: style === s.value ? '#8c39fb' : '#1a1a1a',
                  }}
                >
                  {s.label}
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
                  width: '23%',
                  height: 42,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    job === j.value ? '#f5edff' : '#f5f5f5',
                  borderWidth: job === j.value ? 1 : 0,
                  borderColor: job === j.value ? '#8c39fb' : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: -0.14,
                    color: job === j.value ? '#8c39fb' : '#1a1a1a',
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
          testID="cta-save"
          disabled={!canSubmit}
          onPress={handleSave}
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
            저장하고 계속
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const MyInfoDetailsScreen = withLayout(MyInfoDetailsScreenBase, {
  backgroundColor: '#fff9f5',
});
