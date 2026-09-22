import { z } from 'zod';

/**
 * # chatMessageSchema
 * ---
 * - 간단설명: 챗봇 대화 메시지 단위 검증 스키마
 */
export const chatMessageSchema = z.object({
  /** 메시지 발신자 역할 */
  role: z.enum(['user', 'model']),
  /** 메시지 내용 */
  content: z.string().min(1),
});

/**
 * # chatRequestSchema
 * ---
 * - 간단설명: 챗봇 API 요청 바디 검증 스키마
 * - 제약사항: messages 배열은 최소 1개, 마지막 메시지는 role: 'user'여야 함
 */
export const chatRequestSchema = z
  .object({
    /** 대화 히스토리 */
    messages: z.array(chatMessageSchema).min(1),
    /** 페르소나 키 (기본값: 'default') */
    persona: z.string().optional().default('default'),
  })
  .refine((data) => data.messages[data.messages.length - 1]!.role === 'user', {
    message: '마지막 메시지는 반드시 사용자(user) 메시지여야 합니다',
    path: ['messages'],
  });

export type ChatRequestSchema = z.infer<typeof chatRequestSchema>;
