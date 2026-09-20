const mockLogEvent = jest.fn();
const mockGetAnalytics = jest.fn(() => 'mock-analytics');

jest.mock('@react-native-firebase/analytics', () => ({
  getAnalytics: mockGetAnalytics,
  logEvent: mockLogEvent,
}));

describe('logEvent', () => {
  beforeEach(() => {
    mockLogEvent.mockClear();
    mockGetAnalytics.mockClear();
  });

  it('firebaseLogEvent에 analytics 인스턴스와 이벤트를 전달한다', () => {
    const { logEvent } = require('../analytics');
    logEvent('test_event', { key: 'value' });
    expect(mockGetAnalytics).toHaveBeenCalled();
    expect(mockLogEvent).toHaveBeenCalledWith('mock-analytics', 'test_event', {
      key: 'value',
    });
  });

  it('params 없이 호출할 수 있다', () => {
    const { logEvent } = require('../analytics');
    logEvent('simple_event');
    expect(mockLogEvent).toHaveBeenCalledWith(
      'mock-analytics',
      'simple_event',
      undefined,
    );
  });
});
