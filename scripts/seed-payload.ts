import config from "@payload-config";
import { getPayload, type Payload } from "payload";
import { downloads } from "../app/_content/home";
import { contactCta, siteFooter } from "../app/_content/site";
import { emailCollectionRefusalClauses, emailCollectionRefusalIntro, emailCollectionRefusalPage } from "../app/_content/legal/emailCollectionRefusal";
import { privacyPolicyClauses, privacyPolicyIntro, privacyPolicyPage } from "../app/_content/legal/privacyPolicy";
import { serviceTermClauses, serviceTermIntro, serviceTermPage } from "../app/_content/legal/serviceTerm";
import type { LegalClause } from "../app/_components/commons/legal/LegalDocument";
import { seedAbout, seedHome, seedPartnerStrategy, seedSolutions } from "./seed/pages";

// 이미 있는 데이터는 건드리지 않는다(관리자에서 수정한 내용을 덮어쓰지 않기 위함).

const log = (message: string) => console.log(`[seed] ${message}`);

async function seedCeo(payload: Payload) {
  const email = process.env.SEED_CEO_EMAIL;
  const password = process.env.SEED_CEO_PASSWORD;
  const { totalDocs } = await payload.count({ collection: "users", where: { role: { equals: "ceo" } } });
  if (totalDocs > 0) return log("CEO 계정이 이미 있어 건너뜁니다.");
  if (!email || !password) return log("SEED_CEO_EMAIL / SEED_CEO_PASSWORD가 없어 CEO 시드를 건너뜁니다.");
  await payload.create({ collection: "users", data: { email, password, name: "대표", role: "ceo" } });
  log("CEO 계정을 만들었습니다.");
}

async function seedSiteSettings(payload: Payload) {
  const current = (await payload.findGlobal({ slug: "site-settings", depth: 0 })) as { company?: { companyName?: string } };
  if (current.company?.companyName) return log("사이트 설정이 이미 있어 건너뜁니다.");

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      company: {
        companyName: siteFooter.companyName,
        ceo: siteFooter.ceo,
        privacyOfficer: siteFooter.privacyOfficer,
        email: siteFooter.email,
        address: siteFooter.address,
        businessNumber: siteFooter.businessNumber,
        copyright: siteFooter.copyright,
      },
      footerNavigation: siteFooter.navigation.map(({ label, href }) => ({ label, href })),
      legalLinks: siteFooter.legal.map(({ label, href }) => ({ label, href })),
      contactCta: { ...contactCta },
    },
  });
  log("사이트 설정을 만들었습니다.");
}

const toClauses = (clauses: readonly LegalClause[]) =>
  clauses.map(({ title, body, table }) => ({
    title,
    body: body ?? "",
    table: table
      ? { caption: table.caption, rows: table.rows.map(({ label, value }) => ({ label, value })) }
      : undefined,
  }));

async function seedLegalDocuments(payload: Payload) {
  const documents = [
    {
      slug: "privacy-policy",
      page: privacyPolicyPage,
      intro: privacyPolicyIntro,
      clauses: privacyPolicyClauses,
    },
    {
      slug: "service-term",
      page: serviceTermPage,
      intro: serviceTermIntro,
      clauses: serviceTermClauses,
    },
    {
      slug: "email-collection-refusal",
      page: emailCollectionRefusalPage,
      intro: emailCollectionRefusalIntro,
      clauses: emailCollectionRefusalClauses,
    },
  ] as const;

  for (const { slug, page, intro, clauses } of documents) {
    const { totalDocs } = await payload.count({ collection: "legal-documents", where: { slug: { equals: slug } } });
    if (totalDocs > 0) {
      log(`${slug}: 이미 있어 건너뜁니다.`);
      continue;
    }
    await payload.create({
      collection: "legal-documents",
      data: {
        slug,
        title: page.title,
        heading: "heading" in page ? page.heading : undefined,
        description: page.description,
        effectiveDate: page.effectiveDate,
        extraMeta: "extraMeta" in page ? page.extraMeta.map(({ label, value }) => ({ label, value })) : [],
        intro,
        clauses: toClauses(clauses),
      },
    });
    log(`${slug}: 만들었습니다.`);
  }
}

async function seedDocuments(payload: Payload) {
  // 기존 공개 버킷의 PDF를 내려받아 Payload 업로드 경로(documents/)로 다시 올린다.
  const sources = [
    { href: "companyProfile", order: 0 },
    { href: "universityPortfolio", order: 1 },
    { href: "enterprisePortfolio", order: 2 },
  ] as const;

  const { documents } = await import("../app/_content/site");

  for (const [index, item] of downloads.items.entries()) {
    const existing = await payload.find({ collection: "documents", where: { label: { equals: item.label } }, limit: 1, depth: 0 });
    if (existing.totalDocs > 0) {
      const current = existing.docs[0] as unknown as { id: number | string; slot?: string | null };
      if (!current.slot) {
        await payload.update({ collection: "documents", id: current.id, data: { slot: sources[index].href } });
        log(`${item.label}: 구분(${sources[index].href})을 지정했습니다.`);
      } else {
        log(`${item.label}: 이미 있어 건너뜁니다.`);
      }
      continue;
    }

    const source = new URL(documents[sources[index].href]);
    const downloadName = source.searchParams.get("download") ?? undefined;
    source.search = "";

    const response = await fetch(source);
    if (!response.ok) throw new Error(`PDF를 내려받지 못했습니다: ${source.pathname} (${response.status})`);
    const data = Buffer.from(await response.arrayBuffer());

    await payload.create({
      collection: "documents",
      data: { label: item.label, downloadName, slot: sources[index].href, sortOrder: sources[index].order, isPublished: true },
      file: {
        data,
        mimetype: "application/pdf",
        name: source.pathname.split("/").pop() ?? "document.pdf",
        size: data.length,
      },
    });
    log(`${item.label}: 업로드했습니다.`);
  }
}

async function main() {
  const payload = await getPayload({ config });
  await seedCeo(payload);
  await seedSiteSettings(payload);
  await seedLegalDocuments(payload);
  await seedDocuments(payload);
  await seedHome(payload);
  await seedAbout(payload);
  await seedSolutions(payload);
  await seedPartnerStrategy(payload);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
