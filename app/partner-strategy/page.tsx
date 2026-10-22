import type { Metadata } from "next";
import ContactCta from "../_components/commons/cta/ContactCta";
import PageHero from "../_components/commons/hero/PageHero";
import CollaborationProcessSection from "../_components/partner-strategy/CollaborationProcessSection";
import CooperationModelsSection from "../_components/partner-strategy/CooperationModelsSection";
import CustomerProposalsSection from "../_components/partner-strategy/CustomerProposalsSection";
import PartnerFieldsSection from "../_components/partner-strategy/PartnerFieldsSection";
import PartnerLogosSection from "../_components/partner-strategy/PartnerLogosSection";
import PartnershipBenefitsSection from "../_components/partner-strategy/PartnershipBenefitsSection";
import UniversityProposalSection from "../_components/partner-strategy/UniversityProposalSection";

const description =
  "코런웨이브는 각 분야의 Specialist들이 자신의 전문성을 가장 가치있게 발휘할 수 있는 솔루션 허브를 목표로 협업을 제안합니다.";

export const metadata: Metadata = {
  title: "파트너 전략",
  description,
  keywords: [
    "코런웨이브",
    "파트너 전략",
    "AX Infra",
    "Learning Service",
    "BPO",
    "ITO",
    "협력모델",
  ],
  openGraph: {
    title: "파트너 전략 · 코런웨이브",
    description,
    type: "website",
    locale: "ko_KR",
  },
};

export default function PartnerStrategyPage() {
  return (
    <main>
      <PageHero title="파트너 전략" description={description} />
      <PartnerFieldsSection />
      <CooperationModelsSection />
      <CustomerProposalsSection />
      <CollaborationProcessSection />
      <PartnershipBenefitsSection />
      <UniversityProposalSection />
      <PartnerLogosSection />
      <ContactCta />
    </main>
  );
}
