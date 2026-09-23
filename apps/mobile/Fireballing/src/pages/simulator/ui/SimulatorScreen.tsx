import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
        className={`max-w-[80%] px-[14px] py-[10px] rounded-lg ${
          isUser
            ? 'self-end bg-primary rounded-br-sm'
            : 'self-start bg-[#f0f0f0] rounded-bl-sm'
        }`}
      >
        <Text
          className={`text-[15px] leading-[22px] ${
            isUser ? 'text-white' : 'text-[#1a1a1a]'
          }`}
        >
          {item.content}
        </Text>
      </View>
    );
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        contentContainerClassName="p-md gap-sm"
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View className="flex-row p-[12px] gap-sm border-t border-[#e5e5e5] bg-white">
        <TextInput
          className="flex-1 h-[42px] border border-[#d4d4d4] rounded-[21px] px-md text-[15px] text-[#1a1a1a]"
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#9e928e"
          returnKeyType="send"
          onSubmitEditing={handleSend}
          editable={!isPending}
        />
        <Pressable
          className={`bg-primary rounded-[21px] px-[18px] justify-center ${
            isPending ? 'opacity-50' : ''
          }`}
          onPress={handleSend}
          disabled={isPending || !input.trim()}
        >
          <Text className="text-white text-[15px] font-semibold">
            {isPending ? '...' : '전송'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export const SimulatorScreen = withLayout(SimulatorScreenBase);
