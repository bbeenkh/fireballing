import { Hono } from 'hono'
import { createPortfolioSchema, updatePortfolioSchema } from '../types/portfolio.types.js'
import * as portfolioService from '../model/portfolio.service.js'
import { authMiddleware } from '../../auth/lib/auth.middleware.js'
import { HttpError } from '../../../shared/errors/http-error.js'
import { SupabaseConnectionError } from '../../../shared/errors/supabase-connection-error.js'

/**
 * # portfolioRoutes
 * ---
 * - 간단설명: 포트폴리오 CRUD API 라우트 (/api/portfolio에 마운트)
 * - 제약사항: 모든 라우트에 인증 필요
 * ---
 * @example
 * app.route('/api/portfolio', portfolioRoutes)
 */
export const portfolioRoutes = new Hono()

// 모든 라우트에 인증 미들웨어 적용
portfolioRoutes.use('/*', authMiddleware)

/**
 * # POST /
 * ---
 * - 간단설명: 새 포트폴리오 생성
 * ---
 * @param title 프로젝트 제목 (필수)
 * @param description 프로젝트 설명 (선택)
 * @param techStack 기술 스택 목록 (선택)
 */
portfolioRoutes.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = createPortfolioSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ success: false, error: '입력값이 올바르지 않습니다' }, 400)
  }

  const token = c.req.header('Authorization')!.slice(7)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (c as any).get('userId') as string

  try {
    const result = await portfolioService.createPortfolio(token, userId, parsed.data)
    return c.json({ success: true, data: result }, 201)
  } catch (e) {
    if (e instanceof SupabaseConnectionError) {
      return c.json({ success: false, error: 'supabase connection error' }, 503)
    }
    const status = e instanceof HttpError ? e.statusCode : 500
    const message = e instanceof Error ? e.message : '포트폴리오 생성에 실패했습니다'
    return c.json({ success: false, error: message }, status as any)
  }
})

/**
 * # GET /
 * ---
 * - 간단설명: 내 포트폴리오 목록 조회
 */
portfolioRoutes.get('/', async (c) => {
  const token = c.req.header('Authorization')!.slice(7)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (c as any).get('userId') as string

  try {
    const result = await portfolioService.getPortfolios(token, userId)
    return c.json({ success: true, data: result }, 200)
  } catch (e) {
    if (e instanceof SupabaseConnectionError) {
      return c.json({ success: false, error: 'supabase connection error' }, 503)
    }
    const status = e instanceof HttpError ? e.statusCode : 500
    const message = e instanceof Error ? e.message : '포트폴리오 목록 조회에 실패했습니다'
    return c.json({ success: false, error: message }, status as any)
  }
})

/**
 * # GET /:id
 * ---
 * - 간단설명: 포트폴리오 상세 조회
 */
portfolioRoutes.get('/:id', async (c) => {
  const token = c.req.header('Authorization')!.slice(7)
  const id = c.req.param('id')

  try {
    const result = await portfolioService.getPortfolioById(token, id)
    return c.json({ success: true, data: result }, 200)
  } catch (e) {
    if (e instanceof SupabaseConnectionError) {
      return c.json({ success: false, error: 'supabase connection error' }, 503)
    }
    const status = e instanceof HttpError ? e.statusCode : 500
    const message = e instanceof Error ? e.message : '포트폴리오 조회에 실패했습니다'
    return c.json({ success: false, error: message }, status as any)
  }
})

/**
 * # PATCH /:id
 * ---
 * - 간단설명: 포트폴리오 수정
 */
portfolioRoutes.patch('/:id', async (c) => {
  const body = await c.req.json()
  const parsed = updatePortfolioSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ success: false, error: '입력값이 올바르지 않습니다' }, 400)
  }

  const token = c.req.header('Authorization')!.slice(7)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (c as any).get('userId') as string
  const id = c.req.param('id')

  try {
    const result = await portfolioService.updatePortfolio(token, id, userId, parsed.data)
    return c.json({ success: true, data: result }, 200)
  } catch (e) {
    if (e instanceof SupabaseConnectionError) {
      return c.json({ success: false, error: 'supabase connection error' }, 503)
    }
    const status = e instanceof HttpError ? e.statusCode : 500
    const message = e instanceof Error ? e.message : '포트폴리오 수정에 실패했습니다'
    return c.json({ success: false, error: message }, status as any)
  }
})

/**
 * # DELETE /:id
 * ---
 * - 간단설명: 포트폴리오 삭제
 */
portfolioRoutes.delete('/:id', async (c) => {
  const token = c.req.header('Authorization')!.slice(7)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (c as any).get('userId') as string
  const id = c.req.param('id')

  try {
    await portfolioService.deletePortfolio(token, id, userId)
    return c.json({ success: true, message: '포트폴리오가 삭제되었습니다' }, 200)
  } catch (e) {
    if (e instanceof SupabaseConnectionError) {
      return c.json({ success: false, error: 'supabase connection error' }, 503)
    }
    const status = e instanceof HttpError ? e.statusCode : 500
    const message = e instanceof Error ? e.message : '포트폴리오 삭제에 실패했습니다'
    return c.json({ success: false, error: message }, status as any)
  }
})
