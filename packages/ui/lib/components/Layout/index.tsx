import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface StyleClass {
  root?: string;
}

interface Props {
  children: React.ReactNode;
  styleClass?: StyleClass;
}

interface LayoutProps extends Props {
  maxWidth?: string;
  minWidth?: string;
}

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ') || undefined;

/**
 * # Layout
 * ---
 * - 간단설명: 페이지 루트 레이아웃 컴포넌트. `<main>` 태그로 렌더링되며 항상 화면을 꽉 채운다.
 * - 제약사항 및 특이사항:
 *   - `Layout.Header`, `Layout.Body`, `Layout.Footer` 서브컴포넌트와 함께 사용한다.
 *   - Header, Footer는 별도 컴포넌트를 compound로 연결한 것이다.
 *   - max/min width는 props로 제어한다.
 *   - 기본 배경색: `bg-white`
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * @param maxWidth - 최대 너비 (예: "1200px")
 * @param minWidth - 최소 너비 (예: "320px")
 * ---
 * @example
 * <Layout maxWidth="390px">
 *   <Layout.Header>헤더</Layout.Header>
 *   <Layout.Body>본문</Layout.Body>
 *   <Layout.Footer>푸터</Layout.Footer>
 * </Layout>
 */
function Layout({ children, styleClass, maxWidth, minWidth }: LayoutProps) {
  return (
    <main
      className={cx(
        'flex flex-col min-h-screen bg-white relative',
        styleClass?.root,
      )}
      style={{ maxWidth, minWidth }}
    >
      {children}
    </main>
  );
}

/**
 * # Layout.Body
 * ---
 * - 간단설명: 본문 영역 서브컴포넌트. 남은 공간을 채운다 (`flex-1`).
 * - 제약사항 및 특이사항:
 *   - 기본 스타일: `flex-1`, 세로 방향 배치(`flex flex-col`), 좌우 패딩 20px, 요소 간 간격 32px
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * ---
 * @example
 * <Layout.Body>본문 내용</Layout.Body>
 */
Layout.Body = ({ children, styleClass }: Props) => (
  <div
    className={cx(
      'flex-1 flex flex-col gap-xl px-gutter pt-lg pb-xl',
      styleClass?.root,
    )}
  >
    {children}
  </div>
);

Layout.Header = Header;
Layout.Footer = Footer;

export default Layout;
