import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { chatRequestSchema } from '@fblg/schemas';
import type { ApiResponse } from '../../common/types/api-response';
import type { IChatResponse } from '@fblg/types';

/**
 * # ChatController
 * ---
 * - 간단설명: 챗봇 대화 API 엔드포인트 컨트롤러
 * ---
 */
@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * # POST /api/chat
   * ---
   * - 간단설명: 사용자 메시지를 받아 Gemini AI 응답을 반환
   * ---
   * @param body 대화 요청 바디 (messages, persona)
   */
  @Post()
  async chat(@Body() body: unknown): Promise<ApiResponse<IChatResponse>> {
    const { messages, persona } = chatRequestSchema.parse(body);
    const response = await this.chatService.chat(messages, persona);

    return {
      success: true,
      data: { message: response },
    };
  }
}
