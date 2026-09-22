import React from 'react';
import { Svg, Path, SvgProps } from 'react-native-svg';

/**
 * 아이콘 공통 Props
 * - size = 아이콘 크기 (기본 24)
 * - color = 아이콘 색상 (기본 currentColor)
 */
interface IconProps extends Omit<SvgProps, 'width' | 'height'> {
  /** 아이콘 크기 (px) */
  size?: number;
  /** 아이콘 색상 */
  color?: string;
}

/**
 * # IconSearch
 * ---
 * - 간단설명: 검색 돋보기 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconSearch size={24} color="#FF5A26" />
 */
export function IconSearch({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={color}
        strokeWidth={2.667}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconHome
 * ---
 * - 간단설명: 홈 아이콘 (채워진 스타일)
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconHome size={24} color="#FF5A26" />
 */
export function IconHome({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 18" fill="none" {...props}>
      <Path d="M0 18V6L8 0L16 6V18H10V11H6V18H0Z" fill={color} />
    </Svg>
  );
}

/**
 * # IconChevronDown
 * ---
 * - 간단설명: 아래 방향 화살표 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconChevronDown size={24} color="#9E928E" />
 */
export function IconChevronDown({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconChevronRight
 * ---
 * - 간단설명: 오른쪽 방향 화살표 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconChevronRight size={24} color="#9E928E" />
 */
export function IconChevronRight({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconChevronLeft
 * ---
 * - 간단설명: 왼쪽 방향 화살표 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconChevronLeft size={24} color="#F4EFEF" />
 */
export function IconChevronLeft({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconBell
 * ---
 * - 간단설명: 알림 벨 아이콘 (채워진 스타일)
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconBell size={24} color="#FF5A26" />
 */
export function IconBell({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 24" fill="none" {...props}>
      <Path
        d="M0 20.4V18H2.4V9.6C2.4 7.94 2.9 6.465 3.9 5.175C4.9 3.885 6.2 3.04 7.8 2.64V1.8C7.8 1.3 7.975 0.875 8.325 0.525C8.675 0.175 9.1 0 9.6 0C10.1 0 10.525 0.175 10.875 0.525C11.225 0.875 11.4 1.3 11.4 1.8V2.64C13 3.04 14.3 3.885 15.3 5.175C16.3 6.465 16.8 7.94 16.8 9.6V18H19.2V20.4H0ZM9.6 24C8.94 24 8.375 23.765 7.905 23.295C7.435 22.825 7.2 22.26 7.2 21.6H12C12 22.26 11.765 22.825 11.295 23.295C10.825 23.765 10.26 24 9.6 24ZM4.8 18H14.4V9.6C14.4 8.28 13.93 7.15 12.99 6.21C12.05 5.27 10.92 4.8 9.6 4.8C8.28 4.8 7.15 5.27 6.21 6.21C5.27 7.15 4.8 8.28 4.8 9.6V18Z"
        fill={color}
      />
    </Svg>
  );
}

/**
 * # IconBellAlt
 * ---
 * - 간단설명: 알림 벨 아이콘 (윤곽선 스타일)
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconBellAlt size={24} color="#9E928E" />
 */
export function IconBellAlt({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10.267 21.001C10.442 21.305 10.695 21.557 10.999 21.733C11.303 21.909 11.648 22.001 11.999 22.001C12.35 22.001 12.695 21.909 12.999 21.733C13.303 21.557 13.555 21.305 13.731 21.001M3.261 15.326C3.131 15.47 3.044 15.648 3.013 15.839C2.982 16.03 3.007 16.227 3.085 16.404C3.163 16.581 3.291 16.732 3.454 16.838C3.616 16.944 3.805 17 3.999 17H20C20.193 17 20.383 16.944 20.546 16.839C20.708 16.733 20.836 16.582 20.915 16.405C20.993 16.228 21.018 16.032 20.987 15.84C20.956 15.649 20.87 15.471 20.74 15.327C19.41 13.956 18 12.499 18 8C18 6.408 17.367 4.882 16.242 3.757C15.117 2.631 13.591 1.999 12 1.999C10.408 1.999 8.882 2.631 7.757 3.757C6.631 4.882 5.999 6.408 5.999 8C5.999 12.499 4.588 13.956 3.261 15.326Z"
        stroke={color}
        strokeWidth={2.667}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconPlus
 * ---
 * - 간단설명: 더하기(+) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconPlus size={24} color="#0D0B0A" />
 */
export function IconPlus({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5 12H19M12 5V19"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconInfo
 * ---
 * - 간단설명: 정보(i) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconInfo size={24} color="#FF5A26" />
 */
export function IconInfo({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 16V12M12 8H12.01M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconClose
 * ---
 * - 간단설명: 닫기(X) 원형 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconClose size={24} color="#9E928E" />
 */
export function IconClose({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14.077 9.923L9.923 14.077M9.923 9.923L14.077 14.077M18.924 12C18.924 15.824 15.824 18.924 12 18.924C8.176 18.924 5.076 15.824 5.076 12C5.076 8.176 8.176 5.076 12 5.076C15.824 5.076 18.924 8.176 18.924 12Z"
        stroke={color}
        strokeWidth={1.846}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconSimulator
 * ---
 * - 간단설명: 시뮬레이터(차트) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconSimulator size={24} color="#9E928E" />
 */
export function IconSimulator({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 13" fill="none" {...props}>
      <Path
        d="M1.5 13L0 11.5L7.5 4L11.5 8L18.6 0L20 1.4L11.5 11L7.5 7L1.5 13Z"
        fill={color}
      />
    </Svg>
  );
}

/**
 * # IconMore
 * ---
 * - 간단설명: 더보기(···) 점 3개 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconMore size={24} color="#9E928E" />
 */
export function IconMore({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 4" fill="none" {...props}>
      <Path
        d="M2 4C1.45 4 .979 3.804.588 3.413A1.926 1.926 0 010 2c0-.55.196-1.02.588-1.412A1.926 1.926 0 012 0c.55 0 1.02.196 1.413.588C3.804.979 4 1.45 4 2c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 012 4zm6 0c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 016 2c0-.55.196-1.02.587-1.412A1.926 1.926 0 018 0c.55 0 1.02.196 1.413.588C9.804.979 10 1.45 10 2c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 018 4zm6 0c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0112 2c0-.55.196-1.02.588-1.412A1.926 1.926 0 0114 0c.55 0 1.02.196 1.413.588C15.804.979 16 1.45 16 2c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0114 4z"
        fill={color}
      />
    </Svg>
  );
}

/**
 * # IconStar
 * ---
 * - 간단설명: 별(즐겨찾기) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconStar size={24} color="#9E928E" />
 */
export function IconStar({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.722 2.079a.504.504 0 01.557 0 .504.504 0 01.197.215l2.31 4.679a3.499 3.499 0 002.59 1.91l5.166.756a.504.504 0 01.28.858l-3.736 3.634a3.499 3.499 0 00-1.007 3.098l.882 5.14a.504.504 0 01-.731.531l-4.618-2.428a3.499 3.499 0 00-3.224 0L5.77 22.9a.504.504 0 01-.731-.531l.882-5.14a3.499 3.499 0 00-1.007-3.098L1.178 10.5a.504.504 0 01.28-.858l5.162-.756a3.499 3.499 0 002.597-1.913l2.31-4.679a.504.504 0 01.195-.215z"
        stroke={color}
        strokeWidth={2.667}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconEdit
 * ---
 * - 간단설명: 편집(연필) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconEdit size={24} color="#F4EFEF" />
 */
export function IconEdit({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.375 2.625a2.121 2.121 0 013 3l-9.013 9.014a2.5 2.5 0 01-.853.505l-2.873.84a.5.5 0 01-.62-.62l.84-2.873a2.5 2.5 0 01.506-.852l9.013-9.014z"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconPortfolio
 * ---
 * - 간단설명: 포트폴리오(지갑) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconPortfolio size={24} color="#9E928E" />
 */
export function IconPortfolio({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 18" fill="none" {...props}>
      <Path
        d="M2 16V2s0 .371 0 1.113S2 4.817 2 6v6c0 1.183 0 2.146 0 2.888S2 16 2 16zm0 2c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 010 16V2C0 1.45.196.979.588.588A1.926 1.926 0 012 0h14c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v2.5h-2V2H2v14h14v-2.5h2V16c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0116 18H2zm8-4c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 018 12V6c0-.55.196-1.02.588-1.413A1.926 1.926 0 0110 4h7c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v6c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0117 14h-7zm7-2V6h-7v6h7zm-4-1.5c.417 0 .77-.146 1.063-.438.291-.291.437-.645.437-1.062s-.146-.77-.438-1.063A1.446 1.446 0 0013 7.5c-.417 0-.77.146-1.063.438A1.446 1.446 0 0011.5 9c0 .417.146.77.438 1.063.291.291.645.437 1.062.437z"
        fill={color}
      />
    </Svg>
  );
}

/**
 * # IconFlame
 * ---
 * - 간단설명: 불꽃(fireballing 로고) 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconFlame size={25} color="#FF5A26" />
 */
export function IconFlame({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 28" fill="none" {...props}>
      <Path
        d="M15.108 10.338C12.582 8.232 10.898 5.496 10.055 2.127 7.95 3.811 6.897 5.496 6.897 7.18c0 2.526 1.895 3.79 1.895 6.316a2.84 2.84 0 01-.925 2.233 3.158 3.158 0 01-4.466 0 3.158 3.158 0 01-.925-2.233c-.82 1.093-1.263 2.423-1.263 3.79 0 2.345.932 4.594 2.59 6.252a8.844 8.844 0 006.252 2.59 8.844 8.844 0 006.253-2.59 8.844 8.844 0 002.59-6.253c0-2.526-1.264-4.842-3.79-6.947z"
        stroke={color}
        strokeWidth={2.425}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * # IconUser
 * ---
 * - 간단설명: 사용자 프로필 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconUser size={24} color="#363636" />
 */
export function IconUser({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * # IconNote
 * ---
 * - 간단설명: 노트/문서 아이콘
 * ---
 * @param size - 아이콘 크기 (기본 24)
 * @param color - 아이콘 색상 (기본 currentColor)
 * ---
 * @example
 * <IconNote size={24} color="#363636" />
 */
export function IconNote({
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
