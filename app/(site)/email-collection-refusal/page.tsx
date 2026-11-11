import LegalDocument from "@/app/_components/commons/legal/LegalDocument";
import PageHero from "@/app/_components/commons/hero/PageHero";
import { legalMetadata, requireLegalPage } from "@/app/_lib/cms/legal";

export const generateMetadata = () => legalMetadata("email-collection-refusal");

export default async function LegalPage() {
  const { title, heading, description, effectiveDate, extraMeta, intro, clauses } =
    await requireLegalPage("email-collection-refusal");

  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="email-refusal"
        title={heading}
        effectiveDate={effectiveDate}
        intro={intro}
        extraMeta={extraMeta}
        clauses={clauses}
      />
    </main>
  );
}
