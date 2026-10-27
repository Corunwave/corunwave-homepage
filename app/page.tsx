import HeroSection from "./_components/home/HeroSection";
import ProposalTargetsSection from "./_components/home/ProposalTargetsSection";
import SolutionsSection from "./_components/home/SolutionsSection";
import ServiceValueSection from "./_components/home/ServiceValueSection";
import DownloadsSection from "./_components/home/DownloadsSection";
import {
  downloads,
  homeHero,
  proposalTargets,
  serviceValues,
  solutions,
} from "./_content/home";

export default function Home() {
  return (
    <>
      <HeroSection content={homeHero} />
      <ProposalTargetsSection content={proposalTargets} />
      <SolutionsSection content={solutions} />
      <ServiceValueSection content={serviceValues} />
      <DownloadsSection content={downloads} />
    </>
  );
}
