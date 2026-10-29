import type { Metadata } from "next";
import { sharedOpenGraph } from "../_lib/metadata";
import LegalDocument from "../_components/commons/legal/LegalDocument";
import PageHero from "../_components/commons/hero/PageHero";
import {
  privacyPolicyClauses,
  privacyPolicyIntro,
  privacyPolicyPage,
} from "../_content/legal/privacyPolicy";

const { title, description, effectiveDate, extraMeta } = privacyPolicyPage;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...sharedOpenGraph,
    title: `${title} · 코런웨이브`,
    description,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="privacy"
        title={title}
        effectiveDate={effectiveDate}
        intro={privacyPolicyIntro}
        extraMeta={extraMeta}
        clauses={privacyPolicyClauses}
      />
    </main>
  );
}
