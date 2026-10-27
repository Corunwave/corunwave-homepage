import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "../_components/commons/hero/PageHero";
import ContactCta from "../_components/commons/cta/ContactCta";
import SolutionOverviewSection from "../_components/solutions/SolutionOverviewSection";
import SolutionServicesSection, {
  SolutionServicesFallback,
} from "../_components/solutions/SolutionServicesSection";
import {
  solutionOverview,
  solutionServices,
  solutionsPage,
} from "../_content/solutions";

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
      <SolutionOverviewSection content={solutionOverview} />
      <Suspense fallback={<SolutionServicesFallback content={solutionServices} />}>
        <SolutionServicesSection content={solutionServices} />
      </Suspense>
      <ContactCta />
    </main>
  );
}
