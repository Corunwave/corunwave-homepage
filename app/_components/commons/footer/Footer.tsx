import Image from "next/image";
import Link from "next/link";
import { siteFooter as content } from "../../../_content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__contents">
        <Link
          href="/"
          className="site-footer__logo"
          aria-label={content.logoAriaLabel}
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

        <ul className="site-footer__company-information" aria-label={content.companyInfoLabel}>
          <li>
            <span>상호</span> {content.companyName} · <span>대표</span>{" "}
            {content.ceo}
          </li>
          <li>
            <span>개인정보관리책임자</span> {content.privacyOfficer}
          </li>
          <li>
            <span>이메일</span>{" "}
            <a href={`mailto:${content.email}`}>{content.email}</a>
          </li>
          <li>{content.address}</li>
          <li>
            <span>사업자등록번호</span> {content.businessNumber}
          </li>
        </ul>
      </div>

      <div className="site-footer__bottom">
        <ul className="site-footer__legal" aria-label={content.legalLabel}>
          {content.legal.map(({ label, href }) => (
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
        <p className="site-footer__copyright">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}
