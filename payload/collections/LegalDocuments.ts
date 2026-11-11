import type { CollectionConfig } from "payload";
import { isCeo } from "../access/roles";
import { CMS_TAGS, revalidateCms } from "../hooks/revalidate";

export const LEGAL_SLUGS = ["privacy-policy", "service-term", "email-collection-refusal"] as const;

export const LegalDocuments: CollectionConfig = {
  slug: "legal-documents",
  labels: { singular: "약관·정책 문서", plural: "약관·정책 문서" },
  admin: {
    group: "법적 문서",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "effectiveDate", "updatedAt"],
    description: "개인정보처리방침, 서비스 이용약관, 이메일무단수집거부 문서입니다. 수정은 대표(CEO)만 할 수 있습니다.",
  },
  access: {
    read: () => true,
    create: isCeo,
    update: isCeo,
    delete: isCeo,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.legal)();
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.legal)();
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "slug",
      label: "문서 종류",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "개인정보처리방침", value: "privacy-policy" },
        { label: "서비스 이용약관", value: "service-term" },
        { label: "이메일무단수집거부", value: "email-collection-refusal" },
      ],
      admin: { description: "문서 종류마다 1개만 만들 수 있습니다. 주소(/privacy-policy 등)와 연결됩니다." },
    },
    { name: "title", label: "제목", type: "text", required: true },
    { name: "heading", label: "본문 제목(선택)", type: "text", admin: { description: "비워두면 '제목'을 그대로 사용합니다." } },
    { name: "description", label: "페이지 설명", type: "text", required: true },
    {
      name: "effectiveDate",
      label: "시행일",
      type: "text",
      required: true,
      admin: { description: "화면에 보이는 그대로 입력합니다. 예: 2026년 11월 1일" },
    },
    {
      name: "extraMeta",
      label: "추가 안내 항목",
      type: "array",
      labels: { singular: "항목", plural: "항목" },
      fields: [
        { name: "label", label: "이름", type: "text", required: true },
        { name: "value", label: "내용", type: "text", required: true },
      ],
    },
    {
      name: "intro",
      label: "머리말",
      type: "textarea",
      required: true,
      admin: { description: "줄바꿈(Enter)은 화면에도 그대로 반영됩니다." },
    },
    {
      name: "clauses",
      label: "조항",
      type: "array",
      labels: { singular: "조항", plural: "조항" },
      admin: { description: "위아래로 끌어서 순서를 바꿀 수 있습니다." },
      fields: [
        { name: "title", label: "조항 제목", type: "text", required: true },
        {
          name: "body",
          label: "본문",
          type: "textarea",
          admin: { description: "줄바꿈(Enter)은 화면에 그대로 반영됩니다. 항목 기호(•, -, 1))는 직접 입력합니다." },
        },
        {
          name: "table",
          label: "표(선택)",
          type: "group",
          fields: [
            { name: "caption", label: "표 설명", type: "text" },
            {
              name: "rows",
              label: "행",
              type: "array",
              labels: { singular: "행", plural: "행" },
              fields: [
                { name: "label", label: "항목", type: "text", required: true },
                { name: "value", label: "내용", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
