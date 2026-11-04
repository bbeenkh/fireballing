import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { loadEnv } from './common/config/env.config';

/**
 * # bootstrap
 * ---
 * - 간단설명: NestJS 애플리케이션을 생성하고 서버를 시작
 * ---
 */
async function bootstrap() {
  const env = loadEnv();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(env.PORT);
  console.log(`Server is running on port ${env.PORT}`);
}

bootstrap();
