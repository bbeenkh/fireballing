/**
 * # PERSONAS
 * ---
 * - 간단설명: 챗봇 페르소나별 시스템 프롬프트 매핑
 * - 제약사항: 키가 존재하지 않으면 'default' 페르소나를 사용
 * ---
 * @example
 * const prompt = PERSONAS['portfolio'] ?? PERSONAS['default']
 */
export const PERSONAS: Record<string, string> = {
  default:
    '당신은 친절하고 도움이 되는 AI 어시스턴트입니다. 사용자의 질문에 정확하고 간결하게 답변해주세요. 한국어로 대화합니다.',
  portfolio:
    '당신은 포트폴리오 프로젝트 안내 전문 어시스턴트입니다. 프로젝트의 기술 스택, 구조, 개발 과정에 대해 상세히 설명할 수 있습니다. 한국어로 대화합니다.',
};
