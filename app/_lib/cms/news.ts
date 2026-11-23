import "server-only";
import { unstable_cache } from "next/cache";
import type { Where } from "payload";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import { toItem, type AttachmentDoc, type NewsDoc, type NewsList, type NewsListItem } from "@/app/_lib/news/newsMapper";
import { NEWS_PAGE_SIZE, type NewsTag } from "@/app/_lib/news/newsRules";
import { isDraftMode } from "./draft";
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

export type NewsAttachment = { id: string; name: string; href: string; size: number | null };

export type NewsArticle = NewsListItem & {
  content: unknown;
  attachments: NewsAttachment[];
};

export type NewsNeighbor = { slug: string; title: string };

const toAttachment = (doc: AttachmentDoc): NewsAttachment | null => {
  if (!doc.url) return null;
  const name = doc.downloadName || doc.filename || "첨부파일";
  // 공개 버킷은 `?download=`를 붙이면 attachment로 응답해 원래 이름으로 저장된다.
  return { id: String(doc.id), name, href: `${doc.url}?download=${encodeURIComponent(name)}`, size: doc.filesize ?? null };
};

const toArticle = (doc: NewsDoc): NewsArticle => ({
  ...toItem(doc),
  content: doc.content,
  attachments: (doc.attachments ?? [])
    .filter((file): file is AttachmentDoc => typeof file === "object" && file !== null)
    .map(toAttachment)
    .filter((file): file is NewsAttachment => file !== null),
});

const getArticleBase = unstable_cache(
  async (slug: string, draft: boolean): Promise<NewsArticle | null> => {
    const payload = await getCms();
    const result = await payload.find({
      collection: "news",
      where: { and: [{ slug: { equals: slug } }, ...(draft ? [] : [visibleWhere()])] },
      limit: 1,
      depth: 2,
      draft,
    });
    const doc = result.docs[0] as unknown as NewsDoc | undefined;
    return doc ? toArticle(doc) : null;
  },
  ["cms-news-article"],
  { tags: [CMS_TAGS.news], revalidate: 300 },
);

export const getNewsBySlug = async (slug: string) => getArticleBase(slug, await isDraftMode());

type Neighbors = { older: NewsNeighbor | null; newer: NewsNeighbor | null };

const getNeighborsBase = unstable_cache(
  async (publishedAt: string): Promise<Neighbors> => {
    const payload = await getCms();
    const pick = async (operator: "less_than" | "greater_than", sort: string) => {
      const result = await payload.find({
        collection: "news",
        where: { and: [visibleWhere(), { publishedAt: { [operator]: publishedAt } }] },
        sort,
        limit: 1,
        depth: 0,
        draft: false,
      });
      const doc = result.docs[0] as unknown as NewsDoc | undefined;
      return doc ? { slug: doc.slug ?? String(doc.id), title: doc.title } : null;
    };
    const [older, newer] = await Promise.all([pick("less_than", "-publishedAt"), pick("greater_than", "publishedAt")]);
    return { older, newer };
  },
  ["cms-news-neighbors"],
  { tags: [CMS_TAGS.news], revalidate: 300 },
);

/* 발행일 기준 이전글(더 오래된 글)과 다음글(더 최근 글). */
export const getNewsNeighbors = async (publishedAt: string | null): Promise<Neighbors> =>
  publishedAt ? getNeighborsBase(publishedAt) : { older: null, newer: null };
