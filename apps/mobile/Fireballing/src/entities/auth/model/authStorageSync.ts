import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Tokens } from '@fblg/authmanager';
import authManager from './authManager';

const STORAGE_KEY = 'auth_tokens';

/**
 * # loadTokensFromStorage
 * ---
 * - 간단설명: AsyncStorage에서 저장된 토큰을 불러와 authManager에 세팅
 * ---
 * @example
 * await loadTokensFromStorage(); // 앱 시작 시 호출
 */
export async function loadTokensFromStorage(): Promise<void> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored) {
    const tokens: Tokens = JSON.parse(stored);
    authManager.setTokens(tokens);
  }
}

/**
 * # persistTokens
 * ---
 * - 간단설명: 토큰을 AsyncStorage에 저장하고 authManager에도 동기화
 * ---
 * @param tokens accessToken, refreshToken 객체
 * ---
 * @example
 * await persistTokens({ accessToken: 'abc', refreshToken: 'def' });
 */
export async function persistTokens(tokens: Tokens): Promise<void> {
  authManager.setTokens(tokens);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

/**
 * # clearPersistedTokens
 * ---
 * - 간단설명: AsyncStorage와 authManager에서 토큰 모두 제거 (로그아웃)
 * ---
 * @example
 * await clearPersistedTokens();
 */
export async function clearPersistedTokens(): Promise<void> {
  authManager.clearToken();
  await AsyncStorage.removeItem(STORAGE_KEY);
}
