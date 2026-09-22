import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSimulatorStore } from '../simulatorStore';
import type { Me, Partner } from '../../types/simulator.types';

beforeEach(() => {
  useSimulatorStore.setState({ me: null, partner: null });
  (AsyncStorage.getItem as jest.Mock).mockReset();
  (AsyncStorage.setItem as jest.Mock).mockReset();
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
});

const ME: Me = {
  gender: 'F',
  mbti: 'INFJ',
  name: '테스트',
  birthYear: '1995',
  birthDate: '03-15',
  style: 'lead',
  job: 'student',
};
const PARTNER: Partner = {
  gender: 'M',
  mbti: 'ENTP',
  ageRel: 'same',
  job: 'office',
};

describe('simulatorStore', () => {
  describe('setMe', () => {
    it('AsyncStorage에 저장하고 상태를 업데이트한다', async () => {
      await useSimulatorStore.getState().setMe(ME);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@fireballing/simulator-me',
        JSON.stringify(ME),
      );
      expect(useSimulatorStore.getState().me).toEqual(ME);
    });
  });

  describe('loadMe', () => {
    it('AsyncStorage에서 내 정보를 복원한다', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(ME),
      );

      await useSimulatorStore.getState().loadMe();

      expect(useSimulatorStore.getState().me).toEqual(ME);
    });

    it('저장된 데이터가 없으면 null을 유지한다', async () => {
      await useSimulatorStore.getState().loadMe();

      expect(useSimulatorStore.getState().me).toBeNull();
    });
  });

  describe('setPartner', () => {
    it('상태만 업데이트하고 AsyncStorage는 사용하지 않는다', () => {
      useSimulatorStore.getState().setPartner(PARTNER);

      expect(useSimulatorStore.getState().partner).toEqual(PARTNER);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('clearPartner', () => {
    it('상대 정보를 null로 초기화한다', () => {
      useSimulatorStore.getState().setPartner(PARTNER);
      useSimulatorStore.getState().clearPartner();

      expect(useSimulatorStore.getState().partner).toBeNull();
    });
  });
});
