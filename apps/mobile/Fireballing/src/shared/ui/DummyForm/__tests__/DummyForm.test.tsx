import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { DummyForm } from '../DummyForm';

describe('DummyForm', () => {
  it('이름, 이메일 입력 필드와 제출 버튼이 렌더링된다', async () => {
    const { getByTestId } = await render(<DummyForm />);

    expect(getByTestId('input-name')).toBeTruthy();
    expect(getByTestId('input-email')).toBeTruthy();
    expect(getByTestId('btn-submit')).toBeTruthy();
  });

  it('빈 상태로 제출하면 에러 메시지가 표시된다', async () => {
    const { getByTestId, getByText } = await render(<DummyForm />);

    await act(() => {
      fireEvent.press(getByTestId('btn-submit'));
    });

    expect(getByText('입력을 확인해주세요')).toBeTruthy();
  });

  it('이름과 이메일을 입력 후 제출하면 성공 메시지가 표시된다', async () => {
    const { getByTestId, getByText } = await render(<DummyForm />);

    await act(() => {
      fireEvent.changeText(getByTestId('input-name'), '홍길동');
    });
    await act(() => {
      fireEvent.changeText(getByTestId('input-email'), 'test@test.com');
    });
    await act(() => {
      fireEvent.press(getByTestId('btn-submit'));
    });

    expect(getByText('제출 완료')).toBeTruthy();
  });
});
