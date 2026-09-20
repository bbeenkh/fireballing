import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './common/supabase/supabase.service';

/**
 * # AppController
 * ---
 * - 간단설명: 헬스체크 및 DB 연동 검증용 컨트롤러
 * ---
 */
@Controller()
export class AppController {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * # GET /
   * ---
   * - 간단설명: 서버 헬스체크
   * ---
   */
  @Get()
  healthCheck() {
    return { success: true, message: 'Fireballing server is running' };
  }

  /**
   * # GET /api/hello
   * ---
   * - 간단설명: Supabase 연결 검증용 API
   * ---
   */
  @Get('api/hello')
  async hello() {
    const isConnected = await this.supabaseService.checkConnection();
    return {
      success: true,
      data: {
        message: 'Hello Fireballing!',
        supabase: isConnected ? 'connected' : 'disconnected',
      },
    };
  }
}
