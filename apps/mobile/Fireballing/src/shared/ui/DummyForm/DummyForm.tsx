import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

/**
 * # DummyForm
 * ---
 * - 간단설명: 테스트 환경 검증용 더미 폼 컴포넌트 (RN 기본 컴포넌트만 사용)
 * - 제약사항 및 특이사항:
 *   - 환경 검증 완료 후 삭제 가능
 *   - testID가 부여되어 Detox E2E에서 사용 가능
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
    <View testID="dummy-form" style={styles.container}>
      <Text style={styles.title}>테스트 폼</Text>
      <TextInput
        testID="input-name"
        style={styles.input}
        placeholder="이름을 입력해주세요"
        placeholderTextColor="#9e928e"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        testID="input-email"
        style={styles.input}
        placeholder="이메일을 입력해주세요"
        placeholderTextColor="#9e928e"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button
        testID="btn-submit"
        onPress={handleSubmit}
        title="submit"
      />
      {message ? (
        <Text testID="text-result" style={styles.message}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  input: {
    borderWidth: 1,
    borderColor: '#e7ded6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff5a26',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 14, color: '#9e928e', padding: 8 },
});
