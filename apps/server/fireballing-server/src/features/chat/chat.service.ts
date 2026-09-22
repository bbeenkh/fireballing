import { Inject, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { IChatMessage } from '@fblg/types';
import { HttpError } from '../../common/errors/http-error';
import { PERSONAS } from './personas';

/**
 * # ChatService
 * ---
 * - 간단설명: Gemini API를 이용한 챗봇 대화 처리 서비스
 * - 제약사항: GEMINI_API_KEY가 주입되어야 함
 * ---
 * @example
 * const response = await chatService.chat(messages, 'default')
 */
@Injectable()
export class ChatService {
  private readonly genAI: GoogleGenerativeAI;

  constructor(@Inject('GEMINI_API_KEY') apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * # chat
   * ---
   * - 간단설명: 대화 히스토리와 페르소나를 기반으로 Gemini API에 응답을 요청
   * ---
   * @param messages 대화 히스토리
   * @param persona 페르소나 키
   */
  async chat(messages: IChatMessage[], persona: string): Promise<IChatMessage> {
    const systemPrompt = PERSONAS[persona] ?? PERSONAS['default']!;
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1]!.content;

    try {
      const result = await model.generateContent({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: '네, 알겠습니다.' }] },
          ...history,
          { role: 'user', parts: [{ text: lastMessage }] },
        ],
      });

      return {
        role: 'model',
        content: result.response.text(),
      };
    } catch (error) {
      throw new HttpError(
        502,
        `Gemini API 호출 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  }
}
