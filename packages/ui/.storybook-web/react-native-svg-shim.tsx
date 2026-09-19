/**
 * Storybook web용 react-native-svg shim
 * 네이티브 SVG 요소를 그대로 DOM에 렌더링
 */
import React from 'react';

type SvgProps = React.SVGAttributes<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  fill?: string;
  children?: React.ReactNode;
};

type PathProps = React.SVGAttributes<SVGPathElement> & {
  d?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square';
};

export const Svg = ({ children, ...props }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    {children}
  </svg>
);

export const Path = (props: PathProps) => <path {...props} />;

export default Svg;
export type { SvgProps, PathProps };
