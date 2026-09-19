import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button, Typography, Tip} from '@fblg/core-ui';

/**
 * # DummyForm
 * ---
 * - 간단설명: 테스트 환경 검증용 더미 폼 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 환경 검증 완료 후 삭제 가능
 *   - testID가 부여되어 Maestro E2E에서도 사용 가능
 *   - @fblg/core-ui 컴포넌트로 구성
 * ---
 * @example
 * <DummyForm />
 */
export function DummyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setMessage('입력을 확인해주세요');
      return;
    }
    setMessage('제출 완료');
  };

  return (
    <View testID="dummy-form" className="p-md gap-md">
      <Typography variant="h3">테스트 폼</Typography>
      <Input
        testID="input-name"
        variant="default"
        label="이름"
        placeholder="이름을 입력해주세요"
        value={name}
        onChangeText={setName}
      />
      <Input
        testID="input-email"
        variant="default"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button testID="btn-submit" variant="primary" size="lg" onPress={handleSubmit}>
        <Typography variant="label-md" className="text-on-primary">
          제출
        </Typography>
      </Button>
      {message ? (
        <Tip
          testID="text-result"
          variant={message === '제출 완료' ? 'info' : 'guidance'}
          description={message}
        />
      ) : null}
    </View>
  );
}
