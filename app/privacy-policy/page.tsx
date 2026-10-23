import type { Metadata } from "next";
import LegalDocument from "../_components/commons/legal/LegalDocument";
import PageHero from "../_components/commons/hero/PageHero";
import {
  privacyPolicyClauses,
  privacyPolicyIntro,
} from "../_components/legal/privacyPolicyContent";

const title = "개인정보처리방침";
const description = "개인정보의 처리 및 보호에 관한 사항을 안내합니다.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · 코런웨이브`,
    description,
    type: "website",
    locale: "ko_KR",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="privacy"
        title={title}
        effectiveDate="[시행일 입력]"
        intro={privacyPolicyIntro}
        clauses={privacyPolicyClauses}
      />
    </main>
  );
}
