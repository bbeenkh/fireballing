export const today = new Date();

/**
 * 날짜 변환 함수
 * 기본 변환 "YYYY-MM-DD"
 */
export const formatedDate = (date: Date | null, _format = 'YYYY-MM-DD') => {
  if (!date) return '';

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  // ponytail: YYYY-MM-DD only, extend when other formats needed
  return `${y}-${m}-${d}`;
};
