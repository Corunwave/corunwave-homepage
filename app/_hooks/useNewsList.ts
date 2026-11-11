"use client";

import { useEffect, useState } from "react";
import { fetchNewsList, type NewsList } from "@/app/_lib/api/newsApi";
import type { NewsTag } from "@/app/_lib/news/newsRules";

export type NewsReadStatus = "loading" | "done" | "failed";

type State = { key: string; status: NewsReadStatus; data: NewsList | null };

/* Loads one page of published news (GET /api/news). Re-fetches when page/limit/tag change. */
export const useNewsList = (params: {
  page?: number;
  limit?: number;
  tag?: NewsTag;
}) => {
  const key = `${params.page ?? 1}:${params.limit ?? 9}:${params.tag ?? ""}`;
  const [state, setState] = useState<State>({ key, status: "loading", data: null });

  useEffect(() => {
    let cancelled = false;
    fetchNewsList(params)
      .then((data) => !cancelled && setState({ key, status: "done", data }))
      .catch(() => !cancelled && setState({ key, status: "failed", data: null }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const stale = state.key !== key;
  return {
    status: stale ? ("loading" as const) : state.status,
    data: stale ? null : state.data,
  };
};
