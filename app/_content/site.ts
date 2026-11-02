export type FooterLink = { label: string; href: string };

export type SiteFooterContent = {
  logoAriaLabel: string;
  companyInfoLabel: string;
  companyName: string;
  ceo: string;
  privacyOfficer: string;
  email: string;
  address: string;
  businessNumber: string;
  navigationLabel: string;
  navigation: readonly FooterLink[];
  legalLabel: string;
  legal: readonly FooterLink[];
  copyright: string;
};

export type ContactCtaContent = {
  title: string;
  buttonLabel: string;
  href: string;
};

export const siteFooter: SiteFooterContent = {
  logoAriaLabel: "코런웨이브 주식회사 홈",
  companyInfoLabel: "회사 정보",
  companyName: "코런웨이브 주식회사",
  ceo: "윤준용",
  privacyOfficer: "윤준용",
  email: "jyyoon@crw.co.kr",
  address: "서울시 마포구 독막로 331, 2506호 (도화동, 마스터즈타워빌딩)",
  businessNumber: "297-87-03734",
  navigationLabel: "하단 메뉴",
  navigation: [
    { label: "회사소개", href: "/about" },
    { label: "솔루션", href: "/solutions" },
    { label: "파트너 전략", href: "/partner-strategy" },
  ],
  legalLabel: "약관 및 정책",
  legal: [
    { label: "이용약관", href: "/service-term" },
    { label: "개인정보처리방침", href: "/privacy-policy" },
    { label: "이메일무단수집거부", href: "/email-collection-refusal" },
  ],
  copyright: "© Corunwave COMPANY. 2026 ALL RIGHTS RESERVED",
};

export const contactCta: ContactCtaContent = {
  title: "[[비즈니스 환경에 맞는]] [[서비스 구성을 제안합니다.]]",
  buttonLabel: "문의하기",
  href: "/contact",
};

const DOCUMENTS_BASE_URL =
  "https://jkeichkllrvtlegxskkl.supabase.co/storage/v1/object/public/corunwave-hompage-docs";

/*
 * Supabase answers `?download` with Content-Disposition: attachment, so the file saves without leaving the page.
 * The bucket only accepts ASCII object names; the Korean save name travels in the query instead.
 */
const documentUrl = (fileName: string, downloadName: string) =>
  `${DOCUMENTS_BASE_URL}/${fileName}?download=${encodeURIComponent(downloadName)}`;

export const documents = {
  companyProfile: documentUrl(
    "corunwave_company_profile.pdf",
    "코런웨이브_회사소개서.pdf",
  ),
  universityPortfolio: documentUrl(
    "AXInfra_univ_ver2.pdf",
    "코런웨이브_AX인프라_대학맞춤형_포트폴리오.pdf",
  ),
  enterprisePortfolio: documentUrl(
    "AXInfra_enterprise_ver2.pdf",
    "코런웨이브_AX인프라_기업공공맞춤형_포트폴리오.pdf",
  ),
} as const;
