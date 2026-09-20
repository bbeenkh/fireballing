import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpError } from '../errors/http-error';
import { SupabaseConnectionError } from '../errors/supabase-connection-error';

/**
 * # HttpExceptionFilter
 * ---
 * - 간단설명: 전역 예외 필터. HttpError/SupabaseConnectionError/HttpException을 처리
 * ---
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpError) {
      return response.status(exception.statusCode).json({
        success: false,
        error: exception.message,
      });
    }

    if (exception instanceof SupabaseConnectionError) {
      return response.status(503).json({
        success: false,
        error: exception.message,
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        success: false,
        error: exception.message,
      });
    }

    return response.status(500).json({
      success: false,
      error: '서버 내부 오류가 발생했습니다',
    });
  }
}
