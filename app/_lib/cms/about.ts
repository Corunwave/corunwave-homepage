import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import {
  aboutPage as fixedPage,
  businessDirection as fixedBusinessDirection,
  ceoMessage as fixedCeoMessage,
  companyValues as fixedCompanyValues,
  coreChallenges as fixedCoreChallenges,
  type AboutPageContent,
  type BusinessDirectionContent,
  type CeoMessageContent,
  type CompanyValuesContent,
  type CoreChallengesContent,
} from "@/app/_content/about";
import { getCms } from "./getCms";
import { isDraftMode } from "./draft";
import { mergeById, normalize } from "./normalize";

type RawAbout = {
  page?: AboutPageContent;
  ceoMessage?: CeoMessageContent;
  businessDirection?: Omit<BusinessDirectionContent, "titleLines" | "hubLogo"> & {
    titleLines: { phrases: string[] }[];
  };
  coreChallenges?: CoreChallengesContent;
  companyValues?: CompanyValuesContent;
};

const getAboutBase = unstable_cache(
  async (draft: boolean) => {
    const payload = await getCms();
    const doc = normalize<RawAbout>(await payload.findGlobal({ slug: "about", depth: 0, draft }));

    const businessDirection: BusinessDirectionContent = {
      ...fixedBusinessDirection,
      ...doc.businessDirection,
      titleLines: (doc.businessDirection?.titleLines ?? []).map(({ phrases }) => phrases),
      hubLogo: fixedBusinessDirection.hubLogo,
    };

    return {
      page: { ...fixedPage, ...doc.page },
      ceoMessage: { ...fixedCeoMessage, ...doc.ceoMessage },
      businessDirection,
      coreChallenges: {
        ...fixedCoreChallenges,
        ...doc.coreChallenges,
        challenges: mergeById(doc.coreChallenges?.challenges ?? [], fixedCoreChallenges.challenges),
      },
      companyValues: {
        ...fixedCompanyValues,
        ...doc.companyValues,
        values: mergeById(doc.companyValues?.values ?? [], fixedCompanyValues.values),
      },
    };
  },
  ["cms-about"],
  { tags: [CMS_TAGS.about] },
);

export const getAboutContent = async () => getAboutBase(await isDraftMode());
