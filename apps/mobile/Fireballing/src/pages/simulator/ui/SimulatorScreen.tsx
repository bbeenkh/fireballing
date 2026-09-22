import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { withLayout } from '@/shared/ui/ScreenLayout';
import { useChatMutation } from '@/features/chat';
import type { IChatMessage } from '@fblg/types';

/**
 * # SimulatorScreenBase
 * ---
 * - 간단설명: Gemini 챗봇 테스트용 채팅 화면
 */
function SimulatorScreenBase() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<IChatMessage>>(null);
  const { mutateAsync, isPending } = useChatMutation();

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isPending) return;

    const userMessage: IChatMessage = { role: 'user', content: text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');

    try {
      const response = await mutateAsync({
        messages: updated,
        persona: 'default',
      });
      setMessages(prev => [...prev, response]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        { role: 'model', content: '오류가 발생했습니다. 다시 시도해주세요.' },
      ]);
    }
  }, [input, isPending, messages, mutateAsync]);

  const renderItem = useCallback(({ item }: { item: IChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.modelBubble]}
      >
        <Text style={isUser ? styles.userText : styles.modelText}>
          {item.content}
        </Text>
      </View>
    );
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#9e928e"
          returnKeyType="send"
          onSubmitEditing={handleSend}
          editable={!isPending}
        />
        <Pressable
          style={[styles.sendBtn, isPending && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={isPending || !input.trim()}
        >
          <Text style={styles.sendBtnText}>{isPending ? '...' : '전송'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export const SimulatorScreen = withLayout(SimulatorScreenBase);

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 8 },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff5a26',
    borderBottomRightRadius: 4,
  },
  modelBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  userText: { color: '#ffffff', fontSize: 15, lineHeight: 22 },
  modelText: { color: '#1a1a1a', fontSize: 15, lineHeight: 22 },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1a1a1a',
  },
  sendBtn: {
    backgroundColor: '#ff5a26',
    borderRadius: 21,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
