import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import { getCms } from "./getCms";

export type DownloadItem = { href: string; label: string };

type DocumentDoc = {
  url?: string | null;
  label: string;
  downloadName?: string | null;
  slot?: string | null;
};

const toHref = ({ url, downloadName }: { url: string; downloadName?: string | null }) =>
  downloadName ? `${url}?download=${encodeURIComponent(downloadName)}` : url;

// 공개 버킷은 `?download=`를 붙이면 attachment로 응답해 페이지를 벗어나지 않고 저장된다.
export const getDownloadItems = unstable_cache(
  async (): Promise<DownloadItem[]> => {
    const payload = await getCms();
    const { docs } = await payload.find({
      collection: "documents",
      where: { isPublished: { equals: true } },
      sort: "sortOrder",
      limit: 50,
      depth: 0,
    });

    return (docs as unknown as DocumentDoc[])
      .filter((doc): doc is DocumentDoc & { url: string } => Boolean(doc.url))
      .map((doc) => ({ href: toHref(doc), label: doc.label }));
  },
  ["cms-download-items"],
  { tags: [CMS_TAGS.documents] },
);

export type DocumentSlot = "companyProfile" | "universityPortfolio" | "enterprisePortfolio";

/* `구분`이 지정된 자료의 다운로드 주소. 공개 여부와 무관하게 구분으로 찾는다. */
export const getDocumentLinks = unstable_cache(
  async (): Promise<Partial<Record<DocumentSlot, string>>> => {
    const payload = await getCms();
    const { docs } = await payload.find({
      collection: "documents",
      where: { slot: { in: ["companyProfile", "universityPortfolio", "enterprisePortfolio"] } },
      limit: 10,
      depth: 0,
    });

    const links: Partial<Record<DocumentSlot, string>> = {};
    for (const doc of docs as unknown as DocumentDoc[]) {
      if (doc.url && doc.slot) links[doc.slot as DocumentSlot] = toHref({ url: doc.url, downloadName: doc.downloadName });
    }
    return links;
  },
  ["cms-document-links"],
  { tags: [CMS_TAGS.documents] },
);
