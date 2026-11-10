// 관리자 좌측 상단 네비게이션의 작은 아이콘.
export function AdminIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 관리자 전용 SVG라 최적화가 필요 없다
    <img src="/images/logos/corunwave-symbol-color.svg" alt="코런웨이브" width={28} height={28} />
  );
}
