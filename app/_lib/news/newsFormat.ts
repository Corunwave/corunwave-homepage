const dateParts = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/* "2026. 05. 12" — 서버와 브라우저가 같은 시간대(KST)로 계산해 하이드레이션 불일치를 막는다. */
export const formatNewsDate = (iso: string | null) => {
  if (!iso) return "";
  const parts = Object.fromEntries(dateParts.formatToParts(new Date(iso)).map((p) => [p.type, p.value]));
  return `${parts.year}. ${parts.month}. ${parts.day}`;
};
