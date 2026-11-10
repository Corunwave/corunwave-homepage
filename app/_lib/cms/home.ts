import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import {
  downloads as fixedDownloads,
  homeHero as fixedHero,
  proposalTargets as fixedProposalTargets,
  serviceValues as fixedServiceValues,
  solutions as fixedSolutions,
  type DownloadsContent,
  type HomeHeroContent,
  type ProposalCardContent,
  type ProposalTargetsContent,
  type ServiceValuesContent,
  type SolutionsContent,
} from "@/app/_content/home";
import { getCms } from "./getCms";
import { mergeById, normalize } from "./normalize";
import { getDownloadItems } from "./documents";

type RawHome = {
  hero?: HomeHeroContent;
  proposalTargets?: Omit<ProposalTargetsContent, "cards"> & {
    cards: (Omit<ProposalCardContent, "modifier"> & { id: ProposalCardContent["modifier"] })[];
  };
  solutions?: SolutionsContent;
  serviceValues?: ServiceValuesContent;
  downloads?: Omit<DownloadsContent, "items">;
};

const getHomeBase = unstable_cache(
  async () => {
    const payload = await getCms();
    const doc = normalize<RawHome>(await payload.findGlobal({ slug: "home", depth: 0 }));

    const proposalTargets: ProposalTargetsContent = {
      ...fixedProposalTargets,
      ...doc.proposalTargets,
      cards: (doc.proposalTargets?.cards ?? []).map(({ id, ...card }) => ({ ...card, modifier: id })),
    };

    const serviceValues: ServiceValuesContent = {
      ...fixedServiceValues,
      ...doc.serviceValues,
      values: mergeById(
        doc.serviceValues?.values ?? [],
        fixedServiceValues.values,
      ),
    };

    return {
      hero: { ...fixedHero, ...doc.hero },
      proposalTargets,
      solutions: { ...fixedSolutions, ...doc.solutions } as SolutionsContent,
      serviceValues,
      downloads: { ...fixedDownloads, ...doc.downloads },
    };
  },
  ["cms-home"],
  { tags: [CMS_TAGS.home] },
);

export async function getHomeContent() {
  const [base, items] = await Promise.all([getHomeBase(), getDownloadItems()]);
  return { ...base, downloads: { ...base.downloads, items } satisfies DownloadsContent };
}
