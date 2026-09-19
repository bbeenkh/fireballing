import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  describe('기본 동작', () => {
    it('children 텍스트를 렌더링한다', () => {
      render(<Button>확인</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('확인');
    });

    it('type 속성이 기본값 "button"으로 렌더링된다', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('type 속성을 "submit"으로 지정할 수 있다', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('type 속성을 "reset"으로 지정할 수 있다', () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });

    it('onClick 핸들러가 클릭 시 호출된다', () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태가 적용된다', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('disabled 상태에서 onClick이 호출되지 않는다', () => {
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('styleClass prop', () => {
    it('styleClass.root이 버튼 요소에 적용된다', () => {
      render(
        <Button styleClass={{ root: 'bg-blue-500 text-white' }}>Button</Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-500');
      expect(button).toHaveClass('text-white');
    });

    it('styleClass prop 없이도 렌더링된다', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('variant 미지정 시 variant 관련 스타일 클래스가 없다', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('bg-primary');
      expect(button).not.toHaveClass('rounded-xl');
    });
  });

  describe('variant prop', () => {
    it('variant 미지정 시 variant 관련 스타일이 적용되지 않는다 (후방 호환)', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('bg-primary');
      expect(button).not.toHaveClass('bg-surface');
    });

    it('variant="primary" 시 primary 스타일이 적용된다', () => {
      render(<Button variant="primary">확인</Button>);
      expect(screen.getByRole('button').className).toContain('bg-');
    });

    it('variant="secondary" 시 border 스타일이 적용된다', () => {
      render(<Button variant="secondary">취소</Button>);
      expect(screen.getByRole('button').className).toContain('border');
    });

    it('variant="ghost" 시 투명 배경 스타일이 적용된다', () => {
      render(<Button variant="ghost">메뉴</Button>);
      expect(screen.getByRole('button').className).toContain('bg-transparent');
    });

    it('variant="link" 시 link 스타일이 적용된다', () => {
      render(<Button variant="link">전체보기</Button>);
      expect(screen.getByRole('button').className).toContain('bg-transparent');
    });

    it('variant + styleClass 병합: styleClass가 우선한다', () => {
      render(
        <Button variant="primary" styleClass={{ root: 'bg-blue-500' }}>
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-500');
    });
  });

  describe('size prop', () => {
    it('size 미지정 시 기본값 md가 적용된다', () => {
      render(<Button variant="primary">Button</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('px-4');
    });

    it('size="sm" 스타일이 적용된다', () => {
      render(
        <Button variant="primary" size="sm">
          Small
        </Button>,
      );
      expect(screen.getByRole('button').className).toContain('px-3');
    });

    it('size="lg" 스타일이 적용된다', () => {
      render(
        <Button variant="primary" size="lg">
          Large
        </Button>,
      );
      expect(screen.getByRole('button').className).toContain('px-6');
    });
  });

  describe('asChild prop (Slot 패턴)', () => {
    it('asChild=true 시 자식 요소로 렌더링된다', () => {
      render(
        <Button asChild styleClass={{ root: 'some-class' }}>
          <a href="/test">링크 버튼</a>
        </Button>,
      );
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('링크 버튼');
      expect(link).toHaveClass('some-class');
    });

    it('asChild=true 시 button 요소가 렌더링되지 않는다', () => {
      render(
        <Button asChild>
          <a href="/test">링크</a>
        </Button>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('asChild=false(기본값) 시 button 요소로 렌더링된다', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
