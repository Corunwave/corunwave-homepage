// 관리자 로그인 화면 등에 표시되는 로고. 크기는 속성으로 지정한다(style prop 금지).
export function AdminLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 관리자 전용 SVG라 최적화가 필요 없다
    <img src="/images/logos/corunwave-logo-brand.svg" alt="코런웨이브" width={132} height={39} />
  );
}
