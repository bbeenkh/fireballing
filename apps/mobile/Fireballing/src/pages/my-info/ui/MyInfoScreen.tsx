import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StepIndicator } from '@fblg/core-ui';
import { withLayout } from '@/shared/ui/ScreenLayout';
import type { SimulatorStackParamList } from '@/shared/types';

type Nav = NativeStackNavigationProp<SimulatorStackParamList, 'MyInfo'>;

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

/**
 * # MyInfoScreenBase
 * ---
 * - 간단설명: 내 정보 입력 화면 (성별 필수 + MBTI 선택)
 * - 제약사항 및 특이사항:
 *   - CTA는 성별 선택 시에만 활성화
 *   - MBTI는 선택 사항
 * ---
 * @example
 * <MyInfoScreen />
 */
function MyInfoScreenBase() {
  const navigation = useNavigation<Nav>();

  const [gender, setGender] = useState<'M' | 'F' | null>(null);
  const [mbti, setMbti] = useState<string | null>(null);

  const canSubmit = gender !== null;

  const handleNext = () => {
    if (!gender) return;
    navigation.navigate('MyInfoDetails', {
      gender,
      ...(mbti ? { mbti } : {}),
    });
  };

  return (
    <View className="flex-1 bg-[#fff9f5]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-gutter pt-lg pb-[96px] gap-md"
      >
        {/* 진행 표시 */}
        <View className="flex-row items-center gap-sm">
          <StepIndicator totalSteps={2} currentStep={1} />
          <Text className="text-label-sm text-[#927a76]">1 / 2</Text>
        </View>

        {/* 타이틀 */}
        <Text className="text-label-sm text-[#211a1a]">나를 알려주세요</Text>

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
            <Text className="text-label-sm text-[#8b5fa0]">선택</Text>
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

export const MyInfoScreen = withLayout(MyInfoScreenBase, {
  backgroundColor: '#fff9f5',
});
