import { render, screen, fireEvent } from '@testing-library/react';
import Chip from '.';

describe('Chip', () => {
  describe('기본 동작', () => {
    it('children 텍스트를 렌더링한다', () => {
      render(<Chip>KRW</Chip>);
      expect(screen.getByRole('button')).toHaveTextContent('KRW');
    });

    it('button 태그로 렌더링된다', () => {
      render(<Chip>KRW</Chip>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('onClick 핸들러가 호출된다', () => {
      const onClick = vi.fn();
      render(<Chip onClick={onClick}>KRW</Chip>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('selected 상태', () => {
    it('selected=true 시 data-selected 속성이 적용된다', () => {
      render(<Chip selected>KRW</Chip>);
      expect(screen.getByRole('button')).toHaveAttribute('data-selected', 'true');
    });

    it('selected=false 시 data-selected가 없다', () => {
      render(<Chip>USD</Chip>);
      expect(screen.getByRole('button')).not.toHaveAttribute('data-selected');
    });
  });

  describe('size', () => {
    it('기본 size는 md이다', () => {
      render(<Chip>KRW</Chip>);
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'md');
    });

    it('size="sm"이 적용된다', () => {
      render(<Chip size="sm">KRW</Chip>);
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'sm');
    });
  });

  describe('disabled', () => {
    it('disabled 상태가 적용된다', () => {
      render(<Chip disabled>KRW</Chip>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('className 병합', () => {
    it('추가 className이 적용된다', () => {
      render(<Chip className="ml-2">KRW</Chip>);
      expect(screen.getByRole('button')).toHaveClass('ml-2');
    });
  });
});

describe('Chip.Group', () => {
  it('children을 렌더링한다', () => {
    render(
      <Chip.Group>
        <Chip>KRW</Chip>
        <Chip>USD</Chip>
      </Chip.Group>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('추가 className이 적용된다', () => {
    render(
      <Chip.Group data-testid="group" className="gap-4">
        <Chip>A</Chip>
      </Chip.Group>,
    );
    expect(screen.getByTestId('group')).toHaveClass('gap-4');
  });
});
