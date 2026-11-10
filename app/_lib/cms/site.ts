import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import type { ContactCtaContent, SiteFooterContent } from "@/app/_content/site";
import { getCms } from "./getCms";

type CmsLink = { label: string; href: string };

type SiteSettingsDoc = {
  company?: {
    companyName?: string;
    ceo?: string;
    privacyOfficer?: string;
    email?: string;
    address?: string;
    businessNumber?: string;
    copyright?: string;
  };
  footerNavigation?: CmsLink[];
  legalLinks?: CmsLink[];
  contactCta?: Partial<ContactCtaContent>;
};

const toLinks = (links: CmsLink[] | undefined) =>
  (links ?? []).map(({ label, href }) => ({ label, href }));

export const getSiteSettings = unstable_cache(
  async (): Promise<{ footer: SiteFooterContent; contactCta: ContactCtaContent }> => {
    const payload = await getCms();
    const doc = (await payload.findGlobal({ slug: "site-settings", depth: 0 })) as SiteSettingsDoc;
    const company = doc.company ?? {};

    return {
      footer: {
        logoAriaLabel: `${company.companyName ?? "코런웨이브"} 홈`,
        companyInfoLabel: "회사 정보",
        companyName: company.companyName ?? "",
        ceo: company.ceo ?? "",
        privacyOfficer: company.privacyOfficer ?? "",
        email: company.email ?? "",
        address: company.address ?? "",
        businessNumber: company.businessNumber ?? "",
        navigationLabel: "하단 메뉴",
        navigation: toLinks(doc.footerNavigation),
        legalLabel: "약관 및 정책",
        legal: toLinks(doc.legalLinks),
        copyright: company.copyright ?? "",
      },
      contactCta: {
        title: doc.contactCta?.title ?? "",
        buttonLabel: doc.contactCta?.buttonLabel ?? "",
        href: doc.contactCta?.href ?? "/contact",
      },
    };
  },
  ["cms-site-settings"],
  { tags: [CMS_TAGS.site] },
);
