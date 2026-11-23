import { fetchNewsList } from "@/app/_lib/api/newsApi";
import type { NewsList } from "@/app/_lib/news/newsMapper";
import { NEWS_PAGE_SIZE, type NewsTag } from "@/app/_lib/news/newsRules";

export type NewsFilter = { tag?: NewsTag; q?: string };

/* 데스크탑 페이지 단위와 모바일 무한 스크롤이 같은 필터 키 아래에서 갈라진다. */
export const newsKeys = {
  all: ["news"] as const,
  page: (filter: NewsFilter, page: number) => ["news", "page", filter.tag ?? "", filter.q ?? "", page] as const,
  infinite: (filter: NewsFilter) => ["news", "infinite", filter.tag ?? "", filter.q ?? ""] as const,
};

export const fetchNewsPage = (filter: NewsFilter, page: number): Promise<NewsList> =>
  fetchNewsList({ ...filter, page, limit: NEWS_PAGE_SIZE });
