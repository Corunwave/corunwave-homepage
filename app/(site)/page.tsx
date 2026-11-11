import HeroSection from "@/app/_components/home/HeroSection";
import ProposalTargetsSection from "@/app/_components/home/ProposalTargetsSection";
import SolutionsSection from "@/app/_components/home/SolutionsSection";
import ServiceValueSection from "@/app/_components/home/ServiceValueSection";
import DownloadsSection from "@/app/_components/home/DownloadsSection";
import { getHomeContent } from "@/app/_lib/cms/home";

export default async function Home() {
  const { hero, proposalTargets, solutions, serviceValues, downloads } = await getHomeContent();

  return (
    <>
      <HeroSection content={hero} />
      <ProposalTargetsSection content={proposalTargets} />
      <SolutionsSection content={solutions} />
      <ServiceValueSection content={serviceValues} />
      <DownloadsSection content={downloads} />
    </>
  );
}
