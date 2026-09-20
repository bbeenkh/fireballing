import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

/**
 * # SupabaseModule
 * ---
 * - 간단설명: SupabaseService를 전역으로 제공하는 모듈
 * ---
 */
@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
