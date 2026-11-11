import {
  extractContentImages,
  type NewsContentImage,
} from "@/payload/lib/newsContent";
import {
  NEWS_PLACEHOLDER_IMAGE,
  NEWS_TAG_LABEL,
  type NewsTag,
} from "@/app/_lib/news/newsRules";
import { httpClient } from "./httpClient";

/* Payload REST(/api/news)를 그대로 호출하고, 응답을 화면용 타입으로 바꾼다. */

type MediaDoc = { id: number | string; url?: string | null; alt?: string | null };

type NewsDoc = {
  id: number;
  title: string;
  summary?: string | null;
  content?: unknown;
  tag: NewsTag;
  thumbnail?: MediaDoc | number | string | null;
  publishedAt?: string | null;
  updatedAt: string;
  _status?: "draft" | "published";
  seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
};

type PayloadList = {
  docs: NewsDoc[];
  totalDocs: number;
  totalPages: number;
  page: number;
};

export type NewsListItem = {
  id: number;
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
const toItem = (doc: NewsDoc): NewsListItem => ({
  id: doc.id,
  title: doc.title,
  summary: doc.summary ?? null,
  tag: doc.tag,
  tagLabel: NEWS_TAG_LABEL[doc.tag],
  thumbnailUrl:
    (typeof doc.thumbnail === "object" && doc.thumbnail?.url) ||
    NEWS_PLACEHOLDER_IMAGE,
  publishedAt: doc.publishedAt ?? null,
});

const toDetail = (doc: NewsDoc): NewsDetail => ({
  ...toItem(doc),
  content: doc.content,
  images: extractContentImages(doc.content),
  status: doc._status ?? "published",
  updatedAt: doc.updatedAt,
});

export const fetchNewsList = async (params: {
  page?: number;
  limit?: number;
  tag?: NewsTag;
}): Promise<NewsList> => {
  const { data } = await httpClient.get<PayloadList>("/news", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 9,
      sort: "-publishedAt",
      depth: 1,
      ...(params.tag ? { "where[tag][equals]": params.tag } : {}),
    },
  });
  return {
    items: data.docs.map(toItem),
    page: data.page,
    totalPages: data.totalPages,
    totalDocs: data.totalDocs,
  };
};

export const fetchNews = async (id: number): Promise<NewsDetail> => {
  const { data } = await httpClient.get<NewsDoc>(`/news/${id}`, {
    params: { depth: 2 },
  });
  return toDetail(data);
};

/* 쓰기는 관리자에 로그인한 대표·에디터의 세션 쿠키가 필요하다. */
export const postNews = async (payload: NewsPayload): Promise<NewsDetail> => {
  const { data } = await httpClient.post<{ doc: NewsDoc }>("/news", payload);
  return toDetail(data.doc);
};

export const patchNews = async (
  id: number,
  payload: Partial<NewsPayload>,
): Promise<NewsDetail> => {
  const { data } = await httpClient.patch<{ doc: NewsDoc }>(
    `/news/${id}`,
    payload,
  );
  return toDetail(data.doc);
};

export const deleteNews = async (id: number) => {
  await httpClient.delete(`/news/${id}`);
};

/* Payload 400 응답({ errors: [{ data: { errors: [{ path, message }] } }] })을 필드별 메시지로 바꾼다. */
export type NewsFieldErrors = Record<string, string>;

export const toNewsFieldErrors = (body: unknown): NewsFieldErrors => {
  const result: NewsFieldErrors = {};
  const errors = (
    body as {
      errors?: { data?: { errors?: { path?: string; message?: string }[] } }[];
    }
  )?.errors;
  errors?.forEach((e) =>
    e.data?.errors?.forEach((f) => {
      if (f.path && f.message) result[f.path] = f.message;
    }),
  );
  return result;
};
