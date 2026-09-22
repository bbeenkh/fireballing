import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { loadEnv } from '../../common/config/env.config';

/**
 * # ChatModule
 * ---
 * - 간단설명: Gemini 기반 챗봇 기능 모듈
 * ---
 */
@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    {
      provide: 'GEMINI_API_KEY',
      useFactory: () => loadEnv().GEMINI_API_KEY,
    },
  ],
})
export class ChatModule {}
