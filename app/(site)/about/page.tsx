import type { Metadata } from "next";
import BusinessDirectionSection from "../_components/about/BusinessDirectionSection";
import CeoMessageSection from "../_components/about/CeoMessageSection";
import CompanyValuesSection from "../_components/about/CompanyValuesSection";
import CoreChallengesSection from "../_components/about/CoreChallengesSection";
import PageHero from "../_components/commons/hero/PageHero";
import {
  aboutPage,
  businessDirection,
  ceoMessage,
  companyValues,
  coreChallenges,
} from "../_content/about";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.description,
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title={aboutPage.title} description={aboutPage.description} />
      <CeoMessageSection content={ceoMessage} />
      <BusinessDirectionSection content={businessDirection} />
      <CoreChallengesSection content={coreChallenges} />
      <CompanyValuesSection content={companyValues} />
    </main>
  );
}
