import HeroSection from "@/app/_components/home/HeroSection";
import ProposalTargetsSection from "@/app/_components/home/ProposalTargetsSection";
import SolutionsSection from "@/app/_components/home/SolutionsSection";
import ServiceValueSection from "@/app/_components/home/ServiceValueSection";
import NewsSection from "@/app/_components/home/NewsSection";
import DownloadsSection from "@/app/_components/home/DownloadsSection";
import { getHomeContent } from "@/app/_lib/cms/home";
import { getLatestNews } from "@/app/_lib/cms/news";

const HOME_NEWS_COUNT = 5;

export default async function Home() {
  const { hero, proposalTargets, solutions, serviceValues, downloads, news } = await getHomeContent();
  // 소식 영역이 꺼져 있으면 목록을 읽지 않고, 켜져 있어도 게시된 글이 없으면 그리지 않는다.
  const latestNews = news.enabled ? await getLatestNews(HOME_NEWS_COUNT).catch(() => []) : [];

  return (
    <>
      <HeroSection content={hero} />
      <ProposalTargetsSection content={proposalTargets} />
      <SolutionsSection content={solutions} />
      <ServiceValueSection content={serviceValues} />
      {latestNews.length > 0 && <NewsSection title={news.title} items={latestNews} />}
      <DownloadsSection content={downloads} />
    </>
  );
}
