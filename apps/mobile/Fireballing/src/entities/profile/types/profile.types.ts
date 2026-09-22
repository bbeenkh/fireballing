/**
 * 프로필 데이터 타입
 * - name = 사용자 이름
 * - mbti = MBTI 유형
 * - gender = 성별
 * - age = 나이
 * - loveStyle = 연애 스타일
 */
export interface IProfileData {
  /** 사용자 이름 */
  name: string;
  /** MBTI 유형 */
  mbti: string;
  /** 성별 */
  gender: string;
  /** 나이 */
  age: number;
  /** 연애 스타일 */
  loveStyle: string;
}

/**
 * 프로필 스토어 상태 인터페이스
 * - hasProfile = 프로필 등록 여부
 * - profileData = 프로필 데이터 (미등록 시 null)
 * - initialize = AsyncStorage에서 프로필 로드
 * - saveProfile = 프로필 저장
 * - clearProfile = 프로필 삭제
 */
export interface IProfileState {
  /** 프로필 등록 여부 */
  hasProfile: boolean;
  /** 프로필 데이터 */
  profileData: IProfileData | null;
  /** AsyncStorage에서 프로필 로드 */
  initialize: () => Promise<void>;
  /** 프로필 저장 */
  saveProfile: (data: IProfileData) => Promise<void>;
  /** 프로필 삭제 */
  clearProfile: () => Promise<void>;
}
