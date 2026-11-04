import {
  getAnalytics,
  logEvent as firebaseLogEvent,
} from '@react-native-firebase/analytics';

/**
 * # logEvent
 * ---
 * - 간단설명: Firebase Analytics 이벤트 전송 래퍼
 * - 제약사항: Firebase 프로젝트 설정 및 config 파일(google-services.json, GoogleService-Info.plist) 필요
 * ---
 * @param name 이벤트 이름
 * @param params 이벤트 파라미터 (선택)
 * ---
 * @example
 * import { logEvent } from '@/shared/lib/analytics';
 * logEvent('button_click', { screen: 'home' });
 */
export function logEvent(
  name: string,
  params?: Record<string, string | number>,
) {
  const analytics = getAnalytics();
  firebaseLogEvent(analytics, name, params);
}
