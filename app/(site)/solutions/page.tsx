import type { Metadata } from "next";
import PageHero from "@/app/_components/commons/hero/PageHero";
import ContactCta from "@/app/_components/commons/cta/ContactCta";
import SolutionAXSection from "@/app/_components/solutions/SolutionAXSection";
import SolutionLearningSection from "@/app/_components/solutions/SolutionLearningSection";
import { getSolutionsContent } from "@/app/_lib/cms/solutions";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getSolutionsContent();
  return { title: page.title, description: page.description };
}

export default async function SolutionsPage() {
  const { page, axInfra, learningService } = await getSolutionsContent();

  return (
    <main>
      <PageHero title={page.title} description={page.description} />
      <SolutionAXSection content={axInfra} />
      <SolutionLearningSection content={learningService} />
      <ContactCta />
    </main>
  );
}
