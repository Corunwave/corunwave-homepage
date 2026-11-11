import LegalDocument from "@/app/_components/commons/legal/LegalDocument";
import PageHero from "@/app/_components/commons/hero/PageHero";
import { legalMetadata, requireLegalPage } from "@/app/_lib/cms/legal";

export const generateMetadata = () => legalMetadata("privacy-policy");

export default async function LegalPage() {
  const { title, heading, description, effectiveDate, extraMeta, intro, clauses } =
    await requireLegalPage("privacy-policy");

  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="privacy"
        title={heading}
        effectiveDate={effectiveDate}
        intro={intro}
        extraMeta={extraMeta}
        clauses={clauses}
      />
    </main>
  );
}
