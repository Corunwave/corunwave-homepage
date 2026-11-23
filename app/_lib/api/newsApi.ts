import { httpClient } from "./httpClient";
import {
  toDetail,
  toItem,
  type NewsDetail,
  type NewsDoc,
  type NewsList,
  type NewsPayload,
  type PayloadList,
} from "@/app/_lib/news/newsMapper";
import { NEWS_PAGE_SIZE, type NewsTag } from "@/app/_lib/news/newsRules";

export type { NewsDetail, NewsList, NewsListItem, NewsPayload } from "@/app/_lib/news/newsMapper";

/* Payload REST(/api/news)를 그대로 호출하고, 응답을 화면용 타입으로 바꾼다. */

export const fetchNewsList = async (params: {
  page?: number;
  limit?: number;
  tag?: NewsTag;
  q?: string;
}): Promise<NewsList> => {
  const { data } = await httpClient.get<PayloadList>("/news", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? NEWS_PAGE_SIZE,
      sort: "-publishedAt",
      depth: 1,
      ...(params.tag ? { "where[tag][equals]": params.tag } : {}),
      ...(params.q ? { "where[title][like]": params.q } : {}),
    },
  });
  return {
    items: data.docs.map(toItem),
    page: data.page,
    totalPages: data.totalPages,
    totalDocs: data.totalDocs,
  };
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
