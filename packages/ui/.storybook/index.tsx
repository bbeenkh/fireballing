import { getStorybookUI } from '@storybook/react-native';
import './storybook.requires';

/**
 * # StorybookUIRoot
 * ---
 * - 간단설명: React Native Storybook 진입점 컴포넌트
 * - 제약사항: 호스트 앱(App.tsx 등)에서 이 컴포넌트를 렌더링해야 스토리북 실행 가능
 * ---
 * @example
 * import StorybookUIRoot from '../packages/ui/.storybook';
 * export default StorybookUIRoot;
 */
const StorybookUIRoot = getStorybookUI({});
export default StorybookUIRoot;
