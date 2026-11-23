import path from "path";
import type { CollectionConfig } from "payload";
import { isCeo, isCeoOrEditor } from "../access/roles";
import { asciiUploadName } from "../hooks/asciiUploadName";
import { CMS_TAGS, revalidateCms } from "../hooks/revalidate";

export const NEWS_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "application/x-hwp",
  "application/haansofthwp",
  "application/vnd.hancom.hwp",
  "application/vnd.hancom.hwpx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-zip-compressed",
];

// 브라우저가 hwp·hwpx의 MIME을 비워 보내기도 하므로 확장자도 함께 허용한다.
export const NewsAttachments: CollectionConfig = {
  slug: "news-attachments",
  labels: { singular: "소식 첨부파일", plural: "소식 첨부파일" },
  admin: {
    group: "소식",
    useAsTitle: "downloadName",
    defaultColumns: ["downloadName", "filename", "updatedAt"],
    description: "소식 상세 하단에 내려받기 목록으로 노출되는 파일입니다. PDF·한글·Office·ZIP을 올릴 수 있습니다.",
  },
  access: {
    read: () => true,
    create: isCeoOrEditor,
    update: isCeoOrEditor,
    delete: isCeo,
  },
  upload: { mimeTypes: NEWS_ATTACHMENT_MIME_TYPES },
  hooks: {
    beforeOperation: [asciiUploadName],
    beforeChange: [
      ({ data, req }) => {
        const original = req.context.originalFileName;
        if (!data.downloadName && typeof original === "string") {
          return { ...data, downloadName: `${original}${path.extname(String(data.filename ?? ""))}` };
        }
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
    {
      name: "downloadName",
      label: "저장될 파일명",
      type: "text",
      admin: { description: "이용자가 내려받을 때의 파일 이름(한글 가능). 비워두면 업로드한 파일명을 사용합니다." },
    },
  ],
};
