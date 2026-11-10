import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import {
  axInfra as fixedAxInfra,
  learningService as fixedLearningService,
  solutionsPage as fixedPage,
  type AxInfraContent,
  type AxService,
  type AxServiceId,
  type LearningServiceContent,
  type SolutionsPageContent,
} from "@/app/_content/solutions";
import { getCms } from "./getCms";
import { normalize } from "./normalize";

type RawSolutions = {
  page?: SolutionsPageContent;
  axInfra?: Omit<AxInfraContent, "services" | "detailOrder"> & {
    services: (AxService & { id: AxServiceId })[];
  };
  learningService?: LearningServiceContent;
};

export const getSolutionsContent = unstable_cache(
  async () => {
    const payload = await getCms();
    const doc = normalize<RawSolutions>(await payload.findGlobal({ slug: "solutions", depth: 0 }));

    const services = { ...fixedAxInfra.services };
    for (const { id, map, detail } of doc.axInfra?.services ?? []) {
      services[id] = { map, detail };
    }

    const axInfra: AxInfraContent = {
      ...fixedAxInfra,
      ...doc.axInfra,
      detailOrder: doc.axInfra?.services.map(({ id }) => id) ?? fixedAxInfra.detailOrder,
      services,
    };

    return {
      page: { ...fixedPage, ...doc.page },
      axInfra,
      learningService: { ...fixedLearningService, ...doc.learningService },
    };
  },
  ["cms-solutions"],
  { tags: [CMS_TAGS.solutions] },
);
