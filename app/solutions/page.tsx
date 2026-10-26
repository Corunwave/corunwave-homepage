import type { Metadata } from "next";
import PageHero from "../_components/commons/hero/PageHero";
import ContactCta from "../_components/commons/cta/ContactCta";
import SolutionAXSection from "../_components/solutions/SolutionAXSection";
import SolutionLearningSection from "../_components/solutions/SolutionLearningSection";
import { axInfra, solutionsPage } from "../_content/solutions";

export const metadata: Metadata = {
  title: solutionsPage.title,
  description: solutionsPage.description,
};

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        title={solutionsPage.title}
        description={solutionsPage.description}
      />
      <SolutionAXSection content={axInfra} />
      <SolutionLearningSection />
      <ContactCta />
    </main>
  );
}
