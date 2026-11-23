import {
  extractContentImages,
  type NewsContentImage,
} from "@/payload/lib/newsContent";
import {
  NEWS_PLACEHOLDER_IMAGE,
  NEWS_TAG_LABEL,
  type NewsTag,
} from "@/app/_lib/news/newsRules";

/* Payload 문서를 화면용 타입으로 바꾸는 순수 함수. 서버 로더와 브라우저 API가 함께 쓴다. */
export type MediaDoc = { id: number | string; url?: string | null; alt?: string | null };

export type NewsDoc = {
  id: number;
  title: string;
  summary?: string | null;
  content?: unknown;
  tag: NewsTag;
  thumbnail?: MediaDoc | number | string | null;
  publishedAt?: string | null;
  updatedAt: string;
  _status?: "draft" | "published";
  slug?: string | null;
};

export type PayloadList = {
  docs: NewsDoc[];
  totalDocs: number;
  totalPages: number;
  page: number;
};

export type NewsListItem = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  tag: NewsTag;
  tagLabel: string;
  thumbnailUrl: string;
  publishedAt: string | null;
};

export type NewsDetail = NewsListItem & {
  content: unknown;
  images: NewsContentImage[];
  status: "draft" | "published";
  updatedAt: string;
};

export type NewsList = {
  items: NewsListItem[];
  page: number;
  totalPages: number;
  totalDocs: number;
};

export type NewsPayload = {
  title: string;
  content: unknown;
  tag: NewsTag;
  summary?: string;
  thumbnail?: number | null;
  publishedAt?: string | null;
  _status?: "draft" | "published";
};

/* 썸네일이 비어 있으면(본문에도 이미지가 없을 때) placeholder를 쓴다. */
export const toItem = (doc: NewsDoc): NewsListItem => ({
  id: doc.id,
  slug: doc.slug ?? String(doc.id),
  title: doc.title,
  summary: doc.summary ?? null,
  tag: doc.tag,
  tagLabel: NEWS_TAG_LABEL[doc.tag],
  thumbnailUrl:
    (typeof doc.thumbnail === "object" && doc.thumbnail?.url) ||
    NEWS_PLACEHOLDER_IMAGE,
  publishedAt: doc.publishedAt ?? null,
});

export const toDetail = (doc: NewsDoc): NewsDetail => ({
  ...toItem(doc),
  content: doc.content,
  images: extractContentImages(doc.content),
  status: doc._status ?? "published",
  updatedAt: doc.updatedAt,
});

