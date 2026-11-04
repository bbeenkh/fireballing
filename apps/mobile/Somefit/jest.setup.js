jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}) => children,
  SafeAreaView: ({children}) => children,
  useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn(), goBack: jest.fn()}),
  useRoute: () => ({params: {}}),
  NavigationContainer: ({children}) => children,
  createNavigatorFactory: jest.fn(() => jest.fn(() => ({Navigator: ({children}) => children, Screen: () => null}))),
  createScreenFactory: jest.fn(() => jest.fn()),
  useNavigationBuilder: jest.fn(() => ({state: {routes: [], index: 0}, navigation: {}, descriptors: {}})),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}) => children,
    Screen: () => null,
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}) => children,
    Screen: () => null,
  }),
}));

jest.mock('react-native-config', () => ({
  API_URL: 'http://test.local',
  APP_ENV: 'test',
}));

jest.mock('@revopush/react-native-code-push', () => {
  const fn = () => component => component;
  fn.SyncStatus = {};
  fn.CheckFrequency = {ON_APP_START: 0};
  fn.InstallMode = {IMMEDIATE: 0};
  return {__esModule: true, default: fn};
});

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  wrap: fn => fn,
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(() => Promise.resolve()),
  show: jest.fn(() => Promise.resolve()),
  getVisibilityStatus: jest.fn(() => Promise.resolve('hidden')),
}));

jest.mock('react-native-gesture-handler', () => ({}));


jest.mock('react-native-worklets', () => ({}));

jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn(init => ({value: init})),
  useAnimatedStyle: jest.fn(() => ({})),
  useDerivedValue: jest.fn(fn => ({value: fn()})),
  withTiming: jest.fn(v => v),
  withSpring: jest.fn(v => v),
  runOnJS: jest.fn(fn => fn),
  default: {addWhitelistedNativeProps: jest.fn()},
}));

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  default: ({children}) => children,
  BottomSheetView: ({children}) => children,
  BottomSheetBackdrop: () => null,
}));
