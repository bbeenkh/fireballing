import { render, screen } from '@testing-library/react';
import Tag from '.';

describe('Tag', () => {
  describe('기본 동작', () => {
    it('children 텍스트를 렌더링한다', () => {
      render(<Tag>+1.8%</Tag>);
      expect(screen.getByText('+1.8%')).toBeInTheDocument();
    });

    it('span 태그로 렌더링된다', () => {
      render(<Tag>태그</Tag>);
      expect(screen.getByText('태그').tagName).toBe('SPAN');
    });
  });

  describe('intent 자동감지', () => {
    it('"+"로 시작하는 텍스트는 profit intent가 적용된다', () => {
      render(<Tag>+12.4%</Tag>);
      expect(screen.getByText('+12.4%')).toHaveAttribute('data-intent', 'profit');
    });

    it('"-"로 시작하는 텍스트는 loss intent가 적용된다', () => {
      render(<Tag>-1.32%</Tag>);
      expect(screen.getByText('-1.32%')).toHaveAttribute('data-intent', 'loss');
    });

    it('부호 없는 텍스트는 neutral intent가 적용된다', () => {
      render(<Tag>0.00%</Tag>);
      expect(screen.getByText('0.00%')).toHaveAttribute('data-intent', 'neutral');
    });

    it('문자열이 아닌 children은 neutral intent가 적용된다', () => {
      render(<Tag><span>복합</span></Tag>);
      expect(screen.getByText('복합').closest('[data-intent]')).toHaveAttribute('data-intent', 'neutral');
    });
  });

  describe('intent prop 명시', () => {
    it('명시적 intent가 자동감지를 오버라이드한다', () => {
      render(<Tag intent="loss">+1.8%</Tag>);
      expect(screen.getByText('+1.8%')).toHaveAttribute('data-intent', 'loss');
    });
  });

  describe('size', () => {
    it('기본 size는 md이다', () => {
      render(<Tag>+1%</Tag>);
      expect(screen.getByText('+1%')).toHaveAttribute('data-size', 'md');
    });

    it('size="sm"이 적용된다', () => {
      render(<Tag size="sm">+1%</Tag>);
      expect(screen.getByText('+1%')).toHaveAttribute('data-size', 'sm');
    });
  });

  describe('className 병합', () => {
    it('추가 className이 적용된다', () => {
      render(<Tag className="ml-2">+1%</Tag>);
      expect(screen.getByText('+1%')).toHaveClass('ml-2');
    });
  });
});
