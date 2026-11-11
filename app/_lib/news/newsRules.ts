/* 소식 공용 상수. payload/collections/News.ts의 maxLength·tag 옵션과 같은 값을 유지한다. */
export const NEWS_TITLE_MAX = 50;

export const NEWS_TAGS = [
  { value: "internal", label: "사내소식" },
  { value: "external", label: "사외소식" },
  { value: "tech", label: "기술소식" },
] as const;

export type NewsTag = (typeof NEWS_TAGS)[number]["value"];

export const NEWS_TAG_LABEL: Record<NewsTag, string> = {
  internal: "사내소식",
  external: "사외소식",
  tech: "기술소식",
};

export const NEWS_PLACEHOLDER_IMAGE = "/images/news-placeholder.svg";
