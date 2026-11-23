"use client";

import { useEffect, useState, type FormEvent } from "react";

type SearchInputProps = {
  /** Committed query. Outside changes (e.g. browser back) overwrite the draft. */
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  label: string;
  /** Debounce before typing triggers a search. Enter searches immediately. */
  delay?: number;
};

/* Shared search field: debounced auto-search, Enter to search now, × to clear. */
const SearchInput = ({
  value,
  onSearch,
  placeholder,
  label,
  delay = 300,
}: SearchInputProps) => {
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }

  useEffect(() => {
    const query = draft.trim();
    if (query === value) return;
    const timer = setTimeout(() => onSearch(query), delay);
    return () => clearTimeout(timer);
  }, [draft, value, delay, onSearch]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(draft.trim());
  };

  const handleClear = () => {
    setDraft("");
    onSearch("");
  };

  return (
    <form className="search-input" role="search" onSubmit={handleSubmit}>
      <input
        className="search-input__field"
        type="search"
        value={draft}
        placeholder={placeholder}
        aria-label={label}
        onChange={(event) => setDraft(event.target.value)}
      />
      {draft && (
        <button
          type="button"
          className="search-input__clear"
          aria-label="검색어 지우기"
          onClick={handleClear}
        >
          ×
        </button>
      )}
      <button type="submit" className="search-input__submit" aria-label="검색">
        <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false">
          <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;
