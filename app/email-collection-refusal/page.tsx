import type { Metadata } from "next";
import { sharedOpenGraph } from "../_lib/metadata";
import LegalDocument from "../_components/commons/legal/LegalDocument";
import PageHero from "../_components/commons/hero/PageHero";
import {
  emailCollectionRefusalClauses,
  emailCollectionRefusalIntro,
  emailCollectionRefusalPage,
} from "../_content/legal/emailCollectionRefusal";

const { title, heading, description, effectiveDate } =
  emailCollectionRefusalPage;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...sharedOpenGraph,
    title: `${title} · 코런웨이브`,
    description,
  },
};

export default function EmailCollectionRefusalPage() {
  return (
    <main>
      <PageHero title={title} description={description} />
      <LegalDocument
        idPrefix="email-refusal"
        title={heading}
        effectiveDate={effectiveDate}
        intro={emailCollectionRefusalIntro}
        clauses={emailCollectionRefusalClauses}
      />
    </main>
  );
}
