import React from 'react';

interface StyleClass {
  root?: string;
}

interface FooterProps {
  children: React.ReactNode;
  styleClass?: StyleClass;
}

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ') || undefined;

/**
 * # Footer
 * ---
 * - 간단설명: 앱 하단 네비게이션 푸터 컴포넌트. `<footer>` 태그로 렌더링된다.
 * - 제약사항 및 특이사항:
 *   - 기본 스타일: `bg-white`, 상단 보더(`border-t border-[#f0f0f0]`), 상단 라운드(`rounded-tl-[16px] rounded-tr-[16px]`)
 *   - 자식 요소를 가로로 균등 배치한다
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * ---
 * @example
 * <Footer>
 *   <Text>홈</Text>
 *   <Text>포트폴리오</Text>
 *   <Text>시뮬레이터</Text>
 *   <Text>마이페이지</Text>
 * </Footer>
 */
function Footer({ children, styleClass }: FooterProps) {
  return (
    <footer
      className={cx(
        'bg-white border-t border-[#e7ded6] flex items-center gap-3 px-gutter py-3',
        styleClass?.root,
      )}
    >
      {children}
    </footer>
  );
}

export default Footer;
