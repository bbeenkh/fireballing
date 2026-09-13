/**
 * 포트폴리오 레코드 인터페이스
 * - id: 포트폴리오 고유 ID
 * - title: 프로젝트 제목
 * - description: 프로젝트 설명
 * - techStack: 사용 기술 목록
 * - thumbnailUrl: 썸네일 이미지 URL
 * - projectUrl: 프로젝트 배포 URL
 * - githubUrl: GitHub 저장소 URL
 * - startDate: 프로젝트 시작일
 * - endDate: 프로젝트 종료일
 * - createdAt: 레코드 생성일
 * - updatedAt: 레코드 수정일
 */
export interface IPortfolioRecord {
  /** 포트폴리오 고유 ID */
  id: string
  /** 프로젝트 제목 */
  title: string
  /** 프로젝트 설명 */
  description: string
  /** 사용 기술 목록 */
  techStack: string[]
  /** 썸네일 이미지 URL */
  thumbnailUrl: string | null
  /** 프로젝트 배포 URL */
  projectUrl: string | null
  /** GitHub 저장소 URL */
  githubUrl: string | null
  /** 프로젝트 시작일 */
  startDate: string
  /** 프로젝트 종료일 */
  endDate: string | null
  /** 레코드 생성일 */
  createdAt: string
  /** 레코드 수정일 */
  updatedAt: string
}
