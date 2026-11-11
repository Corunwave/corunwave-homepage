import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import {
  cooperationModels as fixedCooperationModels,
  customerProposals as fixedCustomerProposals,
  partnerLogos as fixedPartnerLogos,
  partnerStrategyPage as fixedPage,
  partnershipBenefits as fixedBenefits,
  proposal as fixedProposal,
  toBeStrategy as fixedToBe,
  type CooperationModelsContent,
  type CustomerProposalsContent,
  type PartnerLogosContent,
  type PartnerStrategyPageContent,
  type PartnershipBenefitsContent,
  type ProposalContent,
  type ToBeStrategyContent,
} from "@/app/_content/partner-strategy";
import { getCms } from "./getCms";
import { isDraftMode } from "./draft";
import { getDocumentLinks } from "./documents";
import { getSiteSettings } from "./site";
import { mergeById, normalize } from "./normalize";

type RawPartnerStrategy = {
  page?: PartnerStrategyPageContent;
  cooperationModels?: Omit<CooperationModelsContent, "roles"> & {
    roles: Omit<CooperationModelsContent["roles"][number], "accent">[];
  };
  toBeStrategy?: ToBeStrategyContent;
  partnershipBenefits?: PartnershipBenefitsContent;
  customerProposals?: CustomerProposalsContent;
  proposal?: {
    title: string;
    brands: { description: string; name: string }[];
    cards: { id: "university" | "enterprise"; audience: string; title: string; lead: string; body: string; download: { label: string; ariaLabel: string } }[];
    contact: { label: string };
  };
  partnerLogos?: {
    enabled: boolean;
    title: string;
    ariaLabel: string;
    logos: { name: string; image?: { url?: string } | number | null; width: number; height: number; visible: boolean }[];
  };
};

const getPartnerStrategyBase = unstable_cache(
  async (draft: boolean) => {
    const payload = await getCms();
    // 로고 이미지의 주소가 필요하므로 업로드 관계를 한 단계 펼친다.
    const doc = normalize<RawPartnerStrategy>(await payload.findGlobal({ slug: "partner-strategy", depth: 1, draft }));

    const logos: PartnerLogosContent["logos"] = (doc.partnerLogos?.logos ?? []).flatMap((logo, index) => {
      const url = typeof logo.image === "object" && logo.image ? logo.image.url : undefined;
      return url
        ? [{ id: `partner-logo-${index}`, name: logo.name, src: url, width: logo.width, height: logo.height, visible: logo.visible }]
        : [];
    });

    return {
      page: { ...fixedPage, ...doc.page },
      cooperationModels: {
        ...fixedCooperationModels,
        ...doc.cooperationModels,
        roles: mergeById(doc.cooperationModels?.roles ?? [], fixedCooperationModels.roles),
      } as CooperationModelsContent,
      toBeStrategy: {
        ...fixedToBe,
        ...doc.toBeStrategy,
        stages: mergeById(doc.toBeStrategy?.stages ?? [], fixedToBe.stages),
      } as unknown as ToBeStrategyContent,
      partnershipBenefits: {
        ...fixedBenefits,
        ...doc.partnershipBenefits,
        benefits: mergeById(doc.partnershipBenefits?.benefits ?? [], fixedBenefits.benefits),
      } as PartnershipBenefitsContent,
      customerProposals: {
        ...fixedCustomerProposals,
        ...doc.customerProposals,
        proposals: mergeById(doc.customerProposals?.proposals ?? [], fixedCustomerProposals.proposals),
      } as CustomerProposalsContent,
      proposal: doc.proposal,
      partnerLogos: {
        ...fixedPartnerLogos,
        enabled: doc.partnerLogos?.enabled ?? fixedPartnerLogos.enabled,
        title: doc.partnerLogos?.title ?? fixedPartnerLogos.title,
        ariaLabel: doc.partnerLogos?.ariaLabel ?? fixedPartnerLogos.ariaLabel,
        logos,
      } satisfies PartnerLogosContent,
    };
  },
  ["cms-partner-strategy"],
  { tags: [CMS_TAGS.partnerStrategy] },
);

export async function getPartnerStrategyContent() {
  const [base, links, { contactCta }] = await Promise.all([
    getPartnerStrategyBase(await isDraftMode()),
    getDocumentLinks(),
    getSiteSettings(),
  ]);

  const cmsProposal = base.proposal;
  const cardHref = { university: links.universityPortfolio, enterprise: links.enterprisePortfolio } as const;

  const proposal: ProposalContent = {
    title: cmsProposal?.title ?? fixedProposal.title,
    brands: [
      { ...fixedProposal.brands[0], ...cmsProposal?.brands?.[0] },
      { ...fixedProposal.brands[1], ...cmsProposal?.brands?.[1] },
    ],
    cards: fixedProposal.cards.map((fixedCard) => {
      const card = cmsProposal?.cards.find(({ id }) => id === fixedCard.id);
      return {
        ...fixedCard,
        ...card,
        download: { ...fixedCard.download, ...card?.download, href: cardHref[fixedCard.id] },
      };
    }) as unknown as ProposalContent["cards"],
    contact: { label: cmsProposal?.contact.label ?? fixedProposal.contact.label, href: contactCta.href },
  };

  return { ...base, proposal };
}
