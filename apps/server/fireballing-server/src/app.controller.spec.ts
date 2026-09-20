import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SupabaseService } from './common/supabase/supabase.service';

describe('AppController', () => {
  let controller: AppController;
  const mockSupabaseService = {
    checkConnection: vi.fn(),
    getClient: vi.fn(),
    getClientWithToken: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: SupabaseService, useValue: mockSupabaseService }],
    }).compile();

    controller = module.get(AppController);
  });

  describe('GET /', () => {
    it('헬스체크 응답을 반환한다', () => {
      const result = controller.healthCheck();
      expect(result).toEqual({
        success: true,
        message: 'Fireballing server is running',
      });
    });
  });

  describe('GET /api/hello', () => {
    it('Supabase 연결 성공 시 connected를 반환한다', async () => {
      mockSupabaseService.checkConnection.mockResolvedValue(true);

      const result = await controller.hello();
      expect(result).toEqual({
        success: true,
        data: {
          message: 'Hello Fireballing!',
          supabase: 'connected',
        },
      });
    });

    it('Supabase 연결 실패 시 disconnected를 반환한다', async () => {
      mockSupabaseService.checkConnection.mockResolvedValue(false);

      const result = await controller.hello();
      expect(result).toEqual({
        success: true,
        data: {
          message: 'Hello Fireballing!',
          supabase: 'disconnected',
        },
      });
    });
  });
});
