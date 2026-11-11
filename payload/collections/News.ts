import type { Access, CollectionConfig, Where } from "payload";
import { hasRole, isCeoOrEditor } from "../access/roles";
import { CMS_TAGS, revalidateCms } from "../hooks/revalidate";
import { newsEditor } from "../lib/editors";
import { extractContentImages } from "../lib/newsContent";
import { slugify } from "../lib/slugify";

// 로그인한 대표·에디터는 초안까지 모두 보고, 그 밖에는 "게시됨 + 게시 시각이 지난 글"만 본다.
// 게시 시각을 미래로 두면 그 시각부터 공개 목록에 나타난다(예약 게시).
const readNews: Access = ({ req: { user } }) => {
  if (hasRole(user, "ceo", "editor")) return true;
  const visible: Where = {
    and: [
      { _status: { equals: "published" } },
      { publishedAt: { less_than_equal: new Date().toISOString() } },
    ],
  };
  return visible;
};

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "소식", plural: "소식" },
  admin: {
    group: "소식",
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "_status", "publishedAt", "updatedAt"],
    listSearchableFields: ["title", "summary", "slug"],
    hidden: ({ user }) => !hasRole(user, "ceo", "editor"),
    description: "소식 게시글입니다. '임시저장'은 공개되지 않고, '게시'하면 아래 게시 시각부터 공개됩니다.",
  },
  defaultSort: "-publishedAt",
  access: {
    read: readNews,
    create: isCeoOrEditor,
    update: isCeoOrEditor,
    delete: isCeoOrEditor,
  },
  versions: {
    maxPerDoc: 20,
    drafts: { autosave: { interval: 2000 } },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.title === "string") return { ...data, slug: slugify(data.title) };
        return data;
      },
    ],
    afterChange: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.news)();
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.news)();
        return doc;
      },
    ],
  },
  fields: [
    { name: "title", label: "제목", type: "text", required: true, maxLength: 50, admin: { description: "50자 이내로 입력합니다." } },
    {
      name: "summary",
      label: "요약",
      type: "textarea",
      admin: { description: "목록과 공유 미리보기에 쓰이는 한두 문장입니다." },
    },
    {
      name: "thumbnail",
      label: "대표 이미지",
      type: "upload",
      relationTo: "media",
      admin: { description: "비워두면 본문의 첫 이미지가 사용됩니다. 본문에 이미지도 없으면 기본 이미지가 표시됩니다." },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (value) return value;
            return extractContentImages(siblingData.content)[0]?.id ?? value;
          },
        ],
      },
    },
    { name: "content", label: "본문", type: "richText", editor: newsEditor, required: true },
    {
      name: "tag",
      label: "태그",
      type: "select",
      required: true,
      options: [
        { label: "사내소식", value: "internal" },
        { label: "사외소식", value: "external" },
        { label: "기술소식", value: "tech" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "게시 시각",
      type: "date",
      index: true,
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "'게시' 상태에서 이 시각부터 공개됩니다. 미래 시각으로 두면 예약 게시가 됩니다. 비워두면 처음 게시하는 순간으로 채워집니다.",
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (value) return value;
            return siblingData._status === "published" ? new Date().toISOString() : value;
          },
        ],
      },
    },
    {
      name: "slug",
      label: "주소",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "소식 상세 주소에 쓰입니다. 비워두면 제목으로 자동 생성됩니다." },
    },
    {
      name: "seo",
      label: "검색·공유 설정(선택)",
      type: "group",
      admin: { description: "비워두면 제목, 요약, 대표 이미지를 사용합니다." },
      fields: [
        { name: "metaTitle", label: "검색 제목", type: "text" },
        { name: "metaDescription", label: "검색 설명", type: "textarea" },
        { name: "ogImage", label: "공유 이미지", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
