/**
 * # IPortfolioRecord
 * ---
 * - 간단설명: 포트폴리오 프로젝트 기록 인터페이스
 * - 제약사항: startDate, endDate는 ISO 8601 날짜 문자열
 * ---
 * @example
 * const record: IPortfolioRecord = { id: 'uuid', userId: 'uid', title: '프로젝트', ... }
 */
export interface IPortfolioRecord {
  /** 고유 식별자 (UUID) */
  id: string
  /** 작성자 ID (Supabase Auth user.id) */
  userId: string
  /** 프로젝트 제목 */
  title: string
  /** 프로젝트 설명 */
  description: string
  /** 사용 기술 스택 */
  techStack: string[]
  /** 썸네일 이미지 URL */
  thumbnailUrl: string | null
  /** 프로젝트 URL */
  projectUrl: string | null
  /** GitHub 저장소 URL */
  githubUrl: string | null
  /** 프로젝트 시작일 (ISO 8601) */
  startDate: string
  /** 프로젝트 종료일 (ISO 8601, 진행중이면 null) */
  endDate: string | null
  /** 생성일시 */
  createdAt: string
  /** 수정일시 */
  updatedAt: string
}
