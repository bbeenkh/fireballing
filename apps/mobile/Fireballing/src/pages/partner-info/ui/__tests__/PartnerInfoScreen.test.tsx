import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { PartnerInfoScreen } from '../PartnerInfoScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@fblg/core-ui', () => ({
  StepIndicator: () => null,
}));

jest.mock('@/shared/ui/ScreenLayout', () => ({
  withLayout: (Component: React.ComponentType) => Component,
}));

const mockSetPartner = jest.fn();
const mockStore = {
  me: { gender: 'F' as const },
  setPartner: mockSetPartner,
  partner: null,
};
jest.mock('@/entities/simulator', () => ({
  useSimulatorStore: (selector: (s: any) => any) => selector(mockStore),
}));

describe('PartnerInfoScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetPartner.mockClear();
  });

  it('스텝 인디케이터 "2 / 2"가 렌더링된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<PartnerInfoScreen />);
    });
    const root = tree!.root;
    const texts = root.findAllByType('Text' as any);
    const stepText = texts.find(
      t => t.children && t.children.includes('2 / 2'),
    );
    expect(stepText).toBeTruthy();
  });

  it('기본 성별이 내 성별의 반대(M)로 설정된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<PartnerInfoScreen />);
    });
    const root = tree!.root;
    // 남성 칩이 선택 상태 (bg #1b1b1b)
    const maleChip = root.findByProps({ testID: 'gender-M' });
    expect(maleChip.props.style.backgroundColor).toBe('#1b1b1b');
  });

  it('CTA가 전부 미선택 시 비활성이다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<PartnerInfoScreen />);
    });
    const root = tree!.root;
    const cta = root.findByProps({ testID: 'cta-next' });
    // 성별만 기본값, MBTI·나이·직업 미선택 → 비활성
    expect(cta.props.disabled).toBe(true);
  });

  it('4개 항목 전부 선택 시 CTA가 활성화된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<PartnerInfoScreen />);
    });
    const root = tree!.root;

    // MBTI 선택
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'mbti-ENTP' }).props.onPress();
    });
    // 나이 선택
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'age-same' }).props.onPress();
    });
    // 직업 선택
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'job-office' }).props.onPress();
    });

    const cta = root.findByProps({ testID: 'cta-next' });
    expect(cta.props.disabled).toBe(false);
  });

  it('CTA 탭 시 setPartner 호출 후 Simulator로 이동한다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<PartnerInfoScreen />);
    });
    const root = tree!.root;

    // 전체 선택
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'mbti-ENTP' }).props.onPress();
    });
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'age-older' }).props.onPress();
    });
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'job-professional' }).props.onPress();
    });

    // CTA 탭
    const cta = root.findByProps({ testID: 'cta-next' });
    await ReactTestRenderer.act(() => {
      cta.props.onPress();
    });

    expect(mockSetPartner).toHaveBeenCalledWith({
      gender: 'M',
      mbti: 'ENTP',
      ageRel: 'older',
      job: 'professional',
    });
    expect(mockNavigate).toHaveBeenCalledWith('Simulator');
  });
});
