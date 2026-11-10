import { revalidateTag } from "next/cache";

export const CMS_TAGS = {
  site: "cms:site",
  typography: "cms:typography",
  legal: "cms:legal",
  documents: "cms:documents",
  news: "cms:news",
  home: "cms:home",
  about: "cms:about",
  solutions: "cms:solutions",
  partnerStrategy: "cms:partner-strategy",
} as const;

// 저장 즉시 반영한다. 시드 스크립트처럼 Next 요청 밖에서 실행되면 던지므로 무시한다.
export const revalidateCms = (tag: string) => () => {
  try {
    revalidateTag(tag, { expire: 0 });
  } catch {
    /* outside a Next.js request (e.g. seed script) */
  }
};
