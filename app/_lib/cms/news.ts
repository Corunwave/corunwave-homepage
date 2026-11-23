import "server-only";
import { unstable_cache } from "next/cache";
import type { Where } from "payload";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import { toItem, type NewsDoc, type NewsList, type NewsListItem } from "@/app/_lib/news/newsMapper";
import { NEWS_PAGE_SIZE, type NewsTag } from "@/app/_lib/news/newsRules";
import { getCms } from "./getCms";

/* 공개 조건: 게시됨 + 게시 시각이 지난 글. Local API는 access를 건너뛰므로 직접 건다. */
const visibleWhere = (): Where => ({
  and: [
    { _status: { equals: "published" } },
    { publishedAt: { less_than_equal: new Date().toISOString() } },
  ],
});

type ListParams = { page?: number; limit?: number; tag?: NewsTag; q?: string };

// 예약 게시(publishedAt이 미래)는 job queue가 없으므로, 5분마다 캐시를 갱신해 시각이 지나면 나타나게 한다.
export const getNewsList = unstable_cache(
  async ({ page = 1, limit = NEWS_PAGE_SIZE, tag, q }: ListParams): Promise<NewsList> => {
    const payload = await getCms();
    const where: Where = {
      and: [
        visibleWhere(),
        ...(tag ? [{ tag: { equals: tag } }] : []),
        ...(q ? [{ title: { like: q } }] : []),
      ],
    };
    const result = await payload.find({
      collection: "news",
      where,
      sort: "-publishedAt",
      page,
      limit,
      depth: 1,
      draft: false,
    });
    return {
      items: (result.docs as unknown as NewsDoc[]).map(toItem),
      page: result.page ?? page,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs,
    };
  },
  ["cms-news-list"],
  { tags: [CMS_TAGS.news], revalidate: 300 },
);

/* 홈 '소식' 섹션용 최신 글. */
export const getLatestNews = async (limit: number): Promise<NewsListItem[]> =>
  (await getNewsList({ page: 1, limit })).items;
