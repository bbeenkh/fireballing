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
 */
export type HomeStackParamList = {
  Home: undefined;
};

/**
 * 포트폴리오 스택 파라미터
 */
export type PortfolioStackParamList = {
  Portfolio: undefined;
};

/**
 * 시뮬레이터 스택 파라미터
 */
export type SimulatorStackParamList = {
  Simulator: undefined;
};

/**
 * 마이페이지 스택 파라미터
 * - MY_PAGE = 마이페이지 메인
 * - EDIT_PROFILE = 프로필 수정
 * - SETTINGS = 설정
 */
export type MyPageStackParamList = {
  MyPage: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

/**
 * 앱 하단 탭 네비게이터 파라미터
 */
export type AppTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  PortfolioTab: NavigatorScreenParams<PortfolioStackParamList>;
  SimulatorTab: NavigatorScreenParams<SimulatorStackParamList>;
  MyPageTab: NavigatorScreenParams<MyPageStackParamList>;
};
