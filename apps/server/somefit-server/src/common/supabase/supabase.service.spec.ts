import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { SupabaseService } from './supabase.service';

vi.mock('../config/env.config', () => ({
  loadEnv: () => ({
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_ANON_KEY: 'test-anon-key',
    SUPABASE_JWT_SECRET: 'test-jwt-secret',
    PORT: 8080,
  }),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: {}, error: null }),
    },
  })),
}));

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [SupabaseService],
    }).compile();

    service = module.get(SupabaseService);
  });

  it('getClient가 Supabase 클라이언트를 반환한다', () => {
    const client = service.getClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });

  it('getClientWithToken이 토큰 포함 클라이언트를 반환한다', () => {
    const client = service.getClientWithToken('test-token');
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });

  it('checkConnection이 연결 성공 시 true를 반환한다', async () => {
    const result = await service.checkConnection();
    expect(result).toBe(true);
  });
});
