"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNewsPage, newsKeys, type NewsFilter } from "@/app/_lib/news/newsQueries";

/* 데스크탑 페이지네이션용. 페이지를 옮기는 동안 이전 목록을 유지하고, 한 번 본 페이지는 캐시에서 바로 보여준다. */
export const useNewsPage = (filter: NewsFilter, page: number, enabled = true) =>
  useQuery({
    queryKey: newsKeys.page(filter, page),
    queryFn: () => fetchNewsPage(filter, page),
    placeholderData: keepPreviousData,
    enabled,
  });
