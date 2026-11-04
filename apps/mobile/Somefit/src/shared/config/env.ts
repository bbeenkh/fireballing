import Config from 'react-native-config';

/**
 * # EnvConfig
 * ---
 * - 간단설명: 환경변수 타입 정의
 * - 제약사항: APP_ENV는 'development' | 'production' 중 하나여야 함
 */
export type EnvConfig = {
  /** 백엔드 API 기본 URL */
  API_URL: string;
  /** 현재 실행 환경 */
  APP_ENV: 'development' | 'production';
  /** Revopush Android 배포 키 */
  CODEPUSH_KEY_ANDROID: string;
  /** Revopush iOS 배포 키 */
  CODEPUSH_KEY_IOS: string;
};

/**
 * # env
 * ---
 * - 간단설명: react-native-config의 Config 객체를 타입 지정하여 노출하는 환경변수 접근 모듈
 * - 제약사항: .env.development / .env.production 중 하나가 ENVFILE로 선택되어야 함
 * ---
 * @example
 * import { env } from '@shared/config/env';
 * console.log(env.API_URL);   // 'http://localhost:8080'
 * console.log(env.APP_ENV);   // 'development'
 */
export const env = Config as unknown as EnvConfig;
