import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Me, ISimulatorState } from '../types/simulator.types';

const ME_STORAGE_KEY = '@fireballing/simulator-me';

/**
 * # useSimulatorStore
 * ---
 * - 간단설명: 시뮬레이터 세션 설정 상태 관리 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - me: AsyncStorage에 영구 저장 (앱 삭제 전까지 유지)
 *   - partner: 세션 메모리만 사용, 저장 안 함
 * ---
 * @example
 * const me = useSimulatorStore(s => s.me);
 * const setMe = useSimulatorStore(s => s.setMe);
 */
export const useSimulatorStore = create<ISimulatorState>(set => ({
  me: null,
  partner: null,

  setMe: async (me: Me) => {
    await AsyncStorage.setItem(ME_STORAGE_KEY, JSON.stringify(me));
    set({ me });
  },

  loadMe: async () => {
    const stored = await AsyncStorage.getItem(ME_STORAGE_KEY);
    if (stored) {
      set({ me: JSON.parse(stored) as Me });
    }
  },

  setPartner: partner => {
    set({ partner });
  },

  clearPartner: () => {
    set({ partner: null });
  },
}));
