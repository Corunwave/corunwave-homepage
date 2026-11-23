"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNewsPage, newsKeys, type NewsFilter } from "@/app/_lib/news/newsQueries";

/* 태블릿·모바일 무한 스크롤용. */
export const useNewsInfinite = (filter: NewsFilter, enabled = true) =>
  useInfiniteQuery({
    queryKey: newsKeys.infinite(filter),
    queryFn: ({ pageParam }) => fetchNewsPage(filter, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
    enabled,
  });
