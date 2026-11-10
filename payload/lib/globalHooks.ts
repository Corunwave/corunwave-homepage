import type { GlobalConfig } from "payload";
import { revalidateCms } from "../hooks/revalidate";

export const revalidateOnChange = (tag: string): GlobalConfig["hooks"] => ({
  afterChange: [
    ({ doc }) => {
      revalidateCms(tag)();
      return doc;
    },
  ],
});
