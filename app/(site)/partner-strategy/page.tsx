import type { Metadata } from "next";
import { sharedOpenGraph } from "@/app/_lib/metadata";
import ContactCta from "@/app/_components/commons/cta/ContactCta";
import PageHero from "@/app/_components/commons/hero/PageHero";
import CooperationModelsSection from "@/app/_components/partner-strategy/CooperationModelsSection";
import CustomerProposalsSection from "@/app/_components/partner-strategy/CustomerProposalsSection";
import PartnerLogosSection from "@/app/_components/partner-strategy/PartnerLogosSection";
import PartnershipBenefitsSection from "@/app/_components/partner-strategy/PartnershipBenefitsSection";
import ProposalSection from "@/app/_components/partner-strategy/ProposalSection";
import ToBeStrategySection from "@/app/_components/partner-strategy/ToBeStrategySection";
import { getPartnerStrategyContent } from "@/app/_lib/cms/partnerStrategy";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPartnerStrategyContent();
  return {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
    openGraph: {
      ...sharedOpenGraph,
      title: page.openGraphTitle,
      description: page.description,
    },
  };
}

export default async function PartnerStrategyPage() {
  const {
    page,
    cooperationModels,
    toBeStrategy,
    partnershipBenefits,
    customerProposals,
    proposal,
    partnerLogos,
  } = await getPartnerStrategyContent();

  return (
    <main>
      <PageHero title={page.title} description={page.description} descriptionSize="compact" />
      <CooperationModelsSection content={cooperationModels} />
      <ToBeStrategySection content={toBeStrategy} />
      <PartnershipBenefitsSection content={partnershipBenefits} />
      <CustomerProposalsSection content={customerProposals} />
      <ProposalSection content={proposal} />
      <PartnerLogosSection content={partnerLogos} />
      <ContactCta />
    </main>
  );
}
