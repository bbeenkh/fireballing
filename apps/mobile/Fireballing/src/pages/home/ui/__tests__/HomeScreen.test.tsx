import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { HomeScreen } from '../HomeScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@fblg/core-ui', () => ({
  IconMore: () => null,
  IconChevronDown: () => null,
}));

jest.mock('@/shared/ui/ScreenLayout', () => ({
  withLayout: (Component: React.ComponentType) => Component,
}));

const mockUseProfileStore = jest.fn();
jest.mock('@/entities/profile', () => ({
  useProfileStore: (selector: (s: any) => any) => mockUseProfileStore(selector),
}));

const MOCK_PROFILE = {
  name: '테스트',
  mbti: 'INFJ',
  gender: '여성',
  age: 25,
  loveStyle: '적극적',
};

describe('HomeScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseProfileStore.mockClear();
  });

  describe('프로필 미등록 상태', () => {
    beforeEach(() => {
      mockUseProfileStore.mockImplementation((selector: (s: any) => any) =>
        selector({ hasProfile: false, profileData: null }),
      );
    });

    it('앱이름 텍스트가 렌더링된다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const texts = root.findAllByType('Text' as any);
      const appNameText = texts.find(
        t => t.children && t.children.includes('앱이름'),
      );
      expect(appNameText).toBeTruthy();
    });

    it('"내 정보 등록하기" 버튼이 표시된다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const texts = root.findAllByType('Text' as any);
      const ctaText = texts.find(
        t => t.children && t.children.includes('내 정보 등록하기'),
      );
      expect(ctaText).toBeTruthy();
    });

    it('CTA 버튼 터치 시 EditProfile로 이동한다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const ctaButton = root.findByProps({ testID: 'cta-register-profile' });
      await ReactTestRenderer.act(() => {
        ctaButton.props.onPress();
      });
      expect(mockNavigate).toHaveBeenCalledWith('EditProfile');
    });
  });

  describe('프로필 등록 완료 상태', () => {
    beforeEach(() => {
      mockUseProfileStore.mockImplementation((selector: (s: any) => any) =>
        selector({ hasProfile: true, profileData: MOCK_PROFILE }),
      );
    });

    it('프로필 요약 카드가 렌더링된다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const card = root.findByProps({ testID: 'profile-summary-card' });
      expect(card).toBeTruthy();
    });

    it('MBTI, 성별, 나이 칩이 표시된다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const texts = root.findAllByType('Text' as any);
      const textContents = texts.map(
        t => t.children?.join?.('') ?? t.children?.[0],
      );
      expect(textContents).toContain('INFJ');
      expect(textContents).toContain('여성');
      expect(textContents).toContain('25세');
    });

    it('궁합 유형이 표시된다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const texts = root.findAllByType('Text' as any);
      const textContents = texts.map(
        t => t.children?.join?.('') ?? t.children?.[0],
      );
      expect(textContents).toContain('INFJ와 잘 맞는 유형');
      expect(textContents).toContain('ENFP ›');
      expect(textContents).toContain('ENTP ›');
    });

    it('수정 버튼 터치 시 EditProfile로 이동한다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const editButton = root.findByProps({ testID: 'btn-edit-profile' });
      await ReactTestRenderer.act(() => {
        editButton.props.onPress();
      });
      expect(mockNavigate).toHaveBeenCalledWith('EditProfile');
    });

    it('빈 상태 카드가 표시되지 않는다', async () => {
      let tree: ReactTestRenderer.ReactTestRenderer;
      await ReactTestRenderer.act(() => {
        tree = ReactTestRenderer.create(<HomeScreen />);
      });
      const root = tree!.root;
      const texts = root.findAllByType('Text' as any);
      const ctaText = texts.find(
        t => t.children && t.children.includes('내 정보 등록하기'),
      );
      expect(ctaText).toBeUndefined();
    });
  });
});
