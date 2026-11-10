import type { GlobalConfig } from "payload";
import { isCeo } from "../access/roles";
import { CMS_TAGS } from "../hooks/revalidate";
import { revalidateOnChange } from "../lib/globalHooks";

// 값 목록은 app/_lib/cms/typography.ts, app/globals.css의 [data-*] 규칙과 맞춰야 한다.
export const FONT_SCALES = ["0.9", "1", "1.1", "1.2"] as const;
export const BODY_FONTS = ["pretendard", "a2z"] as const;
export const HEADING_FONTS = ["a2z", "pretendard"] as const;

export const Typography: GlobalConfig = {
  slug: "typography",
  label: "글꼴·글자 크기",
  admin: {
    group: "사이트",
    description: "홈페이지 전체의 글자 크기와 글꼴을 바꿉니다. 저장하면 모든 페이지에 바로 적용됩니다. 바꾼 뒤에는 모바일 화면도 꼭 확인하세요.",
  },
  access: { read: () => true, update: isCeo },
  hooks: revalidateOnChange(CMS_TAGS.typography),
  fields: [
    {
      name: "scale",
      label: "글자 크기",
      type: "select",
      required: true,
      defaultValue: "1",
      options: [
        { label: "작게 (90%)", value: "0.9" },
        { label: "보통 (100%) — 기본", value: "1" },
        { label: "크게 (110%)", value: "1.1" },
        { label: "아주 크게 (120%)", value: "1.2" },
      ],
      admin: { description: "제목·본문·메뉴를 포함한 모든 글자의 크기가 같은 비율로 바뀝니다." },
    },
    {
      name: "bodyFont",
      label: "본문 글꼴",
      type: "select",
      required: true,
      defaultValue: "pretendard",
      options: [
        { label: "Pretendard — 기본", value: "pretendard" },
        { label: "A2Z", value: "a2z" },
      ],
      admin: { description: "본문, 메뉴, 버튼 등 일반 글자에 쓰입니다. A2Z는 굵기가 한 가지뿐이라 굵은 글자가 흐리게 보일 수 있습니다." },
    },
    {
      name: "headingFont",
      label: "제목·강조 글꼴",
      type: "select",
      required: true,
      defaultValue: "a2z",
      options: [
        { label: "A2Z — 기본", value: "a2z" },
        { label: "Pretendard", value: "pretendard" },
      ],
      admin: { description: "페이지 제목, 슬로건, 강조 문구에 쓰입니다." },
    },
  ],
};
