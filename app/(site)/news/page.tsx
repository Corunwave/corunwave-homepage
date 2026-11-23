import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { sharedOpenGraph } from "@/app/_lib/metadata";
import PageHero from "@/app/_components/commons/hero/PageHero";
import NewsList from "@/app/_components/news/NewsList";
import { getNewsList } from "@/app/_lib/cms/news";
import { newsKeys } from "@/app/_lib/news/newsQueries";
import { isNewsTag, NEWS_PAGE_SIZE } from "@/app/_lib/news/newsRules";

const title = "소식";
const description = "코런웨이브의 새로운 소식을 확인해보세요.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...sharedOpenGraph,
    title: `${title} · 코런웨이브`,
    description,
  },
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/* 요청한 필터의 첫 화면을 서버에서 받아 클라이언트 캐시에 채운다. 이후 이동은 TanStack Query가 처리한다. */
export default async function NewsPage({ searchParams }: PageProps<"/news">) {
  const params = await searchParams;
  const rawTag = first(params.tag);
  const tag = isNewsTag(rawTag) ? rawTag : undefined;
  const q = first(params.q)?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(first(params.page) ?? "1", 10) || 1);

  const client = new QueryClient();
  try {
    const list = await getNewsList({ page, limit: NEWS_PAGE_SIZE, tag, q });
    const filter = { tag, q };
    client.setQueryData(newsKeys.page(filter, page), list);
    if (page === 1) client.setQueryData(newsKeys.infinite(filter), { pages: [list], pageParams: [1] });
  } catch {
    // 서버에서 못 받아도 클라이언트가 직접 요청한다.
  }

  return (
    <main>
      <PageHero title={title} description={description} />
      <section className="news-list-section" aria-label="소식 목록">
        <HydrationBoundary state={dehydrate(client)}>
          <NewsList />
        </HydrationBoundary>
      </section>
    </main>
  );
}
