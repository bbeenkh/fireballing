import { useMutation } from '@tanstack/react-query';
import type { IChatMessage, IChatRequest, IChatResponse } from '@fblg/types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * # sendChat
 * ---
 * - 간단설명: POST /api/chat 호출하여 AI 응답을 받아오는 함수
 * ---
 * @param request 대화 요청 (messages, persona)
 */
async function sendChat(request: IChatRequest): Promise<IChatMessage> {
  // ponytail: 실기기 테스트용 하드코딩, env 연동 시 제거
  const url = 'http://192.168.200.144:8080/api/chat';
  console.log('[chat] POST', url);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const json = (await res.json()) as ApiResponse<IChatResponse>;

  if (!json.success || !json.data) {
    throw new Error(json.error ?? '챗봇 응답 실패');
  }

  return json.data.message;
}

/**
 * # useChatMutation
 * ---
 * - 간단설명: 챗봇 대화 전송용 React Query mutation 훅
 * ---
 * @example
 * const { mutateAsync, isPending } = useChatMutation();
 * const response = await mutateAsync({ messages, persona: 'default' });
 */
export function useChatMutation() {
  return useMutation({
    mutationFn: sendChat,
  });
}
