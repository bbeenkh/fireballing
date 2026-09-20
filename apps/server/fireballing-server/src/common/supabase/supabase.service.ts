import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { loadEnv } from '../config/env.config';

/**
 * # SupabaseService
 * ---
 * - 간단설명: Supabase 클라이언트 생성 및 연결 검증을 담당하는 서비스
 * ---
 */
@Injectable()
export class SupabaseService {
  /**
   * # getClient
   * ---
   * - 간단설명: anon key 기반 서버 공용 Supabase 클라이언트를 반환
   * ---
   */
  getClient() {
    const env = loadEnv();
    return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  }

  /**
   * # getClientWithToken
   * ---
   * - 간단설명: 사용자 access token을 포함한 Supabase 클라이언트를 생성
   * - 제약사항: 인증된 사용자의 요청 처리에만 사용할 것
   * ---
   * @param accessToken JWT access token
   */
  getClientWithToken(accessToken: string) {
    const env = loadEnv();
    return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      global: {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    });
  }

  /**
   * # checkConnection
   * ---
   * - 간단설명: Supabase 연결 상태를 확인
   * ---
   */
  async checkConnection(): Promise<boolean> {
    try {
      const client = this.getClient();
      const { error } = await client.auth.getSession();
      return !error;
    } catch {
      return false;
    }
  }
}
