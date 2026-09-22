import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { MyInfoDetailsScreen } from '../MyInfoDetailsScreen';

const mockNavigate = jest.fn();
const mockRoute = { params: { gender: 'F' as const, mbti: 'INFJ' } };
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useRoute: () => mockRoute,
}));

jest.mock('@fblg/core-ui', () => ({
  StepIndicator: () => null,
}));

jest.mock('@/shared/ui/ScreenLayout', () => ({
  withLayout: (Component: React.ComponentType) => Component,
}));

const mockSetMe = jest.fn(() => Promise.resolve());
jest.mock('@/entities/simulator', () => ({
  useSimulatorStore: (selector: (s: any) => any) =>
    selector({ setMe: mockSetMe }),
}));

describe('MyInfoDetailsScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetMe.mockClear();
  });

  it('스텝 인디케이터 "2 / 2"가 렌더링된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoDetailsScreen />);
    });
    const root = tree!.root;
    const texts = root.findAllByType('Text' as any);
    const stepText = texts.find(
      t => t.children && t.children.includes('2 / 2'),
    );
    expect(stepText).toBeTruthy();
  });

  it('CTA가 필수 항목 미입력 시 비활성이다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoDetailsScreen />);
    });
    const root = tree!.root;
    const cta = root.findByProps({ testID: 'cta-save' });
    expect(cta.props.disabled).toBe(true);
  });

  it('모든 필수 항목 입력 시 CTA가 활성화된다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoDetailsScreen />);
    });
    const root = tree!.root;

    // 이름 입력
    const nameInput = root.findByProps({ testID: 'input-name' });
    await ReactTestRenderer.act(() => {
      nameInput.props.onChangeText('테스트');
    });

    // 년도 입력
    const yearInput = root.findByProps({ testID: 'input-birthYear' });
    await ReactTestRenderer.act(() => {
      yearInput.props.onChangeText('1995');
    });

    // 날짜 입력
    const dateInput = root.findByProps({ testID: 'input-birthDate' });
    await ReactTestRenderer.act(() => {
      dateInput.props.onChangeText('03-15');
    });

    // 연애 스타일 선택
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'style-lead' }).props.onPress();
    });

    // 직업 선택
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'job-student' }).props.onPress();
    });

    const cta = root.findByProps({ testID: 'cta-save' });
    expect(cta.props.disabled).toBe(false);
  });

  it('CTA 탭 시 setMe 호출 후 PartnerInfo로 이동한다', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<MyInfoDetailsScreen />);
    });
    const root = tree!.root;

    // 모든 필수 항목 입력
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'input-name' }).props.onChangeText('테스트');
    });
    await ReactTestRenderer.act(() => {
      root
        .findByProps({ testID: 'input-birthYear' })
        .props.onChangeText('1995');
    });
    await ReactTestRenderer.act(() => {
      root
        .findByProps({ testID: 'input-birthDate' })
        .props.onChangeText('03-15');
    });
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'style-lead' }).props.onPress();
    });
    await ReactTestRenderer.act(() => {
      root.findByProps({ testID: 'job-office' }).props.onPress();
    });

    // CTA 탭
    const cta = root.findByProps({ testID: 'cta-save' });
    await ReactTestRenderer.act(async () => {
      await cta.props.onPress();
    });

    expect(mockSetMe).toHaveBeenCalledWith({
      gender: 'F',
      mbti: 'INFJ',
      name: '테스트',
      birthYear: '1995',
      birthDate: '03-15',
      style: 'lead',
      job: 'office',
    });
    expect(mockNavigate).toHaveBeenCalledWith('PartnerInfo');
  });
});
