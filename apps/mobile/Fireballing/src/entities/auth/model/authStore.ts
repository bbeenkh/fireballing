import { create } from 'zustand';
import type { Tokens } from '@fblg/authmanager';
import authManager from './authManager';
import {
  loadTokensFromStorage,
  persistTokens,
  clearPersistedTokens,
} from './authStorageSync';

/**
 * 인증 상태 인터페이스
 * - isLoggedIn = 로그인 여부 (reactive)
 * - initialize = 앱 시작 시 토큰 복원
 * - login = 로그인 처리
 * - logout = 로그아웃 처리
 */
interface IAuthState {
  /** 로그인 여부 */
  isLoggedIn: boolean;
  /** 앱 시작 시 AsyncStorage에서 토큰 복원 후 상태 동기화 */
  initialize: () => Promise<void>;
  /** 토큰 저장 + 로그인 상태 전환 */
  login: (tokens: Tokens) => Promise<void>;
  /** 토큰 제거 + 로그아웃 상태 전환 */
  logout: () => Promise<void>;
}

/**
 * # useAuthStore
 * ---
 * - 간단설명: authManager.isLogined를 React에서 구독 가능하게 만드는 Zustand 브릿지
 * - 제약사항 및 특이사항:
 *   - authManager는 plain mutable 객체이므로 상태 변경 시 re-render 불가
 *   - 이 스토어가 isLoggedIn을 관리하여 RootNavigator에서 조건부 렌더링 가능
 * ---
 * @example
 * const isLoggedIn = useAuthStore(s => s.isLoggedIn);
 */
export const useAuthStore = create<IAuthState>((set) => ({
  isLoggedIn: authManager.isLogined,

  initialize: async () => {
    await loadTokensFromStorage();
    set({ isLoggedIn: authManager.isLogined });
  },

  login: async (tokens: Tokens) => {
    await persistTokens(tokens);
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await clearPersistedTokens();
    set({ isLoggedIn: false });
  },
}));
