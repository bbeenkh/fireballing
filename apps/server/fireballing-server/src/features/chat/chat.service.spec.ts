import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { ChatService } from './chat.service';
import type { IChatMessage } from '@fblg/types';

const mockGenerateContent = vi.fn();

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return { generateContent: mockGenerateContent };
    }
  },
}));

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: 'GEMINI_API_KEY', useValue: 'test-api-key' },
      ],
    }).compile();

    service = module.get(ChatService);
  });

  describe('chat', () => {
    it('사용자 메시지에 대해 AI 응답을 반환한다', async () => {
      const messages: IChatMessage[] = [
        { role: 'user', content: '안녕하세요' },
      ];

      mockGenerateContent.mockResolvedValue({
        response: { text: () => '안녕하세요! 무엇을 도와드릴까요?' },
      });

      const result = await service.chat(messages, 'default');

      expect(result).toEqual({
        role: 'model',
        content: '안녕하세요! 무엇을 도와드릴까요?',
      });
    });

    it('멀티턴 대화 히스토리를 전달한다', async () => {
      const messages: IChatMessage[] = [
        { role: 'user', content: '안녕' },
        { role: 'model', content: '안녕하세요!' },
        { role: 'user', content: '이름이 뭐야?' },
      ];

      mockGenerateContent.mockResolvedValue({
        response: { text: () => '저는 AI 어시스턴트입니다.' },
      });

      const result = await service.chat(messages, 'default');

      expect(result).toEqual({
        role: 'model',
        content: '저는 AI 어시스턴트입니다.',
      });
      expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    });

    it('존재하지 않는 페르소나는 default로 폴백한다', async () => {
      const messages: IChatMessage[] = [
        { role: 'user', content: '테스트' },
      ];

      mockGenerateContent.mockResolvedValue({
        response: { text: () => '응답' },
      });

      const result = await service.chat(messages, 'nonexistent');

      expect(result.role).toBe('model');
    });

    it('Gemini API 에러 시 예외를 던진다', async () => {
      const messages: IChatMessage[] = [
        { role: 'user', content: '안녕' },
      ];

      mockGenerateContent.mockRejectedValue(new Error('API 호출 실패'));

      await expect(service.chat(messages, 'default')).rejects.toThrow();
    });
  });
});
