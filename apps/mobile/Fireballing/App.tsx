import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/app/navigation';
import { QueryProvider } from './src/app/providers/QueryProvider';
import { loadTokensFromStorage } from './src/entities/auth';

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

export default App;
