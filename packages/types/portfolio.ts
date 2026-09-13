/**
 * # IPortfolioRecord
 * ---
 * - 간단설명: 포트폴리오 데이터 레코드 인터페이스
 * - id: 포트폴리오 고유 ID
 * - userId: 소유자 ID
 * - title: 프로젝트 제목
 * - description: 프로젝트 설명
 * - techStack: 사용 기술 스택 목록
 * - thumbnailUrl: 썸네일 이미지 URL
 * - projectUrl: 프로젝트 URL
 * - githubUrl: GitHub 저장소 URL
 * - startDate: 프로젝트 시작일
 * - endDate: 프로젝트 종료일
 * - createdAt: 생성일시
 * - updatedAt: 수정일시
 */
export interface IPortfolioRecord {
  /** 포트폴리오 고유 ID */
  id: string
  /** 소유자 ID */
  userId: string
  /** 프로젝트 제목 */
  title: string
  /** 프로젝트 설명 */
  description: string | null
  /** 사용 기술 스택 목록 */
  techStack: string[]
  /** 썸네일 이미지 URL */
  thumbnailUrl: string | null
  /** 프로젝트 URL */
  projectUrl: string | null
  /** GitHub 저장소 URL */
  githubUrl: string | null
  /** 프로젝트 시작일 */
  startDate: string | null
  /** 프로젝트 종료일 */
  endDate: string | null
  /** 생성일시 */
  createdAt: string
  /** 수정일시 */
  updatedAt: string
}
