import { by, device, element, expect } from 'detox';

describe('DummyForm E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('폼 입력 후 제출 완료 메시지가 표시된다', async () => {
    await expect(element(by.text('테스트 환경 검증'))).toBeVisible();

    await element(by.id('input-name')).tap();
    await element(by.id('input-name')).typeText('abc');

    await element(by.id('input-email')).tap();
    await element(by.id('input-email')).typeText('test@test.com');

    await element(by.id('btn-submit')).tap();

    await expect(element(by.text('제출 완료'))).toBeVisible();
  });
});
