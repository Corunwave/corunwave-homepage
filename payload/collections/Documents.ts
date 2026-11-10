import type { CollectionConfig } from "payload";
import { isCeo, isCeoOrEditor } from "../access/roles";
import { asciiUploadName } from "../hooks/asciiUploadName";
import { CMS_TAGS, revalidateCms } from "../hooks/revalidate";

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "다운로드 자료", plural: "다운로드 자료" },
  admin: {
    group: "파일",
    useAsTitle: "label",
    defaultColumns: ["label", "sortOrder", "isPublished", "updatedAt"],
    description: "홈페이지 '자료 다운로드' 영역에 노출되는 PDF입니다. 파일을 교체하면 같은 버튼에 새 파일이 연결됩니다.",
  },
  access: {
    read: () => true,
    create: isCeoOrEditor,
    update: isCeoOrEditor,
    delete: isCeo,
  },
  upload: { mimeTypes: ["application/pdf"] },
  hooks: {
    beforeOperation: [asciiUploadName],
    beforeChange: [
      ({ data, req }) => {
        const original = req.context.originalFileName;
        if (!data.downloadName && typeof original === "string") {
          return { ...data, downloadName: `${original}.pdf` };
        }
        return data;
      },
    ],
    afterChange: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.documents)();
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCms(CMS_TAGS.documents)();
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "label",
      label: "버튼 문구",
      type: "text",
      required: true,
      admin: { description: "예: 회사소개서 PDF 다운로드" },
    },
    {
      name: "slot",
      label: "구분",
      type: "select",
      options: [
        { label: "회사소개서", value: "companyProfile" },
        { label: "대학 맞춤형 포트폴리오", value: "universityPortfolio" },
        { label: "기업·공공 맞춤형 포트폴리오", value: "enterprisePortfolio" },
        { label: "기타", value: "other" },
      ],
      admin: { description: "파트너 전략 페이지의 포트폴리오 버튼과 연결되는 자료는 해당 구분을 선택하세요. 같은 구분은 하나만 지정하세요." },
    },
    {
      name: "downloadName",
      label: "저장될 파일명",
      type: "text",
      admin: { description: "이용자가 내려받을 때의 파일 이름(한글 가능). 비워두면 업로드한 파일명을 사용합니다." },
    },
    {
      name: "sortOrder",
      label: "노출 순서",
      type: "number",
      defaultValue: 0,
      admin: { description: "작은 숫자가 먼저 나옵니다." },
    },
    {
      name: "isPublished",
      label: "공개",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
