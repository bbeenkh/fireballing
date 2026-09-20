import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SupabaseModule } from './common/supabase/supabase.module';

/**
 * # AppModule
 * ---
 * - 간단설명: 애플리케이션 루트 모듈
 * ---
 */
@Module({
  imports: [SupabaseModule],
  controllers: [AppController],
})
export class AppModule {}
