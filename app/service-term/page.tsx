import type { Metadata } from "next";
import LegalDocument from "../_components/commons/legal/LegalDocument";
import PageHero from "../_components/commons/hero/PageHero";
import {
  serviceTermClauses,
  serviceTermIntro,
} from "../_components/legal/serviceTermContent";

const title = "서비스 이용약관";
const description = "서비스 이용에 관한 기본 사항을 안내합니다.";

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

export default function ServiceTermPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="terms"
        title={title}
        effectiveDate="[시행일 입력]"
        intro={serviceTermIntro}
        clauses={serviceTermClauses}
      />
    </main>
  );
}
