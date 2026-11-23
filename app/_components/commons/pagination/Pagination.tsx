type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblings?: number;
};

type Entry = number | "gap-start" | "gap-end";

/* 1 … 4 5 6 … 20 — always keeps the first and last page. */
const buildEntries = (page: number, totalPages: number, siblings: number): Entry[] => {
  const from = Math.max(2, page - siblings);
  const to = Math.min(totalPages - 1, page + siblings);
  const entries: Entry[] = [1];
  if (from > 2) entries.push("gap-start");
  for (let n = from; n <= to; n += 1) entries.push(n);
  if (to < totalPages - 1) entries.push("gap-end");
  if (totalPages > 1) entries.push(totalPages);
  return entries;
};

/* Shared numbered pagination. Renders nothing for a single page. */
const Pagination = ({ page, totalPages, onChange, siblings = 1 }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="페이지 이동">
      <button
        type="button"
        className="pagination__step"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </button>
      {buildEntries(page, totalPages, siblings).map((entry) =>
        typeof entry === "string" ? (
          <span key={entry} className="pagination__gap" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            className="pagination__page"
            aria-label={`${entry}페이지`}
            aria-current={entry === page ? "page" : undefined}
            onClick={() => onChange(entry)}
          >
            {entry}
          </button>
        ),
      )}
      <button
        type="button"
        className="pagination__step"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
