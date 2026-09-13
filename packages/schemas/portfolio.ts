import { z } from 'zod'

/**
 * # createPortfolioSchema
 * ---
 * - 간단설명: 포트폴리오 생성 요청 바디 검증 스키마
 * - 제약사항: title 필수, techStack은 문자열 배열
 */
export const createPortfolioSchema = z.object({
  /** 프로젝트 제목 */
  title: z.string().min(1),
  /** 프로젝트 설명 */
  description: z.string().min(1),
  /** 사용 기술 목록 */
  techStack: z.array(z.string()),
  /** 썸네일 이미지 URL */
  thumbnailUrl: z.string().url().nullable().optional(),
  /** 프로젝트 배포 URL */
  projectUrl: z.string().url().nullable().optional(),
  /** GitHub 저장소 URL */
  githubUrl: z.string().url().nullable().optional(),
  /** 프로젝트 시작일 */
  startDate: z.string().min(1),
  /** 프로젝트 종료일 */
  endDate: z.string().nullable().optional(),
})

/**
 * # updatePortfolioSchema
 * ---
 * - 간단설명: 포트폴리오 수정 요청 바디 검증 스키마
 * - 제약사항: 모든 필드 선택값 (partial)
 */
export const updatePortfolioSchema = createPortfolioSchema.partial()

export type CreatePortfolioRequest = z.infer<typeof createPortfolioSchema>
export type UpdatePortfolioRequest = z.infer<typeof updatePortfolioSchema>
