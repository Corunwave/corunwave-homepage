import "server-only";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import type { LegalClause, LegalMetaItem } from "@/app/_components/commons/legal/LegalDocument";
import { sharedOpenGraph } from "@/app/_lib/metadata";
import { getCms } from "./getCms";

export type LegalSlug = "privacy-policy" | "service-term" | "email-collection-refusal";

type LegalDoc = {
  title: string;
  heading?: string | null;
  description: string;
  effectiveDate: string;
  extraMeta?: LegalMetaItem[] | null;
  intro: string;
  clauses?: {
    title: string;
    body?: string | null;
    table?: { caption?: string | null; rows?: { label: string; value: string }[] | null } | null;
  }[] | null;
};

export type LegalPageContent = {
  title: string;
  heading: string;
  description: string;
  effectiveDate: string;
  extraMeta: readonly LegalMetaItem[];
  intro: string;
  clauses: readonly LegalClause[];
};

// 목차 앵커·aria id가 기존 마크업과 같도록 문서별 접두사를 유지한다.
const CLAUSE_ID_PREFIX: Record<LegalSlug, string> = {
  "privacy-policy": "privacy",
  "service-term": "terms",
  "email-collection-refusal": "email-refusal",
};

export const getLegalPage = unstable_cache(
  async (slug: LegalSlug): Promise<LegalPageContent | null> => {
    const payload = await getCms();
    const { docs } = await payload.find({
      collection: "legal-documents",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    const doc = docs[0] as unknown as LegalDoc | undefined;
    if (!doc) return null;

    return {
      title: doc.title,
      heading: doc.heading || doc.title,
      description: doc.description,
      effectiveDate: doc.effectiveDate,
      extraMeta: (doc.extraMeta ?? []).map(({ label, value }) => ({ label, value })),
      intro: doc.intro,
      clauses: (doc.clauses ?? []).map((clause, index) => {
        const rows = clause.table?.rows ?? [];
        return {
          id: `${CLAUSE_ID_PREFIX[slug]}-clause-${index + 1}`,
          title: clause.title,
          body: clause.body || undefined,
          table: rows.length
            ? {
                caption: clause.table?.caption ?? "",
                rows: rows.map(({ label, value }) => ({ label, value })),
              }
            : undefined,
        };
      }),
    };
  },
  ["cms-legal-page"],
  { tags: [CMS_TAGS.legal] },
);

export const requireLegalPage = async (slug: LegalSlug) => {
  const page = await getLegalPage(slug);
  if (!page) notFound();
  return page;
};

export const legalMetadata = async (slug: LegalSlug): Promise<Metadata> => {
  const { title, description } = await requireLegalPage(slug);
  return {
    title,
    description,
    openGraph: {
      ...sharedOpenGraph,
      title: `${title} · 코런웨이브`,
      description,
    },
  };
};
