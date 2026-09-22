import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IProfileData, IProfileState } from '../types/profile.types';

const PROFILE_STORAGE_KEY = '@fireballing/profile';

/**
 * # useProfileStore
 * ---
 * - 간단설명: 프로필 데이터를 AsyncStorage와 동기화하는 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - 앱 시작 시 initialize()로 저장된 프로필 복원
 *   - hasProfile로 빈 상태 / 등록 상태 분기
 * ---
 * @example
 * const hasProfile = useProfileStore(s => s.hasProfile);
 * const saveProfile = useProfileStore(s => s.saveProfile);
 */
export const useProfileStore = create<IProfileState>(set => ({
  hasProfile: false,
  profileData: null,

  initialize: async () => {
    const stored = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      const data: IProfileData = JSON.parse(stored);
      set({ hasProfile: true, profileData: data });
    }
  },

  saveProfile: async (data: IProfileData) => {
    await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
    set({ hasProfile: true, profileData: data });
  },

  clearProfile: async () => {
    await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
    set({ hasProfile: false, profileData: null });
  },
}));
