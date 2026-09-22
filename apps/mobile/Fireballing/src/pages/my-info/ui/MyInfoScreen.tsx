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
          <StepIndicator totalSteps={2} currentStep={1} />
          <Text style={{ fontSize: 12, color: '#927a76' }}>1 / 2</Text>
        </View>

        {/* 타이틀 */}
        <Text style={{ fontSize: 12, color: '#211a1a' }}>나를 알려주세요</Text>

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
            <Text style={{ fontSize: 12, color: '#8b5fa0' }}>선택</Text>
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

export const MyInfoScreen = withLayout(MyInfoScreenBase, {
  backgroundColor: '#fff9f5',
});
