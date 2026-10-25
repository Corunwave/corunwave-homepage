import type { Metadata } from "next";
import ContactCta from "../_components/commons/cta/ContactCta";
import PageHero from "../_components/commons/hero/PageHero";
import CollaborationProcessSection from "../_components/partner-strategy/CollaborationProcessSection";
import CooperationModelsSection from "../_components/partner-strategy/CooperationModelsSection";
import CustomerProposalsSection from "../_components/partner-strategy/CustomerProposalsSection";
import PartnerLogosSection from "../_components/partner-strategy/PartnerLogosSection";
import PartnershipBenefitsSection from "../_components/partner-strategy/PartnershipBenefitsSection";
import UniversityProposalSection from "../_components/partner-strategy/UniversityProposalSection";
import {
  collaborationProcess,
  cooperationModels,
  customerProposals,
  partnerLogos,
  partnerStrategyPage,
  partnershipBenefits,
  universityProposal,
} from "../_content/partner-strategy";

export const metadata: Metadata = {
  title: partnerStrategyPage.title,
  description: partnerStrategyPage.description,
  keywords: [...partnerStrategyPage.keywords],
  openGraph: {
    title: partnerStrategyPage.openGraphTitle,
    description: partnerStrategyPage.description,
    type: "website",
    locale: "ko_KR",
  },
};

export default function PartnerStrategyPage() {
  return (
    <main>
      <PageHero
        title={partnerStrategyPage.title}
        description={partnerStrategyPage.description}
        descriptionSize="compact"
      />
      <CooperationModelsSection content={cooperationModels} />
      <CustomerProposalsSection content={customerProposals} />
      <CollaborationProcessSection content={collaborationProcess} />
      <PartnershipBenefitsSection content={partnershipBenefits} />
      <UniversityProposalSection content={universityProposal} />
      <PartnerLogosSection content={partnerLogos} />
      <ContactCta />
    </main>
  );
}
