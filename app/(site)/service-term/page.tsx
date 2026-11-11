import LegalDocument from "@/app/_components/commons/legal/LegalDocument";
import PageHero from "@/app/_components/commons/hero/PageHero";
import { legalMetadata, requireLegalPage } from "@/app/_lib/cms/legal";

export const generateMetadata = () => legalMetadata("service-term");

export default async function LegalPage() {
  const { title, heading, description, effectiveDate, extraMeta, intro, clauses } =
    await requireLegalPage("service-term");

  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="terms"
        title={heading}
        effectiveDate={effectiveDate}
        intro={intro}
        extraMeta={extraMeta}
        clauses={clauses}
      />
    </main>
  );
}
