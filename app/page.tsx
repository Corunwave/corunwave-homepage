import HeroSection from "./_components/home/HeroSection";
import ProposalTargetsSection from "./_components/home/ProposalTargetsSection";
import ServiceValueSection from "./_components/home/ServiceValueSection";
import DownloadsSection from "./_components/home/DownloadsSection";
import {
  downloads,
  homeHero,
  proposalTargets,
  serviceValues,
} from "./_content/home";

export default function Home() {
  return (
    <>
      <HeroSection content={homeHero} />
      <ProposalTargetsSection content={proposalTargets} />
      <ServiceValueSection content={serviceValues} />
      <DownloadsSection content={downloads} />
    </>
  );
}
