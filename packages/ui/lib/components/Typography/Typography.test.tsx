import { render, screen } from '@testing-library/react';
import Typography from '.';

describe('Typography', () => {
  describe('기본 동작', () => {
    it('children 텍스트를 렌더링한다', () => {
      render(<Typography>텍스트</Typography>);
      expect(screen.getByText('텍스트')).toBeInTheDocument();
    });

    it('variant 미지정 시 기본값 body로 p 태그를 렌더링한다', () => {
      render(<Typography>본문</Typography>);
      expect(screen.getByText('본문').tagName).toBe('P');
    });
  });

  describe('variant별 태그 매핑', () => {
    it('h1 variant는 h1 태그를 렌더링한다', () => {
      render(<Typography variant="h1">제목1</Typography>);
      expect(screen.getByText('제목1').tagName).toBe('H1');
    });

    it('h2 variant는 h2 태그를 렌더링한다', () => {
      render(<Typography variant="h2">제목2</Typography>);
      expect(screen.getByText('제목2').tagName).toBe('H2');
    });

    it('h3 variant는 h3 태그를 렌더링한다', () => {
      render(<Typography variant="h3">제목3</Typography>);
      expect(screen.getByText('제목3').tagName).toBe('H3');
    });

    it('body variant는 p 태그를 렌더링한다', () => {
      render(<Typography variant="body">본문</Typography>);
      expect(screen.getByText('본문').tagName).toBe('P');
    });

    it('caption variant는 span 태그를 렌더링한다', () => {
      render(<Typography variant="caption">캡션</Typography>);
      expect(screen.getByText('캡션').tagName).toBe('SPAN');
    });

    it('mono variant는 span 태그를 렌더링한다', () => {
      render(<Typography variant="mono">$142,850</Typography>);
      expect(screen.getByText('$142,850').tagName).toBe('SPAN');
    });

    it('label-md variant는 span 태그를 렌더링한다', () => {
      render(<Typography variant="label-md">라벨</Typography>);
      expect(screen.getByText('라벨').tagName).toBe('SPAN');
    });

    it('label-sm variant는 span 태그를 렌더링한다', () => {
      render(<Typography variant="label-sm">작은 라벨</Typography>);
      expect(screen.getByText('작은 라벨').tagName).toBe('SPAN');
    });
  });

  describe('as prop (태그 오버라이드)', () => {
    it('as="div"로 h1 variant의 태그를 오버라이드할 수 있다', () => {
      render(
        <Typography variant="h1" as="div">
          제목
        </Typography>,
      );
      expect(screen.getByText('제목').tagName).toBe('DIV');
    });

    it('as="strong"으로 body variant의 태그를 오버라이드할 수 있다', () => {
      render(
        <Typography variant="body" as="strong">
          강조
        </Typography>,
      );
      expect(screen.getByText('강조').tagName).toBe('STRONG');
    });
  });

  describe('className 병합', () => {
    it('추가 className이 적용된다', () => {
      render(<Typography className="mt-4">텍스트</Typography>);
      expect(screen.getByText('텍스트')).toHaveClass('mt-4');
    });
  });
});
