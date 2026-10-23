import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "회사소개", href: "/about" },
  { label: "솔루션", href: "#" },
  { label: "파트너 전략", href: "/partner-strategy" },
];
const legal = ["이용약관", "개인정보처리방침", "이메일무단수집거부"];

export default function Footer() {

  return (
    <footer className="site-footer">
      <div className="site-footer__contents">
        <Link
          href="/"
          className="site-footer__logo"
          aria-label="코런웨이브 주식회사 홈"
        >
          <Image
            src="/images/logos/corunwave-ko-en-color.png"
            alt=""
            width={528}
            height={162}
            className="site-footer__logo-image"
            loading="eager"
          />
        </Link>

        <ul className="site-footer__company-information" aria-label="회사 정보">
          <li>
            <span>상호</span> 코런웨이브 주식회사 · <span>대표</span> 윤준용
          </li>
          <li>
            <span>개인정보관리책임자</span> 윤준용
          </li>
          <li>
            <span>이메일</span>{" "}
            <a href="mailto:jyyoon@crw.co.kr">jyyoon@crw.co.kr</a>
          </li>
          <li>서울시 마포구 독막로 331, 2506호 (도화동, 마스터즈타워빌딩)</li>
          <li>
            <span>사업자등록번호</span> 297-87-03734
          </li>
        </ul>

        {/* Add links when the corresponding pages are available. */}
        <nav className="site-footer__navigation" aria-label="하단 메뉴">
          <ul>
            {navigation.map(({ label, href }) => (
              <li key={label}>
                <Link href={href}>
                  {href === "#" ? (
                    <span aria-disabled="true" title="페이지 준비 중">
                      {label}
                    </span>
                  ) : (
                    label
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <ul className="site-footer__legal" aria-label="약관 및 정책">
          {legal.map((label) => (
            <li key={label}>
              <Link href="#">
                <span aria-disabled="true" title="페이지 준비 중">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="site-footer__copyright">
          © Corunwave COMPANY. 2026 ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}
