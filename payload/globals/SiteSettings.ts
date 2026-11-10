import type { GlobalConfig } from "payload";
import { hasRole, isCeoOrEditor } from "../access/roles";
import { CMS_TAGS, revalidateCms } from "../hooks/revalidate";

const linkFields = [
  { name: "label", label: "표시 이름", type: "text" as const, required: true },
  { name: "href", label: "연결 주소", type: "text" as const, required: true },
];

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "사이트 설정",
  admin: { group: "사이트", description: "하단(푸터)의 회사 정보와 공통 문의 유도 문구를 관리합니다." },
  access: {
    read: () => true,
    update: isCeoOrEditor,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.site)();
        return doc;
      },
    ],
  },
  fields: [
    {
      type: "group",
      name: "company",
      label: "회사 정보",
      fields: [
        { name: "companyName", label: "상호", type: "text", required: true },
        { name: "ceo", label: "대표", type: "text", required: true },
        { name: "privacyOfficer", label: "개인정보관리책임자", type: "text", required: true },
        { name: "email", label: "이메일", type: "email", required: true },
        { name: "address", label: "주소", type: "text", required: true },
        { name: "businessNumber", label: "사업자등록번호", type: "text", required: true },
        { name: "copyright", label: "저작권 문구", type: "text", required: true },
      ],
    },
    {
      name: "footerNavigation",
      label: "하단 메뉴",
      type: "array",
      labels: { singular: "메뉴", plural: "메뉴" },
      fields: linkFields,
    },
    {
      name: "legalLinks",
      label: "약관 및 정책 링크",
      type: "array",
      labels: { singular: "링크", plural: "링크" },
      access: { update: ({ req: { user } }) => hasRole(user, "ceo") },
      fields: linkFields,
    },
    {
      type: "group",
      name: "contactCta",
      label: "문의 유도 영역",
      fields: [
        {
          name: "title",
          label: "문구",
          type: "textarea",
          required: true,
          admin: { description: "[[ ]]로 감싼 부분은 줄이 바뀌지 않고 한 덩어리로 유지됩니다." },
        },
        { name: "buttonLabel", label: "버튼 문구", type: "text", required: true },
        { name: "href", label: "버튼 연결 주소", type: "text", required: true },
      ],
    },
  ],
};
