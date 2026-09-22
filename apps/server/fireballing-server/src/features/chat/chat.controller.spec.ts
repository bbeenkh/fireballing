import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

describe('ChatController', () => {
  let controller: ChatController;
  const mockChatService = {
    chat: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compile();

    controller = module.get(ChatController);
  });

  describe('POST /api/chat', () => {
    it('유효한 요청에 대해 AI 응답을 반환한다', async () => {
      mockChatService.chat.mockResolvedValue({
        role: 'model',
        content: '안녕하세요!',
      });

      const result = await controller.chat({
        messages: [{ role: 'user', content: '안녕' }],
        persona: 'default',
      });

      expect(result).toEqual({
        success: true,
        data: {
          message: { role: 'model', content: '안녕하세요!' },
        },
      });
      expect(mockChatService.chat).toHaveBeenCalledWith(
        [{ role: 'user', content: '안녕' }],
        'default',
      );
    });

    it('페르소나 미지정 시 default를 사용한다', async () => {
      mockChatService.chat.mockResolvedValue({
        role: 'model',
        content: '응답',
      });

      await controller.chat({
        messages: [{ role: 'user', content: '테스트' }],
        persona: 'default',
      });

      expect(mockChatService.chat).toHaveBeenCalledWith(
        [{ role: 'user', content: '테스트' }],
        'default',
      );
    });
  });
});
