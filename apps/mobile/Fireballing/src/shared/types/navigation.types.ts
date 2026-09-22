import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * 인증 스택 파라미터
 * - ONBOARDING = 온보딩 화면
 * - LOGIN = 로그인 화면
 * - REGISTER = 회원가입 화면
 * - TERMS = 이용약관 화면
 */
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Terms: undefined;
};

/**
 * 홈 스택 파라미터
 * - HOME = 홈 메인
 * - EDIT_PROFILE = 프로필 수정
 */
export type HomeStackParamList = {
  Home: undefined;
  EditProfile: undefined;
};

/**
 * 내정보 스택 파라미터
 */
export type ProfileStackParamList = {
  Profile: undefined;
};

/**
 * 시뮬레이터 스택 파라미터
 * - MyInfo = 내 정보 입력
 * - PartnerInfo = 상대 정보 입력
 * - Simulator = 시뮬레이션 채팅
 */
export type SimulatorStackParamList = {
  MyInfo: undefined;
  MyInfoDetails: { gender: 'M' | 'F'; mbti?: string };
  PartnerInfo: undefined;
  Simulator: undefined;
};

/**
 * 설정 스택 파라미터
 */
export type SettingsStackParamList = {
  Settings: undefined;
};

/**
 * 앱 하단 탭 네비게이터 파라미터
 */
export type AppTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
  SimulatorTab: NavigatorScreenParams<SimulatorStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};
