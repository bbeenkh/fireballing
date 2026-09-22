/**
 * 내 정보 타입 — 기기에 영구 저장
 * - gender = 성별 (M: 남성, F: 여성)
 * - mbti = MBTI 유형 (선택, 스킵 시 undefined)
 * - name = 이름
 * - birthYear = 출생 년도
 * - birthDate = 출생 날짜 (MM-DD)
 * - style = 연애 스타일
 * - job = 직업
 */
export type Me = {
  /** 성별 */
  gender: 'M' | 'F';
  /** MBTI 유형 (선택) */
  mbti?: string;
  /** 이름 */
  name: string;
  /** 출생 년도 */
  birthYear: string;
  /** 출생 날짜 (MM-DD) */
  birthDate: string;
  /** 연애 스타일 */
  style: 'lead' | 'follow' | 'both';
  /** 직업 */
  job: 'student' | 'office' | 'unemployed' | 'professional' | 'freelance';
};

/**
 * 상대 정보 타입 — 세션에만 유지, 저장 안 함
 * - gender = 성별
 * - mbti = MBTI 유형 (필수)
 * - ageRel = 나이 관계 (연하/동갑/연상)
 * - job = 직업
 */
export type Partner = {
  /** 성별 */
  gender: 'M' | 'F';
  /** MBTI 유형 (필수) */
  mbti: string;
  /** 나이 관계 */
  ageRel: 'younger' | 'same' | 'older';
  /** 직업 */
  job:
    | 'office'
    | 'professional'
    | 'creative'
    | 'service'
    | 'student'
    | 'freelance';
};

/**
 * 시뮬레이터 스토어 상태 인터페이스
 * - me = 내 정보 (AsyncStorage 영구 저장)
 * - partner = 상대 정보 (세션 메모리만)
 */
export interface ISimulatorState {
  /** 내 정보 */
  me: Me | null;
  /** 내 정보 저장 (AsyncStorage + 상태) */
  setMe: (me: Me) => Promise<void>;
  /** AsyncStorage에서 내 정보 복원 */
  loadMe: () => Promise<void>;

  /** 상대 정보 */
  partner: Partner | null;
  /** 상대 정보 설정 (세션만) */
  setPartner: (partner: Partner) => void;
  /** 상대 정보 초기화 */
  clearPartner: () => void;
}
