import type { Metadata } from "next";
import BusinessDirectionSection from "@/app/_components/about/BusinessDirectionSection";
import CeoMessageSection from "@/app/_components/about/CeoMessageSection";
import CompanyValuesSection from "@/app/_components/about/CompanyValuesSection";
import CoreChallengesSection from "@/app/_components/about/CoreChallengesSection";
import PageHero from "@/app/_components/commons/hero/PageHero";
import { getAboutContent } from "@/app/_lib/cms/about";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getAboutContent();
  return { title: page.title, description: page.description };
}

export default async function AboutPage() {
  const { page, ceoMessage, businessDirection, coreChallenges, companyValues } =
    await getAboutContent();

  return (
    <main>
      <PageHero title={page.title} description={page.description} />
      <CeoMessageSection content={ceoMessage} />
      <BusinessDirectionSection content={businessDirection} />
      <CoreChallengesSection content={coreChallenges} />
      <CompanyValuesSection content={companyValues} />
    </main>
  );
}
