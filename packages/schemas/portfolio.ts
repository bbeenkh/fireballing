import { z } from 'zod';

/**
 * # createPortfolioSchema
 * ---
 * - 간단설명: 포트폴리오 생성 요청 바디 검증 스키마
 * - 제약사항: title, description, startDate는 필수
 * ---
 * @example
 * const parsed = createPortfolioSchema.safeParse(body)
 */
export const createPortfolioSchema = z.object({
  /** 프로젝트 제목 */
  title: z.string().min(1),
  /** 프로젝트 설명 */
  description: z.string().min(1),
  /** 사용 기술 스택 */
  techStack: z.array(z.string()).default([]),
  /** 썸네일 이미지 URL */
  thumbnailUrl: z.string().url().optional(),
  /** 프로젝트 URL */
  projectUrl: z.string().url().optional(),
  /** GitHub 저장소 URL */
  githubUrl: z.string().url().optional(),
  /** 프로젝트 시작일 (ISO 8601) */
  startDate: z.string().date(),
  /** 프로젝트 종료일 (ISO 8601) */
  endDate: z.string().date().optional(),
});

/**
 * # updatePortfolioSchema
 * ---
 * - 간단설명: 포트폴리오 수정 요청 바디 검증 스키마
 * - 제약사항: 모든 필드 선택적 (partial)
 * ---
 * @example
 * const parsed = updatePortfolioSchema.safeParse(body)
 */
export const updatePortfolioSchema = createPortfolioSchema.partial();

/** 포트폴리오 생성 요청 타입 */
export type CreatePortfolioRequest = z.infer<typeof createPortfolioSchema>;
/** 포트폴리오 수정 요청 타입 */
export type UpdatePortfolioRequest = z.infer<typeof updatePortfolioSchema>;
