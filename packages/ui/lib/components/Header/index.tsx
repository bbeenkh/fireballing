import React from 'react';

interface StyleClass {
  root?: string;
}

interface HeaderProps {
  children: React.ReactNode;
  styleClass?: StyleClass;
}

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ') || undefined;

/**
 * # Header
 * ---
 * - 간단설명: 앱 상단 헤더 컴포넌트. `<header>` 태그로 렌더링된다.
 * - 제약사항 및 특이사항:
 *   - 기본 스타일: `bg-white`, 하단 보더(`border-b border-[#261e1c]`), 좌우 패딩 20px, 상하 패딩 12px
 *   - 자식 요소를 양쪽 끝으로 배치한다 (`justify-between`)
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * ---
 * @example
 * <Header>
 *   <Text>fireballing</Text>
 *   <Icon name="bell" />
 * </Header>
 */
function Header({ children, styleClass }: HeaderProps) {
  return (
    <header
      className={cx(
        'bg-white border-b border-[#261e1c] flex items-center justify-between px-[20px] py-[12px]',
        styleClass?.root,
      )}
    >
      {children}
    </header>
  );
}

export default Header;
