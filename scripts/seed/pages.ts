import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Payload } from "payload";
import { LINE_FIELD } from "../../payload/lib/fields";
import { aboutPage, businessDirection, ceoMessage, companyValues, coreChallenges } from "../../app/_content/about";
import { downloads, homeHero, proposalTargets, serviceValues, solutions as homeSolutions } from "../../app/_content/home";
import {
  cooperationModels,
  customerProposals,
  partnerLogos,
  partnerStrategyPage,
  partnershipBenefits,
  proposal,
  toBeStrategy,
} from "../../app/_content/partner-strategy";
import { axInfra, learningService, solutionsPage } from "../../app/_content/solutions";

const log = (message: string) => console.log(`[seed] ${message}`);

// 코드에 고정되는 값(이미지·색상 등)은 CMS로 옮기지 않는다.
const CODE_OWNED = new Set(["image", "accent", "hubLogo", "logo", "modifier", "detailOrder"]);

/* 콘텐츠 객체를 CMS 필드 모양으로: 문자열 배열 → { line }, 의미 있는 `id` → `key`. */
function toCms(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? { [LINE_FIELD]: item } : toCms(item)));
  }
  if (value === null || typeof value !== "object") return value;

  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    if (CODE_OWNED.has(key)) continue;
    result[key === "id" ? "key" : key] = toCms(child);
  }
  return result;
}

const isFilled = async (payload: Payload, slug: string, probe: (doc: Record<string, unknown>) => unknown) => {
  const doc = (await payload.findGlobal({ slug, depth: 0 } as never)) as unknown as Record<string, unknown>;
  return Boolean(probe(doc));
};

async function seedGlobal(payload: Payload, slug: string, probe: (doc: Record<string, unknown>) => unknown, data: Record<string, unknown>) {
  if (await isFilled(payload, slug, probe)) return log(`${slug}: 이미 있어 건너뜁니다.`);
  await payload.updateGlobal({ slug, data } as never);
  log(`${slug}: 만들었습니다.`);
}

export async function seedHome(payload: Payload) {
  await seedGlobal(payload, "home", (doc) => (doc.hero as { title?: string } | undefined)?.title, {
    hero: toCms(homeHero),
    proposalTargets: toCms({
      ...proposalTargets,
      cards: proposalTargets.cards.map(({ modifier, ...card }) => ({ id: modifier, ...card })),
    }),
    solutions: toCms(homeSolutions),
    serviceValues: toCms(serviceValues),
    downloads: toCms({ title: downloads.title, description: downloads.description }),
  });
}

export async function seedAbout(payload: Payload) {
  await seedGlobal(payload, "about", (doc) => (doc.page as { title?: string } | undefined)?.title, {
    page: toCms(aboutPage),
    ceoMessage: toCms(ceoMessage),
    businessDirection: toCms({
      ...businessDirection,
      titleLines: businessDirection.titleLines.map((phrases) => ({ phrases })),
    }),
    coreChallenges: toCms(coreChallenges),
    companyValues: toCms(companyValues),
  });
}

export async function seedSolutions(payload: Payload) {
  const { services, detailOrder, ...axRest } = axInfra;
  void detailOrder;
  await seedGlobal(payload, "solutions", (doc) => (doc.page as { title?: string } | undefined)?.title, {
    page: toCms(solutionsPage),
    axInfra: toCms({
      ...axRest,
      services: axInfra.detailOrder.map((id) => ({ id, ...services[id] })),
    }),
    learningService: toCms(learningService),
  });
}

const MIME: Record<string, string> = { ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };

async function uploadLogo(payload: Payload, name: string, src: string) {
  const filePath = path.join(process.cwd(), "public", src);
  const data = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const media = await payload.create({
    collection: "media",
    data: { alt: name },
    file: { data, mimetype: MIME[extension] ?? "application/octet-stream", name: path.basename(filePath), size: data.length },
  });
  return media.id;
}

export async function seedPartnerStrategy(payload: Payload) {
  if (await isFilled(payload, "partner-strategy", (doc) => (doc.page as { title?: string } | undefined)?.title)) {
    return log("partner-strategy: 이미 있어 건너뜁니다.");
  }

  const logos = [];
  for (const logo of partnerLogos.logos) {
    const image = await uploadLogo(payload, logo.name, logo.src);
    logos.push({ name: logo.name, image, width: logo.width, height: logo.height, visible: logo.visible });
  }

  await payload.updateGlobal({
    slug: "partner-strategy",
    data: {
      page: toCms(partnerStrategyPage),
      cooperationModels: toCms(cooperationModels),
      toBeStrategy: toCms(toBeStrategy),
      partnershipBenefits: toCms(partnershipBenefits),
      customerProposals: toCms(customerProposals),
      proposal: toCms({
        title: proposal.title,
        brands: proposal.brands.map(({ description, name }) => ({ description, name })),
        cards: proposal.cards.map(({ id, audience, title, lead, body, download }) => ({
          id,
          audience,
          title,
          lead,
          body,
          download: { label: download.label, ariaLabel: download.ariaLabel },
        })),
        contact: { label: proposal.contact.label },
      }),
      partnerLogos: {
        enabled: partnerLogos.enabled,
        title: partnerLogos.title,
        ariaLabel: partnerLogos.ariaLabel,
        logos,
      },
    },
  } as never);
  log("partner-strategy: 만들었습니다.");
}
