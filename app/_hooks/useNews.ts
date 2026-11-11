"use client";

import { useEffect, useState } from "react";
import { fetchNews, type NewsDetail } from "@/app/_lib/api/newsApi";
import type { NewsReadStatus } from "./useNewsList";

type State = { id: number; status: NewsReadStatus; data: NewsDetail | null };

/* Loads one news post (GET /api/news/:id). Drafts only resolve for a logged-in CEO/editor. */
export const useNews = (id: number) => {
  const [state, setState] = useState<State>({ id, status: "loading", data: null });

  useEffect(() => {
    let cancelled = false;
    fetchNews(id)
      .then((data) => !cancelled && setState({ id, status: "done", data }))
      .catch(() => !cancelled && setState({ id, status: "failed", data: null }));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const stale = state.id !== id;
  return {
    status: stale ? ("loading" as const) : state.status,
    data: stale ? null : state.data,
  };
};
