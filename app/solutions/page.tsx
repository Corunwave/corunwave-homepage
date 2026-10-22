import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "../_components/commons/hero/PageHero";
import ContactCta from "../_components/commons/cta/ContactCta";
import SolutionOverviewSection from "../_components/solutions/SolutionOverviewSection";
import SolutionServicesSection, {
  SolutionServicesFallback,
} from "../_components/solutions/SolutionServicesSection";

const description =
  "인프라 설계부터 운영과 조달,인재 육성에 이르기까지 단절 없는 End-to-End 서비스 가치를 창출합니다.";

export const metadata: Metadata = {
  title: "솔루션",
  description,
};

export default function SolutionsPage() {
  return (
    <main>
      <PageHero title="솔루션" description={description} />
      <SolutionOverviewSection />
      <Suspense fallback={<SolutionServicesFallback />}>
        <SolutionServicesSection />
      </Suspense>
      <ContactCta />
    </main>
  );
}
