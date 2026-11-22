// 로컬(한국) 기준 오늘 날짜 "YYYY-MM-DD"
// toISOString()은 UTC라서 KST 오전 9시 전엔 어제 날짜가 나오는 문제가 있음
export function todayLocal(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
