"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/_components/commons/pagination/Pagination";
import SearchInput from "@/app/_components/commons/search/SearchInput";
import Tabs, { type TabItem } from "@/app/_components/commons/tabs/Tabs";
import NewsCard from "@/app/_components/news/NewsCard";
import { useNewsInfinite } from "@/app/_hooks/useNewsInfinite";
import { useNewsPage } from "@/app/_hooks/useNewsPage";
import { isNewsTag, NEWS_TAGS, type NewsTag } from "@/app/_lib/news/newsRules";
import type { NewsListItem } from "@/app/_lib/news/newsMapper";

type TabValue = "all" | NewsTag;

const TAB_ITEMS: readonly TabItem<TabValue>[] = [{ value: "all", label: "전체" }, ...NEWS_TAGS];

/* 태블릿·모바일은 무한 스크롤, 데스크탑은 페이지네이션. globals.css의 1024px 브레이크포인트와 같다. */
const COMPACT_QUERY = "(width <= 1024px)";

const subscribeCompact = (notify: () => void) => {
  const media = window.matchMedia(COMPACT_QUERY);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const useIsCompact = () =>
  useSyncExternalStore(subscribeCompact, () => window.matchMedia(COMPACT_QUERY).matches, () => false);

/* tag·q·page를 주소와 동기화한다. history API는 서버 왕복 없이 useSearchParams를 갱신한다. */
const useNewsParams = () => {
  const params = useSearchParams();
  const rawTag = params.get("tag");
  const tag = isNewsTag(rawTag) ? rawTag : undefined;
  const q = params.get("q")?.trim() ?? "";
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);

  const update = useCallback(
    (next: { tag?: NewsTag; q?: string; page?: number }, mode: "push" | "replace" = "push") => {
      const search = new URLSearchParams(window.location.search);
      const set = (key: string, value: string | undefined) =>
        value ? search.set(key, value) : search.delete(key);
      if ("tag" in next) set("tag", next.tag);
      if ("q" in next) set("q", next.q);
      set("page", next.page && next.page > 1 ? String(next.page) : undefined);
      const url = `${window.location.pathname}${search.size ? `?${search}` : ""}`;
      window.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
    },
    [],
  );

  return { tag, q, page, update };
};

const SkeletonGrid = () => (
  <>
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="news-card news-card--skeleton" aria-hidden="true">
        <div className="news-card__thumb" />
        <div className="news-card__body">
          <p className="news-card__tag">&nbsp;</p>
          <h3 className="news-card__title">&nbsp;</h3>
        </div>
      </div>
    ))}
  </>
);

const NewsList = () => {
  const { tag, q, page, update } = useNewsParams();
  const compact = useIsCompact();
  const filter = { tag, q: q || undefined };

  const paged = useNewsPage(filter, page, !compact);
  const infinite = useNewsInfinite(filter, compact);

  const items: NewsListItem[] = compact
    ? (infinite.data?.pages.flatMap((p) => p.items) ?? [])
    : (paged.data?.items ?? []);
  const active = compact ? infinite : paged;
  const loading = active.isPending;
  const failed = active.isError && items.length === 0;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = infinite;
  const loadedPages = infinite.data?.pages.length ?? 0;
  useEffect(() => {
    const target = sentinelRef.current;
    if (!compact || !target || !hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [compact, hasNextPage, isFetchingNextPage, fetchNextPage, loadedPages]);

  const handleSearch = useCallback((value: string) => update({ q: value || undefined, page: 1 }, "replace"), [update]);

  return (
    <div className="news-list">
      <div className="news-toolbar">
        <Tabs
          items={TAB_ITEMS}
          value={tag ?? "all"}
          ariaLabel="소식 분류"
          controls="news-grid"
          onChange={(value) => update({ tag: value === "all" ? undefined : value, page: 1 })}
        />
        <SearchInput value={q} onSearch={handleSearch} label="소식 제목 검색" placeholder="제목으로 검색" />
      </div>

      <div id="news-grid" role="tabpanel" className="news-grid" aria-busy={active.isFetching}>
        {loading && <SkeletonGrid />}
        {items.map((item, index) => (
          <NewsCard key={item.id} item={item} priority={index < 3} />
        ))}
      </div>

      {failed && (
        <div className="news-status" role="alert">
          <p>소식을 불러오지 못했습니다.</p>
          <button type="button" className="news-status__retry" onClick={() => active.refetch()}>
            다시 시도
          </button>
        </div>
      )}
      {!loading && !failed && items.length === 0 && (
        <p className="news-status">{q ? `‘${q}’에 해당하는 소식이 없습니다.` : "등록된 소식이 없습니다."}</p>
      )}

      {compact ? (
        <>
          <div ref={sentinelRef} className="news-sentinel" aria-hidden="true" />
          {isFetchingNextPage && <p className="news-status">불러오는 중…</p>}
        </>
      ) : (
        <div className="news-pagination">
          <Pagination
            page={page}
            totalPages={paged.data?.totalPages ?? 1}
            onChange={(next) => {
              update({ page: next });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsList;
