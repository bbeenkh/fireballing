/**
 * # IChatMessage
 * ---
 * - 간단설명: 챗봇 대화 메시지 단위
 * - role: 'user' (사용자) 또는 'model' (AI 응답)
 */
export interface IChatMessage {
  /** 메시지 발신자 역할 */
  role: 'user' | 'model';
  /** 메시지 내용 */
  content: string;
}

/**
 * # IChatRequest
 * ---
 * - 간단설명: 챗봇 API 요청 바디
 * - 제약사항: messages 배열의 마지막 메시지는 반드시 role: 'user'여야 함
 * ---
 * @example
 * const req: IChatRequest = {
 *   messages: [{ role: 'user', content: '안녕' }],
 *   persona: 'portfolio'
 * }
 */
export interface IChatRequest {
  /** 대화 히스토리 (클라이언트가 관리) */
  messages: IChatMessage[];
  /** 페르소나 키 (기본값: 'default') */
  persona?: string;
}

/**
 * # IChatResponse
 * ---
 * - 간단설명: 챗봇 API 응답 데이터
 */
export interface IChatResponse {
  /** AI 응답 메시지 */
  message: IChatMessage;
}
