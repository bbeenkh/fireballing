import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import codePush from '@revopush/react-native-code-push';
import Config from 'react-native-config';
import { TabNavigator } from './src/app/navigation';
import { QueryProvider } from './src/app/providers/QueryProvider';
import { loadTokensFromStorage } from './src/entities/auth';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://03d51a9fe11f2b4ad5be9a94b6a2e511@o4507820076040192.ingest.us.sentry.io/4512116550991872',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

/**
 * # App
 * ---
 * - 간단설명: 앱 루트 컴포넌트 (SafeArea + Navigation + QueryProvider 설정)
 */
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    loadTokensFromStorage();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

/**
 * # codePushOptions
 * ---
 * - 간단설명: Revopush OTA 업데이트 옵션
 * - 제약사항 및 특이사항:
 *   - ON_APP_RESUME: 앱 포그라운드 복귀 시 업데이트 확인
 *   - IMMEDIATE: 사용자 확인 후 즉시 업데이트 적용
 *   - updateDialog: 업데이트 발견 시 네이티브 Alert 팝업 표시
 */
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: '업데이트 안내',
    optionalUpdateMessage: '새로운 버전이 있습니다. 업데이트하시겠습니까?',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '나중에',
    mandatoryUpdateMessage: '필수 업데이트가 있습니다. 앱을 업데이트합니다.',
    mandatoryContinueButtonLabel: '업데이트',
  },
  deploymentKey: Platform.select({
    android: Config.CODEPUSH_KEY_ANDROID,
    ios: Config.CODEPUSH_KEY_IOS,
  }),
};

export default Sentry.wrap(codePush(codePushOptions)(App));
