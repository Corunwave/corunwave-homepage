/* 소식 공용 상수. payload/collections/News.ts의 maxLength·tag 옵션과 같은 값을 유지한다. */
export const NEWS_TITLE_MAX = 50;

export const NEWS_TAGS = [
  { value: "internal", label: "사내소식" },
  { value: "tech", label: "기술소식" },
] as const;

export type NewsTag = (typeof NEWS_TAGS)[number]["value"];

export const NEWS_TAG_LABEL: Record<NewsTag, string> = {
  internal: "사내소식",
  tech: "기술소식",
};

export const NEWS_PLACEHOLDER_IMAGE = "/images/news-placeholder.svg";

/* 목록 한 페이지 개수(데스크탑 3열 x 4행). 태블릿·모바일 무한 스크롤도 같은 단위로 불러온다. */
export const NEWS_PAGE_SIZE = 12;

export const isNewsTag = (value: unknown): value is NewsTag =>
  NEWS_TAGS.some((tag) => tag.value === value);
