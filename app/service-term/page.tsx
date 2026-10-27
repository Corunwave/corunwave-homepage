import type { Metadata } from "next";
import { sharedOpenGraph } from "../_lib/metadata";
import LegalDocument from "../_components/commons/legal/LegalDocument";
import PageHero from "../_components/commons/hero/PageHero";
import {
  serviceTermClauses,
  serviceTermIntro,
  serviceTermPage,
} from "../_content/legal/serviceTerm";

const { title, description, effectiveDate } = serviceTermPage;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...sharedOpenGraph,
    title: `${title} · 코런웨이브`,
    description,
  },
};

export default function ServiceTermPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="terms"
        title={title}
        effectiveDate={effectiveDate}
        intro={serviceTermIntro}
        clauses={serviceTermClauses}
      />
    </main>
  );
}
