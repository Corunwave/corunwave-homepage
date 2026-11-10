import "server-only";
import { unstable_cache } from "next/cache";
import { BODY_FONTS, FONT_SCALES, HEADING_FONTS } from "@/payload/globals/Typography";
import { CMS_TAGS } from "@/payload/hooks/revalidate";
import { getCms } from "./getCms";
import { isDraftMode } from "./draft";

export type TypographySettings = {
  scale: (typeof FONT_SCALES)[number];
  bodyFont: (typeof BODY_FONTS)[number];
  headingFont: (typeof HEADING_FONTS)[number];
};

const DEFAULTS: TypographySettings = { scale: "1", bodyFont: "pretendard", headingFont: "a2z" };

// `<html>`의 data 속성으로 나가므로 허용 목록에 있는 값만 통과시킨다.
const pick = <T extends string>(allowed: readonly T[], value: unknown, fallback: T) =>
  allowed.includes(value as T) ? (value as T) : fallback;

const getTypographyBase = unstable_cache(
  async (draft: boolean): Promise<TypographySettings> => {
    const payload = await getCms();
    const doc = (await payload.findGlobal({ slug: "typography", depth: 0, draft })) as Record<string, unknown>;
    return {
      scale: pick(FONT_SCALES, doc.scale, DEFAULTS.scale),
      bodyFont: pick(BODY_FONTS, doc.bodyFont, DEFAULTS.bodyFont),
      headingFont: pick(HEADING_FONTS, doc.headingFont, DEFAULTS.headingFont),
    };
  },
  ["cms-typography"],
  { tags: [CMS_TAGS.typography] },
);

export const getTypography = async () => getTypographyBase(await isDraftMode());
