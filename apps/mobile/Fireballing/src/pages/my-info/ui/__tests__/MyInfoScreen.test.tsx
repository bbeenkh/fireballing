import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { MyInfoScreen } from '../MyInfoScreen';

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

describe('MyInfoScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('스텝 인디케이터 "1 / 2"가 렌더링된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoScreen />);
    });
    const root = tree!.root;
    const texts = root.findAllByType('Text' as any);
    const stepText = texts.find(
      t => t.children && t.children.includes('1 / 2'),
    );
    expect(stepText).toBeTruthy();
  });

  it('CTA가 성별 미선택 시 비활성이다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoScreen />);
    });
    const root = tree!.root;
    const cta = root.findByProps({ testID: 'cta-next' });
    expect(cta.props.disabled).toBe(true);
  });

  it('성별 선택 후 CTA가 활성화된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoScreen />);
    });
    const root = tree!.root;
    const femaleChip = root.findByProps({ testID: 'gender-F' });
    await ReactTestRenderer.act(() => {
      femaleChip.props.onPress();
    });
    const cta = root.findByProps({ testID: 'cta-next' });
    expect(cta.props.disabled).toBe(false);
  });

  it('CTA 탭 시 MyInfoDetails로 gender를 전달하며 이동한다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoScreen />);
    });
    const root = tree!.root;

    const maleChip = root.findByProps({ testID: 'gender-M' });
    await ReactTestRenderer.act(() => {
      maleChip.props.onPress();
    });

    const cta = root.findByProps({ testID: 'cta-next' });
    await ReactTestRenderer.act(() => {
      cta.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('MyInfoDetails', { gender: 'M' });
  });

  it('MBTI 선택 시 MyInfoDetails로 mbti도 함께 전달된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoScreen />);
    });
    const root = tree!.root;

    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'gender-F' }).props.onPress();
    });
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'mbti-INFJ' }).props.onPress();
    });

    const cta = root.findByProps({ testID: 'cta-next' });
    await ReactTestRenderer.act(() => {
      cta.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('MyInfoDetails', {
      gender: 'F',
      mbti: 'INFJ',
    });
  });
});
