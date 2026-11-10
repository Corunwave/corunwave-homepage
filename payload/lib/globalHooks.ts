import type { GlobalConfig } from "payload";
import { revalidateCms } from "../hooks/revalidate";

// 글로벌 공통 초안 설정. 자동저장은 초안이며 '발행'해야 사이트에 반영된다.
export const globalVersions: GlobalConfig["versions"] = {
  max: 20,
  drafts: { autosave: { interval: 2000 } },
};

// 자동저장마다 공개 캐시가 비워지지 않도록 발행된 저장에서만 재검증한다.
export const revalidateOnChange = (tag: string): GlobalConfig["hooks"] => ({
  afterChange: [
    ({ doc }) => {
      if (doc?._status === "published") revalidateCms(tag)();
      return doc;
    },
  ],
});
