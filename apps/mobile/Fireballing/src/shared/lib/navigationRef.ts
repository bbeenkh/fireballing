import { createRef } from 'react';
import type { NavigationContainerRef } from '@react-navigation/native';
import type { AppTabParamList } from '@/shared/types';

/**
 * # navigationRef
 * ---
 * - 간단설명: React 외부에서 명령형 네비게이션을 위한 ref
 * - 제약사항 및 특이사항:
 *   - NavigationContainer에 ref로 전달해야 동작
 *   - 스토어, 인터셉터 등 React 트리 바깥에서 navigate() 호출 시 사용
 * ---
 * @example
 * navigationRef.current?.navigate('Login');
 */
export const navigationRef =
  createRef<NavigationContainerRef<AppTabParamList>>();
