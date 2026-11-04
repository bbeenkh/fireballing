import React from 'react';
import { Text } from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';

/**
 * # EditProfileScreen
 * ---
 * - 간단설명: 프로필 수정 화면 (플레이스홀더)
 */
function EditProfileScreenBase() {
  return (
    <Text style={{ fontSize: 20, padding: 16, color: '#1a1a1a' }}>
      프로필 수정
    </Text>
  );
}

export const EditProfileScreen = withLayout(EditProfileScreenBase);
