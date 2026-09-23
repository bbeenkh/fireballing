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
        <Text className="text-label-sm text-[#211a1a]">조금 더 알려주세요</Text>

        {/* 이름 */}
        <View className="gap-sm">
          <Text className="text-label-sm text-[#211a1a]">이름</Text>
          <View className="gap-[12px]">
            <Text className="text-[16px] font-medium tracking-[-0.16px] text-[#1a1a1a]">
              이름
            </Text>
            <View className="bg-[#f5f5f5] rounded-md p-md flex-row items-center justify-between">
              <TextInput
                testID="input-name"
                placeholder="이름을 입력해 주세요"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                maxLength={10}
                className="flex-1 text-[14px] tracking-[-0.14px] text-[#1a1a1a] p-0"
              />
              <Text className="text-[14px] tracking-[-0.14px] text-[#bfbfbf]">
                {name.length} / 10
              </Text>
            </View>
          </View>
        </View>

        {/* 생년월일 */}
        <View className="gap-sm">
          <Text className="text-label-sm text-[#211a1a]">생년월일</Text>
          <View className="flex-row gap-sm">
            <View className="flex-1 gap-[12px]">
              <Text className="text-[16px] font-semibold tracking-[-0.16px] text-[#1a1a1a]">
                년도
              </Text>
              <View className="bg-[#f5f5f5] rounded-md p-md items-center justify-center">
                <TextInput
                  testID="input-birthYear"
                  placeholder="년도 선택"
                  placeholderTextColor="#888"
                  value={birthYear}
                  onChangeText={setBirthYear}
                  keyboardType="number-pad"
                  maxLength={4}
                  className="text-[14px] tracking-[-0.14px] text-[#1a1a1a] p-0 w-full"
                />
              </View>
            </View>
            <View className="flex-1 gap-[12px]">
              <Text className="text-[16px] font-semibold tracking-[-0.16px] text-[#1a1a1a]">
                날짜
              </Text>
              <View className="bg-[#f5f5f5] rounded-md p-md items-center justify-center">
                <TextInput
                  testID="input-birthDate"
                  placeholder="날짜 선택"
                  placeholderTextColor="#888"
                  value={birthDate}
                  onChangeText={setBirthDate}
                  maxLength={5}
                  className="text-[14px] tracking-[-0.14px] text-[#1a1a1a] p-0 w-full"
                />
              </View>
            </View>
          </View>
        </View>

        {/* 연애 스타일 */}
        <View className="gap-sm">
          <Text className="text-label-sm text-[#211a1a]">연애 스타일</Text>
          <View className="flex-row gap-sm">
            {STYLES.map(s => (
              <Pressable
                key={s.value}
                testID={`style-${s.value}`}
                onPress={() => setStyle(s.value)}
                className={`flex-1 h-[42px] rounded-md px-md py-[10px] flex-row items-center justify-center gap-[10px] ${
                  style === s.value
                    ? 'bg-[#f5edff] border border-[#8c39fb]'
                    : 'bg-[#f5f5f5]'
                }`}
              >
                <Text
                  className={`flex-1 text-label-md tracking-[-0.14px] ${
                    style === s.value ? 'text-[#8c39fb]' : 'text-[#1a1a1a]'
                  }`}
                >
                  {s.label}
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
                className={`w-[23%] h-[42px] rounded-md px-md py-[10px] items-center justify-center ${
                  job === j.value
                    ? 'bg-[#f5edff] border border-[#8c39fb]'
                    : 'bg-[#f5f5f5]'
                }`}
              >
                <Text
                  className={`text-label-md tracking-[-0.14px] ${
                    job === j.value ? 'text-[#8c39fb]' : 'text-[#1a1a1a]'
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
          testID="cta-save"
          disabled={!canSubmit}
          onPress={handleSave}
          className={`h-[56px] rounded-md items-center justify-center ${
            canSubmit ? 'bg-[#8c39fb]' : 'bg-[#e3e3e3]'
          }`}
        >
          <Text className="text-[16px] font-bold tracking-[-0.16px] text-white">
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
