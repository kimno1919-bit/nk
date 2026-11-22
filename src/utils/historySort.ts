// 연혁 정렬 유틸: 연도 내림차순 → 월 내림차순(최신이 위) → sort_order 오름차순
// month 는 "7", "07", "7월", "상시" 등 자유 텍스트라 숫자로 파싱해서 비교한다.

export function parseMonth(month: unknown): number {
  const m = String(month ?? "").match(/\d+/);
  if (!m) return 99; // "상시" 등 숫자 없는 값은 해당 연도 맨 위
  const n = parseInt(m[0], 10);
  return n >= 1 && n <= 12 ? n : 99;
}

// 저장 시 "7", "7월" → "07" 로 정규화 (숫자 없으면 원본 유지)
export function normalizeMonth(month: string): string {
  const trimmed = month.trim();
  const m = trimmed.match(/^(\d{1,2})\s*월?$/);
  if (!m) return trimmed;
  const n = parseInt(m[1], 10);
  return n >= 1 && n <= 12 ? String(n).padStart(2, "0") : trimmed;
}

export function compareHistory(a: any, b: any): number {
  if (a.year !== b.year) return Number(b.year) - Number(a.year);
  const ma = parseMonth(a.month);
  const mb = parseMonth(b.month);
  if (ma !== mb) return mb - ma;
  return (a.sort_order ?? 0) - (b.sort_order ?? 0);
}

export function sortHistories<T>(list: T[]): T[] {
  return [...list].sort(compareHistory);
}
